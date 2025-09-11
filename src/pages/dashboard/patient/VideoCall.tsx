import { useState, useEffect } from "react";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff,
  Camera,
  CameraOff,
  Settings,
  MessageSquare,
  Users,
  Share,
  Monitor
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent } from "@/components/ui/medical-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const VideoCall = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // Mock doctor data
  const doctor = {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    avatar: "SJ",
    status: "online"
  };

  // Timer for call duration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startCall = () => {
    setIsCallActive(true);
    setCallDuration(0);
  };

  const endCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
  };

  return (
    <div className="min-h-screen bg-gradient-background pb-24">
      <div className="max-w-7xl mx-auto h-screen">
        {!isCallActive ? (
          // Pre-call Screen
          <div className="h-full flex items-center justify-center p-6">
            <MedicalCard variant="glass" className="w-full max-w-md">
              <MedicalCardContent className="p-8 text-center">
                <div className="mb-6">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarFallback className="bg-primary/20 text-primary font-bold text-2xl">
                      {doctor.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold mb-2">{doctor.name}</h2>
                  <p className="text-muted-foreground mb-4">{doctor.specialty}</p>
                  <Badge variant="default" className="text-xs">
                    Available for consultation
                  </Badge>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-center space-x-4">
                    <MedicalButton
                      variant={isVideoOn ? "medical" : "outline"}
                      size="icon"
                      onClick={() => setIsVideoOn(!isVideoOn)}
                    >
                      {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                    </MedicalButton>
                    <MedicalButton
                      variant={isAudioOn ? "medical" : "outline"}
                      size="icon"
                      onClick={() => setIsAudioOn(!isAudioOn)}
                    >
                      {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </MedicalButton>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p>Camera: {isVideoOn ? "On" : "Off"}</p>
                    <p>Microphone: {isAudioOn ? "On" : "Off"}</p>
                  </div>
                </div>

                <MedicalButton 
                  variant="medical" 
                  size="lg" 
                  className="w-full"
                  onClick={startCall}
                >
                  <Video className="mr-2 h-5 w-5" />
                  Start Video Call
                </MedicalButton>
              </MedicalCardContent>
            </MedicalCard>
          </div>
        ) : (
          // Active Call Screen
          <div className="h-full relative bg-black">
            {/* Main Video Area */}
            <div className="h-full relative">
              {/* Doctor's Video (Main) */}
              <div className="w-full h-full bg-muted/20 flex items-center justify-center">
                <div className="text-center text-white">
                  <Avatar className="w-32 h-32 mx-auto mb-4">
                    <AvatarFallback className="bg-primary/20 text-primary font-bold text-4xl">
                      {doctor.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold">{doctor.name}</h3>
                  <p className="text-white/70">{doctor.specialty}</p>
                </div>
              </div>

              {/* Your Video (Picture-in-Picture) */}
              <div className="absolute top-4 right-4 w-48 h-36 bg-muted rounded-lg border-2 border-white/20 overflow-hidden">
                <div className="w-full h-full bg-muted/50 flex items-center justify-center">
                  {isVideoOn ? (
                    <div className="text-center text-white">
                      <Camera className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">Your Video</p>
                    </div>
                  ) : (
                    <div className="text-center text-white">
                      <CameraOff className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">Camera Off</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Call Info */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-white text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span>Live Call</span>
                    <span>•</span>
                    <span>{formatDuration(callDuration)}</span>
                  </div>
                </div>
              </div>

              {/* Call Controls */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center space-x-4 bg-black/50 backdrop-blur-sm rounded-full px-6 py-4">
                  <MedicalButton
                    variant={isAudioOn ? "ghost" : "destructive"}
                    size="icon"
                    className="rounded-full"
                    onClick={() => setIsAudioOn(!isAudioOn)}
                  >
                    {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                  </MedicalButton>

                  <MedicalButton
                    variant={isVideoOn ? "ghost" : "destructive"}
                    size="icon"
                    className="rounded-full"
                    onClick={() => setIsVideoOn(!isVideoOn)}
                  >
                    {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                  </MedicalButton>

                  <MedicalButton
                    variant={isScreenSharing ? "medical" : "ghost"}
                    size="icon"
                    className="rounded-full"
                    onClick={() => setIsScreenSharing(!isScreenSharing)}
                  >
                    <Monitor className="h-5 w-5" />
                  </MedicalButton>

                  <MedicalButton
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                  >
                    <MessageSquare className="h-5 w-5" />
                  </MedicalButton>

                  <MedicalButton
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                  >
                    <Settings className="h-5 w-5" />
                  </MedicalButton>

                  <MedicalButton
                    variant="destructive"
                    size="icon"
                    className="rounded-full w-12 h-12"
                    onClick={endCall}
                  >
                    <PhoneOff className="h-6 w-6" />
                  </MedicalButton>
                </div>
              </div>

              {/* Additional Controls */}
              <div className="absolute bottom-8 right-8">
                <div className="flex flex-col space-y-2">
                  <MedicalButton
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-black/50 backdrop-blur-sm"
                  >
                    <Share className="h-5 w-5" />
                  </MedicalButton>
                  <MedicalButton
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-black/50 backdrop-blur-sm"
                  >
                    <Users className="h-5 w-5" />
                  </MedicalButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <BottomNavigation userRole="patient" />
    </div>
  );
};

export default VideoCall;