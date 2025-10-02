import { useState, useEffect, useRef, useCallback } from "react";
import { 
  Heart, 
  Activity, 
  Brain, 
  Thermometer,
  Eye,
  Play,
  Square,
  Camera,
  Smartphone,
  TrendingUp,
  Calendar,
  Wind,
  X,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const PPG_SERVICE_URL = import.meta.env.VITE_PPG_SERVICE_URL || 'http://localhost:8001';
const RECORDING_DURATION = 30; // seconds
const TARGET_FPS = 30;

const PatientVitals = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const captureIntervalRef = useRef<number | null>(null);
  
  const [isRecording, setIsRecording] = useState(false);
  const [recordingProgress, setRecordingProgress] = useState(0);
  const [capturedFrames, setCapturedFrames] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [vitalsResult, setVitalsResult] = useState<any>(null);
  const [error, setError] = useState<string>("");
  const [signalQuality, setSignalQuality] = useState<number>(0);
  const [cameraReady, setCameraReady] = useState(false);
  const [vitalsHistory, setVitalsHistory] = useState<any[]>([]);

  // Load vitals history
  const loadVitalsHistory = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      const { data: patientData } = await supabase
        .from('patients')
        .select('id')
        .eq('user_id', user.id)
        .single();
      
      if (patientData) {
        const { data: vitals, error } = await supabase
          .from('vitals')
          .select('*')
          .eq('patient_id', patientData.id)
          .order('recorded_at', { ascending: false })
          .limit(5);
        
        if (!error && vitals) {
          setVitalsHistory(vitals);
        }
      }
    } catch (err) {
      console.error("Error loading vitals history:", err);
    }
  }, [user]);

  useEffect(() => {
    loadVitalsHistory();
  }, [loadVitalsHistory]);

  // Initialize camera
  const startCamera = useCallback(async () => {
    try {
      setError("");
      
      const constraints = {
        video: {
          facingMode: 'environment',
          width: { ideal: 640 },
          height: { ideal: 480 },
          frameRate: { ideal: TARGET_FPS }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        const track = stream.getVideoTracks()[0];
        const capabilities = track.getCapabilities() as any;
        
        if (capabilities.torch) {
          await track.applyConstraints({
            advanced: [{ torch: true } as any]
          });
        }
        
        setCameraReady(true);
        
        toast({
          title: "📷 Camera Ready",
          description: "Place your finger gently over the camera lens",
        });
      }
    } catch (err: any) {
      console.error("Error accessing camera:", err);
      setError(`Camera access denied: ${err.message}`);
      toast({
        title: "Camera Error",
        description: "Could not access camera. Please check permissions.",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Stop camera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraReady(false);
  }, []);

  // Capture frame from video
  const captureFrame = useCallback((): string | null => {
    if (!videoRef.current || !canvasRef.current) return null;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return null;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    
    return canvas.toDataURL('image/jpeg', 0.8);
  }, []);

  // Start recording
  const startRecording = useCallback(() => {
    if (!cameraReady) {
      toast({
        title: "Camera Not Ready",
        description: "Please wait for camera to initialize",
        variant: "destructive",
      });
      return;
    }

    setIsRecording(true);
    setRecordingProgress(0);
    setCapturedFrames([]);
    setVitalsResult(null);
    setError("");
    
    const frames: string[] = [];
    const intervalMs = 1000 / TARGET_FPS;
    const startTime = Date.now();
    
    captureIntervalRef.current = window.setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min((elapsed / RECORDING_DURATION) * 100, 100);
      
      setRecordingProgress(progress);
      
      const frame = captureFrame();
      if (frame) {
        frames.push(frame);
        setCapturedFrames([...frames]);
        
        if (frames.length % (TARGET_FPS * 3) === 0) {
          checkSignalQuality(frames.slice(-TARGET_FPS * 3));
        }
      }
      
      if (elapsed >= RECORDING_DURATION) {
        stopRecording(frames);
      }
    }, intervalMs);
    
    toast({
      title: "📹 Recording Started",
      description: `Hold steady for ${RECORDING_DURATION}s. Analysis will start automatically.`,
    });
  }, [cameraReady, captureFrame, toast]);

  // Stop recording
  const stopRecording = useCallback((frames?: string[]) => {
    if (captureIntervalRef.current) {
      clearInterval(captureIntervalRef.current);
      captureIntervalRef.current = null;
    }
    
    setIsRecording(false);
    
    const framesToProcess = frames || capturedFrames;
    
    if (framesToProcess.length >= TARGET_FPS * 5) {
      processFrames(framesToProcess);
    } else {
      setError("Recording too short. Please record for at least 5 seconds.");
      toast({
        title: "Recording Too Short",
        description: "Please try again and hold for the full duration",
        variant: "destructive",
      });
    }
  }, [capturedFrames, toast]);

  // Check signal quality
  const checkSignalQuality = async (frames: string[]) => {
    try {
      const response = await fetch(`${PPG_SERVICE_URL}/test/signal-quality`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          frames: frames.slice(0, 10)
        }),
      });
      
      if (response.ok) {
        const result = await response.json();
        setSignalQuality(result.quality_score || 0);
      }
    } catch (err) {
      console.error("Error checking signal quality:", err);
    }
  };

  // Process captured frames
  const processFrames = async (frames: string[]) => {
    setIsProcessing(true);
    setError("");
    
    try {
      toast({
        title: "⚙️ Processing...",
        description: "Analyzing your vitals, please wait",
      });
      
      const response = await fetch(`${PPG_SERVICE_URL}/analyze/frames`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          frames: frames,
          frame_rate: TARGET_FPS,
          metadata: {
            user_id: user?.id,
            timestamp: new Date().toISOString()
          }
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Processing failed' }));
        throw new Error(errorData.detail || 'Processing failed');
      }
      
      const result = await response.json();
      
      if (result.success) {
        setVitalsResult(result);
        
        // Automatically save to database
        await saveVitalsToDatabase(result.vitals);
        
        toast({
          title: "✅ Measurement Complete",
          description: `Heart Rate: ${result.vitals.heart_rate} BPM | Saved automatically`,
        });
      } else {
        setError(result.error || "Processing failed");
        toast({
          title: "Measurement Failed",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (err: any) {
      console.error("Error processing frames:", err);
      
      if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
        setError(`PPG Service not running at ${PPG_SERVICE_URL}`);
        toast({
          title: "⚠️ Backend Service Not Running",
          description: "Please start the PPG service (ppg-service/start.bat)",
          variant: "destructive",
        });
      } else {
        setError(`Processing error: ${err.message}`);
        toast({
          title: "Processing Error",
          description: "Could not analyze vitals. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Save vitals to Supabase
  const saveVitalsToDatabase = async (vitals: any) => {
    try {
      if (!user?.id) {
        console.error("No user ID available for saving vitals");
        toast({
          title: "Save Error",
          description: "User not identified. Please log in again.",
          variant: "destructive",
        });
        return;
      }

      const { data: patientData, error: patientError } = await supabase
        .from('patients')
        .select('id')
        .eq('user_id', user.id)
        .single();
      
      if (patientError || !patientData) {
        console.error("Could not find patient record:", patientError);
        toast({
          title: "Save Warning",
          description: "Patient record not found. Vitals measured but not saved.",
          variant: "destructive",
        });
        return;
      }
      
      const { data: insertData, error: insertError } = await supabase
        .from('vitals')
        .insert({
          patient_id: patientData.id,
          heart_rate: Math.round(vitals.heart_rate),
          respiratory_rate: Math.round(vitals.respiratory_rate),
          recorded_at: new Date().toISOString(),
          notes: `PPG measurement - User: ${user.id} | HR: ${Math.round(vitals.heart_rate)} BPM, RR: ${Math.round(vitals.respiratory_rate)} BrPM, HRV: ${vitals.heart_rate_variability?.toFixed(1)} ms, Signal Quality: ${(signalQuality * 100).toFixed(0)}%`
        })
        .select();
      
      if (insertError) {
        console.error("Error saving vitals:", insertError);
        toast({
          title: "Save Error",
          description: "Could not save vitals to database.",
          variant: "destructive",
        });
      } else {
        console.log("Vitals saved successfully:", insertData);
        // Reload history after save
        loadVitalsHistory();
        toast({
          title: "✅ Saved Successfully",
          description: `Vitals saved to your medical records`,
        });
      }
    } catch (err) {
      console.error("Error in saveVitalsToDatabase:", err);
      toast({
        title: "Save Error",
        description: "An unexpected error occurred while saving.",
        variant: "destructive",
      });
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      if (captureIntervalRef.current) {
        clearInterval(captureIntervalRef.current);
      }
    };
  }, [stopCamera]);

  return (
    <div className="min-h-screen bg-gradient-background p-4 md:p-6 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text">Vitals Monitoring</span>
          </h1>
          <p className="text-muted-foreground">Measure your heart rate and vitals using PPG technology</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* PPG Scanner - Main Section */}
          <div className="lg:col-span-2">
            <MedicalCard variant="glass" className="medical-glow">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <Camera className="mr-2 h-5 w-5 text-primary" />
                  PPG Vitals Scanner
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-6">
                  {/* Camera Preview */}
                  <div className="relative bg-black rounded-lg overflow-hidden" style={{ aspectRatio: '4/3' }}>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    <canvas ref={canvasRef} className="hidden" />
                    
                    {/* Recording Indicator */}
                    {isRecording && (
                      <div className="absolute top-4 right-4">
                        <Badge variant="destructive">
                          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                          RECORDING
                        </Badge>
                      </div>
                    )}
                    
                    {/* Signal Quality */}
                    {isRecording && signalQuality > 0 && (
                      <div className="absolute top-4 left-4">
                        <Badge variant={signalQuality > 0.6 ? "default" : "secondary"}>
                          Signal: {(signalQuality * 100).toFixed(0)}%
                        </Badge>
                      </div>
                    )}
                    
                    {/* Overlay */}
                    {!cameraReady && !isProcessing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="text-center text-white">
                          <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                          <p className="text-lg">Click "Start Camera" below</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Recording Progress */}
                  {isRecording && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Recording Progress</span>
                        <span>{Math.round(recordingProgress)}%</span>
                      </div>
                      <Progress value={recordingProgress} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        {(RECORDING_DURATION * (recordingProgress / 100)).toFixed(1)}s / {RECORDING_DURATION}s
                      </p>
                    </div>
                  )}
                  
                  {/* Instructions */}
                  <div className="bg-primary/10 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      Quick Instructions
                    </h4>
                    <ol className="text-sm space-y-1 text-muted-foreground list-decimal list-inside">
                      <li>Click "Start Camera" and allow camera access</li>
                      <li>Place your index finger gently over the rear camera</li>
                      <li>Click "Start Measurement" and hold steady for 30 seconds</li>
                      <li>Analysis and saving happens automatically!</li>
                    </ol>
                  </div>
                  
                  {/* Control Buttons */}
                  <div className="flex gap-4">
                    {!cameraReady ? (
                      <MedicalButton
                        onClick={startCamera}
                        variant="medical"
                        className="flex-1"
                        disabled={isProcessing}
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        Start Camera
                      </MedicalButton>
                    ) : (
                      <>
                        {!isRecording && !isProcessing && (
                          <>
                            <MedicalButton
                              onClick={startRecording}
                              variant="medical"
                              className="flex-1"
                            >
                              <Heart className="mr-2 h-4 w-4" />
                              Start Measurement
                            </MedicalButton>
                            <MedicalButton
                              onClick={stopCamera}
                              variant="outline"
                            >
                              <X className="h-4 w-4" />
                            </MedicalButton>
                          </>
                        )}
                        
                        {isRecording && (
                          <MedicalButton
                            onClick={() => stopRecording()}
                            variant="destructive"
                            className="flex-1"
                          >
                            <X className="mr-2 h-4 w-4" />
                            Stop Recording
                          </MedicalButton>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Processing Indicator */}
            {isProcessing && (
              <MedicalCard variant="glass" className="mt-6">
                <MedicalCardContent className="p-6">
                  <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
                    <h3 className="text-lg font-semibold mb-2">Analyzing Your Vitals</h3>
                    <p className="text-sm text-muted-foreground">
                      Processing {capturedFrames.length} frames... This may take a few seconds
                    </p>
                  </div>
                </MedicalCardContent>
              </MedicalCard>
            )}

            {/* Error Display */}
            {error && (
              <Alert variant="destructive" className="mt-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Results Display */}
            {vitalsResult && vitalsResult.success && (
              <MedicalCard variant="glass" className="mt-6">
                <MedicalCardHeader>
                  <div className="flex items-center justify-between">
                    <MedicalCardTitle>
                      <CheckCircle className="inline-block mr-2 h-5 w-5 text-success" />
                      Measurement Results (Auto-Saved)
                    </MedicalCardTitle>
                    <Badge variant={vitalsResult.quality?.quality_score > 0.7 ? "default" : "secondary"}>
                      {vitalsResult.confidence?.heart_rate === "high" ? "High Confidence" : "Medium Confidence"}
                    </Badge>
                  </div>
                </MedicalCardHeader>
                <MedicalCardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Heart Rate */}
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <Heart className="h-8 w-8 mx-auto mb-2 text-destructive" />
                      <div className="text-3xl font-bold text-primary">
                        {vitalsResult.vitals.heart_rate}
                      </div>
                      <div className="text-sm text-muted-foreground">BPM</div>
                      <div className="text-xs text-muted-foreground mt-1">Heart Rate</div>
                    </div>
                    
                    {/* Respiratory Rate */}
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <Wind className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                      <div className="text-3xl font-bold text-primary">
                        {vitalsResult.vitals.respiratory_rate}
                      </div>
                      <div className="text-sm text-muted-foreground">Breaths/min</div>
                      <div className="text-xs text-muted-foreground mt-1">Respiratory Rate</div>
                    </div>
                    
                    {/* HRV */}
                    <div className="text-center p-4 bg-muted/50 rounded-lg">
                      <Activity className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <div className="text-3xl font-bold text-primary">
                        {vitalsResult.vitals.heart_rate_variability?.toFixed(1)}
                      </div>
                      <div className="text-sm text-muted-foreground">ms</div>
                      <div className="text-xs text-muted-foreground mt-1">HRV (SDNN)</div>
                    </div>
                  </div>
                  
                  {/* Additional Info */}
                  <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
                    <div className="flex justify-between mb-1">
                      <span>Beats Detected:</span>
                      <span className="font-medium">{vitalsResult.vitals.beats_detected}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Recording Duration:</span>
                      <span className="font-medium">{vitalsResult.vitals.signal_duration?.toFixed(1)}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Signal Quality:</span>
                      <span className="font-medium">{(vitalsResult.quality?.quality_score * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                  
                  <MedicalButton
                    variant="medical"
                    className="w-full mt-4"
                    onClick={() => {
                      setVitalsResult(null);
                      setCapturedFrames([]);
                      setRecordingProgress(0);
                    }}
                  >
                    Measure Again
                  </MedicalButton>
                </MedicalCardContent>
              </MedicalCard>
            )}
          </div>

          {/* Vitals History Sidebar */}
          <div className="space-y-6">
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                  Recent History
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                {vitalsHistory.length > 0 ? (
                  <div className="space-y-3">
                    {vitalsHistory.map((record, index) => (
                      <div key={record.id || index} className="p-3 rounded-lg bg-muted/30">
                        <div className="text-xs text-muted-foreground mb-2">
                          {new Date(record.recorded_at).toLocaleDateString()} {new Date(record.recorded_at).toLocaleTimeString()}
                        </div>
                        <div className="space-y-1">
                          {record.heart_rate && (
                            <div className="flex justify-between text-sm">
                              <span className="flex items-center">
                                <Heart className="h-3 w-3 mr-1 text-red-500" />
                                HR
                              </span>
                              <span className="font-medium">{record.heart_rate} BPM</span>
                            </div>
                          )}
                          {record.respiratory_rate && (
                            <div className="flex justify-between text-sm">
                              <span className="flex items-center">
                                <Wind className="h-3 w-3 mr-1 text-blue-500" />
                                RR
                              </span>
                              <span className="font-medium">{record.respiratory_rate} BrPM</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No vitals recorded yet. Start your first measurement!
                  </p>
                )}
              </MedicalCardContent>
            </MedicalCard>

            {/* Info Card */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle>About PPG</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent className="text-xs text-muted-foreground">
                <p className="mb-2">
                  <strong>Photoplethysmography (PPG)</strong> uses your camera to detect blood flow changes.
                </p>
                <p className="mb-2"><strong>Measures:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Heart Rate (HR) - Accurate</li>
                  <li>Heart Rate Variability (HRV) - Accurate</li>
                  <li>Respiratory Rate (RR) - Estimated</li>
                </ul>
                <div className="mt-3 p-2 bg-amber-50 dark:bg-amber-900/20 rounded text-xs">
                  <p className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                    ⚠️ Note:
                  </p>
                  <p className="text-amber-800 dark:text-amber-200">
                    All measurements are automatically saved to your medical records with your user ID.
                  </p>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>
        </div>
      </div>

      <BottomNavigation userRole={profile?.role || 'patient'} />
    </div>
  );
};

export default PatientVitals;