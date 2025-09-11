import { useState, useEffect } from "react";
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
  Calendar
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const PatientVitals = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [heartRate, setHeartRate] = useState(0);
  const [oxygenLevel, setOxygenLevel] = useState(0);
  const [stressLevel, setStressLevel] = useState(0);

  // Simulate PPG measurement
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setHeartRate(prev => {
          const newRate = 65 + Math.random() * 20; // 65-85 bpm
          return Math.round(newRate);
        });
        setOxygenLevel(prev => {
          const newLevel = 95 + Math.random() * 5; // 95-100%
          return Math.round(newLevel * 10) / 10;
        });
        setStressLevel(prev => {
          const newLevel = Math.random() * 100;
          return Math.round(newLevel);
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRecording]);

  const vitalsHistory = [
    { date: "Today", heartRate: 72, oxygen: 98.5, bloodPressure: "120/80", status: "normal" },
    { date: "Yesterday", heartRate: 75, oxygen: 97.8, bloodPressure: "118/78", status: "normal" },
    { date: "2 days ago", heartRate: 68, oxygen: 98.2, bloodPressure: "122/82", status: "normal" },
    { date: "3 days ago", heartRate: 74, oxygen: 97.5, bloodPressure: "119/79", status: "normal" },
  ];

  const currentVitals = [
    { 
      label: "Heart Rate", 
      value: isRecording ? `${heartRate} bpm` : "-- bpm", 
      status: "normal", 
      icon: Heart, 
      color: "text-red-500",
      range: "60-100 bpm"
    },
    { 
      label: "Oxygen Level", 
      value: isRecording ? `${oxygenLevel}%` : "--%", 
      status: "normal", 
      icon: Activity, 
      color: "text-blue-500",
      range: "95-100%"
    },
    { 
      label: "Stress Level", 
      value: isRecording ? `${stressLevel}%` : "--%", 
      status: stressLevel < 30 ? "low" : stressLevel < 70 ? "moderate" : "high", 
      icon: Brain, 
      color: "text-purple-500",
      range: "0-100%"
    },
  ];

  const handleStartRecording = () => {
    setIsRecording(true);
    // Reset values
    setHeartRate(0);
    setOxygenLevel(0);
    setStressLevel(0);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4 md:p-6 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text">Vitals Monitoring</span>
          </h1>
          <p className="text-muted-foreground">Monitor your health vitals using PPG technology</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* PPG Scanner */}
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
                  {/* Camera Preview Area */}
                  <div className="relative bg-black/20 rounded-lg p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
                    {isRecording ? (
                      <div className="space-y-4">
                        <div className="w-32 h-32 bg-red-500/20 rounded-full flex items-center justify-center animate-pulse">
                          <Heart className="w-16 h-16 text-red-500 animate-pulse" />
                        </div>
                        <p className="text-primary font-medium">Measuring vitals...</p>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                          <span className="text-sm text-muted-foreground">Keep your finger steady on camera</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Smartphone className="w-24 h-24 text-muted-foreground mx-auto" />
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold">Ready to measure</h3>
                          <p className="text-muted-foreground">Place your fingertip gently over the camera lens</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Instructions */}
                  <div className="bg-primary/10 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Eye className="mr-2 h-4 w-4" />
                      Instructions
                    </h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Ensure good lighting conditions</li>
                      <li>• Place fingertip gently on rear camera</li>
                      <li>• Stay still for 30 seconds during measurement</li>
                      <li>• Avoid pressure - just light contact</li>
                    </ul>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex justify-center space-x-4">
                    {!isRecording ? (
                      <MedicalButton 
                        variant="medical" 
                        size="lg"
                        onClick={handleStartRecording}
                        className="px-8"
                      >
                        <Play className="mr-2 h-5 w-5" />
                        Start Measurement
                      </MedicalButton>
                    ) : (
                      <MedicalButton 
                        variant="outline" 
                        size="lg"
                        onClick={handleStopRecording}
                        className="px-8"
                      >
                        <Square className="mr-2 h-5 w-5" />
                        Stop Measurement
                      </MedicalButton>
                    )}
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>

          {/* Current Readings */}
          <div className="space-y-6">
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-primary" />
                  Current Readings
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  {currentVitals.map((vital) => (
                    <div key={vital.label} className="p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <vital.icon className={`h-4 w-4 ${vital.color}`} />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{vital.label}</p>
                            <p className="text-xs text-muted-foreground">{vital.range}</p>
                          </div>
                        </div>
                        <Badge 
                          variant={vital.status === "normal" || vital.status === "low" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {vital.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-primary">{vital.value}</span>
                      </div>
                      
                      {/* Progress bar for stress level */}
                      {vital.label === "Stress Level" && isRecording && (
                        <div className="mt-2">
                          <Progress 
                            value={stressLevel} 
                            className="h-2"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Quick Actions */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle>Quick Actions</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-3">
                  <MedicalButton variant="outline" className="w-full justify-start">
                    <Thermometer className="mr-2 h-4 w-4" />
                    Temperature Check
                  </MedicalButton>
                  <MedicalButton variant="outline" className="w-full justify-start">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Trends
                  </MedicalButton>
                  <MedicalButton variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Check-up
                  </MedicalButton>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>
        </div>

        {/* Vitals History */}
        <div className="mt-6">
          <MedicalCard variant="glass">
            <MedicalCardHeader>
              <MedicalCardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                Recent History
              </MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="space-y-3">
                {vitalsHistory.map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-4">
                      <div className="text-sm font-medium">{record.date}</div>
                      <Badge variant="outline" className="text-xs">
                        {record.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">HR</div>
                        <div className="font-medium">{record.heartRate}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">O2</div>
                        <div className="font-medium">{record.oxygen}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-muted-foreground">BP</div>
                        <div className="font-medium">{record.bloodPressure}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </div>
      </div>

      <BottomNavigation userRole="patient" />
    </div>
  );
};

export default PatientVitals;