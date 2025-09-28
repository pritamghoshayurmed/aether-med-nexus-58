import { useState } from "react";
import { 
  Send, 
  Phone, 
  Video, 
  Paperclip, 
  Image, 
  Mic, 
  Search,
  MoreVertical,
  Clock,
  CheckCheck,
  ArrowLeft,
  Plus,
  Camera,
  PhoneCall,
  VideoIcon,
  Minimize2,
  Maximize2,
  MicOff,
  PhoneOff,
  Users
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const PatientDoctorChat = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [showChatList, setShowChatList] = useState(true);
  const [isVideoCalling, setIsVideoCalling] = useState(false);
  const [isAudioCalling, setIsAudioCalling] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const chatList = [
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiologist", 
      lastMessage: "Your test results look normal. Let's schedule a follow-up next week.",
      timestamp: "11:36 AM",
      unread: 2,
      online: true,
      avatar: "SJ",
      phone: "+91 88851 61078"
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      specialty: "General Medicine",
      lastMessage: "Cardboard diye banabo ajke",
      timestamp: "11:04 AM", 
      unread: 0,
      online: false,
      avatar: "MC",
      phone: "+91 98765 43210"
    },
    {
      id: 3,
      doctorName: "Dr. Priya Sharma", 
      specialty: "Dermatologist",
      lastMessage: "german_banking_sentiment_dataset....",
      timestamp: "10:37 AM",
      unread: 0,
      online: true,
      avatar: "PS",
      phone: "+91 87654 32109"
    },
    {
      id: 4,
      doctorName: "Dr. Koushik Skf",
      specialty: "Pathfinder",
      lastMessage: "Ota krte hbe", 
      timestamp: "10:18 AM",
      unread: 0,
      online: false,
      avatar: "KS",
      phone: "+91 76543 21098"
    },
    {
      id: 5,
      doctorName: "Dr. Joga Jomi",
      specialty: "General Medicine",
      lastMessage: "CASE NUMBER PORA GACHA",
      timestamp: "9:19 AM",
      unread: 0, 
      online: false,
      avatar: "JJ",
      phone: "+91 65432 10987"
    }
  ];

  const chatMessages: Record<number, any[]> = {
    1: [
      {
        id: 1,
        sender: "doctor",
        content: "Hello! I've reviewed your latest lab results. Overall, they look quite good.",
        timestamp: "10:30 AM",
        status: "read"
      },
      {
        id: 2,
        sender: "patient", 
        content: "That's great to hear! I was a bit worried about the cholesterol levels.",
        timestamp: "10:32 AM",
        status: "read"
      },
      {
        id: 3,
        sender: "doctor",
        content: "Your test results look normal. Let's schedule a follow-up next week.",
        timestamp: "10:38 AM",
        status: "delivered"
      }
    ],
    4: [
      {
        id: 1,
        sender: "patient",
        content: "Pathfinder ta korai ache just copy paste hobe",
        timestamp: "10:17 AM", 
        status: "read"
      },
      {
        id: 2,
        sender: "doctor",
        content: "Ami Kal bosechilam oi ppt niye",
        timestamp: "10:17 AM",
        status: "read"
      },
      {
        id: 3,
        sender: "patient",
        content: "Bakita prototype ar video niye ami dekhchi",
        timestamp: "10:17 AM",
        status: "read"
      },
      {
        id: 4,
        sender: "patient", 
        content: "Ajkei tui ppt complete kor",
        timestamp: "10:17 AM",
        status: "read"
      },
      {
        id: 5,
        sender: "patient",
        content: "Pathfinder?", 
        timestamp: "10:17 AM",
        status: "read"
      },
      {
        id: 6,
        sender: "doctor",
        content: "Pathfinder?",
        timestamp: "10:17 AM",
        status: "read"
      },
      {
        id: 7,
        sender: "doctor",
        content: "Kabiraj , Pathfinder",
        timestamp: "10:17 AM", 
        status: "read"
      },
      {
        id: 8,
        sender: "doctor",
        content: "Pathfinder er 3 min er video already royeche",
        timestamp: "10:18 AM",
        status: "read"
      },
      {
        id: 9,
        sender: "patient",
        content: "Ota niye chap nei",
        timestamp: "10:18 AM",
        status: "read"
      },
      {
        id: 10,
        sender: "doctor", 
        content: "Pathfinder er 3 min er video already royeche",
        timestamp: "10:18 AM",
        status: "read"
      },
      {
        id: 11,
        sender: "doctor",
        content: "Hmm ota thak",
        timestamp: "10:18 AM",
        status: "read"
      },
      {
        id: 12,
        sender: "doctor",
        content: "Sudhu voice over ta change kore debo", 
        timestamp: "10:18 AM",
        status: "read"
      },
      {
        id: 13,
        sender: "patient",
        content: "Sudhu voice over ta change kore debo",
        timestamp: "10:18 AM",
        status: "read"
      },
      {
        id: 14,
        sender: "patient",
        content: "Oh haa",
        timestamp: "10:18 AM",
        status: "read"
      },
      {
        id: 15,
        sender: "patient",
        content: "Ota krte hbe",
        timestamp: "10:18 AM", 
        status: "read"
      }
    ]
  };

  const currentDoctor = selectedChat ? chatList.find(chat => chat.id === selectedChat) : null;
  const messages = selectedChat ? chatMessages[selectedChat] || [] : [];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add message sending logic here
      setMessage("");
    }
  };

  const handleChatSelect = (chatId: number) => {
    setSelectedChat(chatId);
    setShowChatList(false);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
    setShowChatList(true);
  };

  const startVideoCall = () => {
    setIsVideoCalling(true);
    setCallDuration(0);
    // Start call duration timer
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    // Store timer to clear later
    setTimeout(() => clearInterval(timer), 300000); // Auto end after 5 minutes for demo
  };

  const startAudioCall = () => {
    setIsAudioCalling(true);
    setCallDuration(0);
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    setTimeout(() => clearInterval(timer), 300000);
  };

  const endCall = () => {
    setIsVideoCalling(false);
    setIsAudioCalling(false);
    setCallDuration(0);
    setIsMuted(false);
  };

  const formatCallDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Chat List Component
  const ChatListView = () => (
    <div className="h-screen bg-gradient-background text-foreground flex flex-col">
      {/* Header */}
      <div className="bg-gradient-primary p-4 flex items-center justify-between border-b border-border shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-glow/20 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-semibold text-primary-foreground">Doctor Consultations</h1>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <MedicalButton variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-glow/10">
            <Search className="h-5 w-5" />
          </MedicalButton>
          <MedicalButton variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-glow/10">
            <MoreVertical className="h-5 w-5" />
          </MedicalButton>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
          <Input
            placeholder="Ask KABIRAJ AI or Search doctors..."
            className="pl-10 bg-input border-border text-foreground placeholder-muted-foreground rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="px-2 space-y-2">
          {chatList.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleChatSelect(chat.id)}
              className="p-4 hover:bg-muted/50 cursor-pointer rounded-xl transition-all duration-200 border border-transparent hover:border-primary/20 glass-card"
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground font-semibold text-sm">
                      {chat.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background shadow-sm" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-foreground truncate">
                      {chat.doctorName.startsWith('+91') ? chat.phone : chat.doctorName}
                    </h3>
                    <span className="text-xs text-primary font-medium">{chat.timestamp}</span>
                  </div>
                  <p className="text-xs text-primary font-medium mb-1">{chat.specialty}</p>
                  {chat.lastMessage.startsWith('You:') ? (
                    <div className="flex items-center space-x-1">
                      <CheckCheck className="h-3 w-3 text-primary" />
                      <span className="text-sm text-muted-foreground truncate">{chat.lastMessage}</span>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                  )}
                </div>
                {chat.unread > 0 && (
                  <Badge className="bg-destructive text-destructive-foreground text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center shadow-md">
                    {chat.unread}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  // Video/Audio Call Interface
  const CallInterface = () => (
    <div className="fixed inset-0 bg-gradient-background z-50 flex flex-col">
      {/* Call Header */}
      <div className="bg-gradient-primary p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {currentDoctor && (
            <>
              <Avatar className="w-12 h-12 ring-2 ring-primary-glow/30">
                <AvatarFallback className="bg-gradient-secondary text-primary-foreground font-semibold">
                  {currentDoctor.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-primary-foreground text-lg">
                  {currentDoctor.doctorName}
                </h3>
                <p className="text-sm text-primary-foreground/80">
                  {isVideoCalling ? 'Video Call' : 'Voice Call'} • {formatCallDuration(callDuration)}
                </p>
              </div>
            </>
          )}
        </div>
        <MedicalButton 
          variant="ghost" 
          size="icon" 
          className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-glow/10"
        >
          <Minimize2 className="h-5 w-5" />
        </MedicalButton>
      </div>

      {/* Video Area */}
      <div className="flex-1 relative bg-muted/20">
        {isVideoCalling ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <VideoIcon className="h-24 w-24 mx-auto mb-4 text-primary" />
              <p className="text-lg">Video call with {currentDoctor?.doctorName}</p>
              <p className="text-sm opacity-70">Call duration: {formatCallDuration(callDuration)}</p>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="w-32 h-32 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 medical-glow">
                <PhoneCall className="h-16 w-16 text-primary-foreground" />
              </div>
              <p className="text-xl font-semibold mb-2">{currentDoctor?.doctorName}</p>
              <p className="text-primary font-medium">{formatCallDuration(callDuration)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Call Controls */}
      <div className="p-6 bg-card/50 backdrop-blur-sm border-t border-border">
        <div className="flex justify-center space-x-6">
          <MedicalButton 
            variant={isMuted ? "destructive" : "outline"}
            size="icon"
            className="w-12 h-12 rounded-full"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
          </MedicalButton>
          
          <MedicalButton 
            variant="destructive"
            size="icon"
            className="w-16 h-16 rounded-full bg-destructive hover:bg-destructive/80"
            onClick={endCall}
          >
            <PhoneOff className="h-8 w-8" />
          </MedicalButton>
          
          {isVideoCalling && (
            <MedicalButton 
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full"
            >
              <Camera className="h-6 w-6" />
            </MedicalButton>
          )}
        </div>
      </div>
    </div>
  );

  // Chat View Component
  const ChatView = () => (
    <div className="h-screen bg-gradient-background text-foreground flex flex-col">
      {/* Chat Header */}
      <div className="bg-gradient-primary p-4 flex items-center space-x-3 border-b border-border shadow-lg">
        <MedicalButton 
          variant="ghost" 
          size="icon" 
          onClick={handleBackToList}
          className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-glow/10"
        >
          <ArrowLeft className="h-5 w-5" />
        </MedicalButton>
        {currentDoctor && (
          <>
            <div className="relative">
              <Avatar className="w-10 h-10 ring-2 ring-primary-glow/30">
                <AvatarFallback className="bg-gradient-secondary text-primary-foreground font-semibold">
                  {currentDoctor.avatar}
                </AvatarFallback>
              </Avatar>
              {currentDoctor.online && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background shadow-sm" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-primary-foreground">
                {currentDoctor.doctorName.startsWith('+91') ? currentDoctor.phone : currentDoctor.doctorName}
              </h3>
              <p className="text-sm text-primary-foreground/80">
                {currentDoctor.specialty} • {currentDoctor.online ? "Online now" : "Last seen 2 hours ago"}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <MedicalButton 
                variant="ghost" 
                size="icon" 
                className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-glow/10 rounded-xl"
                onClick={startVideoCall}
              >
                <Video className="h-5 w-5" />
              </MedicalButton>
              <MedicalButton 
                variant="ghost" 
                size="icon" 
                className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-glow/10 rounded-xl"
                onClick={startAudioCall}
              >
                <Phone className="h-5 w-5" />
              </MedicalButton>
              <MedicalButton variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-glow/10 rounded-xl">
                <MoreVertical className="h-5 w-5" />
              </MedicalButton>
            </div>
          </>
        )}
      </div>

      {/* Messages Area */}
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-3"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex mb-2 ${msg.sender === "patient" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-md ${
                msg.sender === "patient"
                  ? "bg-gradient-primary text-primary-foreground"
                  : "bg-card text-card-foreground border border-border"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              <div className={`flex items-center justify-end mt-2 space-x-1`}>
                <Clock className={`h-3 w-3 ${
                  msg.sender === "patient" ? "text-primary-foreground/70" : "text-muted-foreground"
                }`} />
                <span className={`text-xs ${
                  msg.sender === "patient" ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>{msg.timestamp}</span>
                {msg.sender === "patient" && (
                  <CheckCheck className={`h-3 w-3 ${
                    msg.status === "read" ? "text-primary-foreground/90" : "text-primary-foreground/50"
                  }`} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-card/80 backdrop-blur-sm p-4 border-t border-border shadow-lg">
        <div className="flex items-center space-x-3">
          <MedicalButton variant="ghost" size="icon" className="text-primary hover:text-primary/80 hover:bg-primary/10 rounded-xl">
            <Paperclip className="h-5 w-5" />
          </MedicalButton>
          <div className="flex-1 relative">
            <Input
              placeholder="Type your message to doctor..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="bg-input border-border text-foreground placeholder-muted-foreground rounded-full pr-20 focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <MedicalButton variant="ghost" size="icon" className="text-primary hover:text-primary/80 hover:bg-primary/10 h-8 w-8 rounded-lg">
                <Camera className="h-4 w-4" />
              </MedicalButton>
              <MedicalButton variant="ghost" size="icon" className="text-primary hover:text-primary/80 hover:bg-primary/10 h-8 w-8 rounded-lg">
                <Mic className="h-4 w-4" />
              </MedicalButton>
            </div>
          </div>
          <MedicalButton 
            onClick={handleSendMessage}
            disabled={!message.trim()}
            variant="medical"
            className="rounded-full h-11 w-11 p-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </MedicalButton>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Mobile responsive: Show chat list or chat view based on selection */}
      <div className="md:hidden">
        {!selectedChat ? <ChatListView /> : <ChatView />}
      </div>
      
      {/* Desktop: Show both side by side */}
      <div className="hidden md:flex h-screen">
        <div className="w-1/3 border-r border-gray-700">
          <ChatListView />
        </div>
        <div className="flex-1">
          {selectedChat ? <ChatView /> : (
            <div className="h-full bg-gradient-background flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 medical-glow">
                  <Users className="h-12 w-12 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-foreground gradient-text">Select a Doctor to Start Consultation</h3>
                <p className="text-muted-foreground max-w-md mx-auto">Choose from your medical consultations to continue your conversation with healthcare professionals</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Call Interface Overlay */}
      {(isVideoCalling || isAudioCalling) && <CallInterface />}

      {!selectedChat && <BottomNavigation userRole="patient" />}
    </div>
  );
};

export default PatientDoctorChat;