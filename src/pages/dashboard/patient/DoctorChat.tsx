import { useState, useEffect, useRef } from "react";
import { 
  Send, 
  Phone, 
  Video, 
  Paperclip, 
  Image as ImageIcon, 
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
  Users,
  FileText,
  Smile,
  X,
  Download,
  Star,
  MapPin,
  Calendar,
  Heart,
  Activity,
  CheckCircle,
  AlertCircle,
  Info,
  Trash2,
  Share2,
  Copy,
  
} from "lucide-react";
  
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent } from "@/components/ui/medical-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const PatientDoctorChat = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [showChatList, setShowChatList] = useState(true);
  const [isVideoCalling, setIsVideoCalling] = useState(false);
  const [isAudioCalling, setIsAudioCalling] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDoctorInfo, setShowDoctorInfo] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);

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
      phone: "+91 88851 61078",
      hospital: "Apollo Hospital",
      experience: "15+ years",
      rating: 4.9,
      nextAppointment: "Tomorrow, 2:30 PM",
      category: "active"
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      specialty: "General Medicine",
      lastMessage: "Take the prescribed medication twice daily with food.",
      timestamp: "Yesterday", 
      unread: 0,
      online: false,
      avatar: "MC",
      phone: "+91 98765 43210",
      hospital: "Max Healthcare",
      experience: "12+ years",
      rating: 4.8,
      nextAppointment: null,
      category: "recent"
    },
    {
      id: 3,
      doctorName: "Dr. Priya Sharma", 
      specialty: "Dermatologist",
      lastMessage: "The skin condition is improving. Continue the treatment.",
      timestamp: "2 days ago",
      unread: 0,
      online: true,
      avatar: "PS",
      phone: "+91 87654 32109",
      hospital: "Fortis Hospital",
      experience: "10+ years",
      rating: 4.9,
      nextAppointment: "Next week",
      category: "recent"
    },
    {
      id: 4,
      doctorName: "Dr. Rajesh Kumar",
      specialty: "Pediatrician",
      lastMessage: "The vaccination schedule has been updated.",
      timestamp: "3 days ago",
      unread: 0,
      online: false,
      avatar: "RK",
      phone: "+91 76543 21098",
      hospital: "City General Hospital",
      experience: "18+ years",
      rating: 4.7,
      nextAppointment: null,
      category: "archived"
    },
    {
      id: 5,
      doctorName: "Dr. Ananya Patel",
      specialty: "Gynecologist",
      lastMessage: "All reports are normal. See you in the next checkup.",
      timestamp: "1 week ago",
      unread: 0, 
      online: false,
      avatar: "AP",
      phone: "+91 65432 10987",
      hospital: "Apollo Hospital",
      experience: "14+ years",
      rating: 4.9,
      nextAppointment: "Jan 30",
      category: "archived"
    }
  ];

  const chatMessages: Record<number, any[]> = {
    1: [
      {
        id: 1,
        sender: "doctor",
        content: "Hello! I've reviewed your latest lab results. Overall, they look quite good.",
        timestamp: "10:30 AM",
        status: "read",
        type: "text"
      },
      {
        id: 2,
        sender: "patient", 
        content: "That's great to hear! I was a bit worried about the cholesterol levels.",
        timestamp: "10:32 AM",
        status: "read",
        type: "text"
      },
      {
        id: 3,
        sender: "doctor",
        content: "Your cholesterol is slightly elevated but nothing to worry about. I recommend a diet modification and regular exercise.",
        timestamp: "10:35 AM",
        status: "read",
        type: "text"
      },
      {
        id: 4,
        sender: "patient",
        content: "Should I continue with my current medications?",
        timestamp: "10:36 AM",
        status: "read",
        type: "text"
      },
      {
        id: 5,
        sender: "doctor",
        content: "Yes, continue with the current medications. I'm sending you a detailed prescription.",
        timestamp: "10:37 AM",
        status: "read",
        type: "text"
      },
      {
        id: 6,
        sender: "doctor",
        content: "prescription.pdf",
        timestamp: "10:37 AM",
        status: "delivered",
        type: "file",
        fileName: "Prescription_Jan2024.pdf",
        fileSize: "256 KB"
      },
      {
        id: 7,
        sender: "doctor",
        content: "Your test results look normal. Let's schedule a follow-up next week.",
        timestamp: "11:36 AM",
        status: "delivered",
        type: "text"
      }
    ],
    2: [
      {
        id: 1,
        sender: "patient",
        content: "Hello Doctor, I've been feeling much better since the last consultation.",
        timestamp: "Yesterday, 9:15 AM",
        status: "read",
        type: "text"
      },
      {
        id: 2,
        sender: "doctor",
        content: "That's wonderful to hear! Keep taking the medications as prescribed.",
        timestamp: "Yesterday, 9:20 AM",
        status: "read",
        type: "text"
      },
      {
        id: 3,
        sender: "doctor",
        content: "Take the prescribed medication twice daily with food.",
        timestamp: "Yesterday, 9:21 AM",
        status: "read",
        type: "text"
      }
    ],
    3: [
      {
        id: 1,
        sender: "patient",
        content: "The rash has reduced significantly. Thank you for the treatment!",
        timestamp: "2 days ago, 3:30 PM",
        status: "read",
        type: "text"
      },
      {
        id: 2,
        sender: "doctor",
        content: "Excellent! Continue the ointment for another week as discussed.",
        timestamp: "2 days ago, 3:45 PM",
        status: "read",
        type: "text"
      },
      {
        id: 3,
        sender: "doctor",
        content: "The skin condition is improving. Continue the treatment.",
        timestamp: "2 days ago, 3:46 PM",
        status: "read",
        type: "text"
      }
    ]
  };

  const currentDoctor = selectedChat ? chatList.find(chat => chat.id === selectedChat) : null;
  const messages = selectedChat ? chatMessages[selectedChat] || [] : [];

  // Filter chat list based on search and filter
  const filteredChatList = chatList.filter(chat => {
    const matchesSearch = chat.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chat.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || chat.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleSendMessage = () => {
    if (message.trim()) {
      // Simulate sending message
      setMessage("");
      // Show typing indicator
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  const handleChatSelect = (chatId: number) => {
    setSelectedChat(chatId);
    setShowChatList(false);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
    setShowChatList(true);
    setShowDoctorInfo(false);
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
      <div className="bg-gradient-primary p-4 sm:p-5 flex items-center justify-between border-b border-primary/20 shadow-medical">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-foreground/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Users className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary-foreground">Doctor Consultations</h1>
            <p className="text-xs text-primary-foreground/70">{filteredChatList.length} conversations</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <MedicalButton 
            variant="ghost" 
            size="icon" 
            className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-xl"
          >
            <Plus className="h-5 w-5" />
          </MedicalButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MedicalButton 
                variant="ghost" 
                size="icon" 
                className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-xl"
              >
                <MoreVertical className="h-5 w-5" />
              </MedicalButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                New Group Chat
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Star className="mr-2 h-4 w-4" />
                Starred Messages
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Info className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search doctors or specialties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-card border-border text-foreground placeholder-muted-foreground rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 min-h-[44px]"
          />
          {searchTerm && (
            <MedicalButton
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-4 w-4" />
            </MedicalButton>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {["all", "active", "recent", "archived"].map((filter) => (
            <MedicalButton
              key={filter}
              variant={selectedFilter === filter ? "medical" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter)}
              className="min-w-fit capitalize rounded-full min-h-[36px]"
            >
              {filter === "all" && "All Chats"}
              {filter === "active" && "Active"}
              {filter === "recent" && "Recent"}
              {filter === "archived" && "Archived"}
            </MedicalButton>
          ))}
        </div>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="px-3 pb-20 space-y-2">
          {filteredChatList.length > 0 ? filteredChatList.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleChatSelect(chat.id)}
              className="p-4 hover:bg-card/50 cursor-pointer rounded-xl transition-all duration-200 border border-transparent hover:border-primary/30 hover:shadow-md active:scale-[0.98]"
            >
              <div className="flex items-center space-x-3">
                <div className="relative flex-shrink-0">
                  <Avatar className="w-14 h-14 ring-2 ring-primary/20">
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground font-bold text-base">
                      {chat.avatar}
                    </AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-success rounded-full border-2 border-background shadow-sm" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate text-base">
                        {chat.doctorName}
                      </h3>
                      <p className="text-xs text-primary font-medium">{chat.specialty}</p>
                    </div>
                    <div className="flex flex-col items-end ml-2">
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{chat.timestamp}</span>
                      {chat.nextAppointment && (
                        <Badge variant="secondary" className="text-[10px] mt-1 whitespace-nowrap">
                          <Calendar className="w-2.5 h-2.5 mr-1" />
                          {chat.nextAppointment}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate flex-1">
                      {chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <Badge className="bg-primary text-primary-foreground text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center ml-2">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No doctors found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );

  // Doctor Info Panel
  const DoctorInfoPanel = ({ doctor }: { doctor: typeof chatList[0] | undefined }) => {
    if (!doctor) return null;
    
    return (
      <Dialog open={showDoctorInfo} onOpenChange={setShowDoctorInfo}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Doctor Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Doctor Avatar & Basic Info */}
            <div className="flex flex-col items-center text-center space-y-3">
              <Avatar className="w-24 h-24 ring-4 ring-primary/20">
                <AvatarFallback className="bg-gradient-primary text-primary-foreground font-bold text-2xl">
                  {doctor.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold">{doctor.doctorName}</h3>
                <p className="text-primary font-medium">{doctor.specialty}</p>
                <div className="flex items-center justify-center space-x-2 mt-2">
                  <Badge variant={doctor.online ? "default" : "secondary"} className="text-xs">
                    {doctor.online ? "Online" : "Offline"}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500 mr-1" />
                    <span className="font-semibold">{doctor.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hospital & Experience */}
            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-card rounded-lg">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Hospital</p>
                  <p className="text-sm text-muted-foreground">{doctor.hospital}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-card rounded-lg">
                <Activity className="w-5 h-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Experience</p>
                  <p className="text-sm text-muted-foreground">{doctor.experience}</p>
                </div>
              </div>
              {doctor.nextAppointment && (
                <div className="flex items-start space-x-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <Calendar className="w-5 h-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Next Appointment</p>
                    <p className="text-sm text-muted-foreground">{doctor.nextAppointment}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-2">
              <MedicalButton
                variant="medical"
                className="w-full"
                onClick={() => {
                  setShowDoctorInfo(false);
                  // Implement appointment booking logic
                }}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </MedicalButton>
              <MedicalButton
                variant="outline"
                className="w-full"
                onClick={() => {
                  setShowDoctorInfo(false);
                  startVideoCall();
                }}
              >
                <VideoIcon className="w-4 h-4 mr-2" />
                Start Video Call
              </MedicalButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

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
            <div 
              className="flex-1 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setShowDoctorInfo(true)}
            >
              <h3 className="font-semibold text-primary-foreground">
                {currentDoctor.doctorName}
              </h3>
              <p className="text-sm text-primary-foreground/80 flex items-center">
                {currentDoctor.online ? (
                  <>
                    <span className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
                    Online now
                  </>
                ) : (
                  "Last seen 2 hours ago"
                )}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <MedicalButton 
                variant="ghost" 
                size="icon" 
                className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-xl min-h-[44px] min-w-[44px]"
                onClick={startVideoCall}
              >
                <VideoIcon className="h-5 w-5" />
              </MedicalButton>
              <MedicalButton 
                variant="ghost" 
                size="icon" 
                className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-xl min-h-[44px] min-w-[44px]"
                onClick={startAudioCall}
              >
                <Phone className="h-5 w-5" />
              </MedicalButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <MedicalButton 
                    variant="ghost" 
                    size="icon" 
                    className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-xl min-h-[44px] min-w-[44px]"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </MedicalButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => setShowDoctorInfo(true)}>
                    <Info className="mr-2 h-4 w-4" />
                    View Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Appointment
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Star className="mr-2 h-4 w-4" />
                    Mark as Favorite
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Chat
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div 
          className="space-y-3 pb-4"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex mb-3 ${msg.sender === "patient" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender !== "patient" && currentDoctor && (
                <Avatar className="w-8 h-8 mr-2 ring-2 ring-primary/10 flex-shrink-0">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs font-semibold">
                    {currentDoctor.avatar}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="flex flex-col max-w-[75%] sm:max-w-[60%]">
                {msg.type === "file" ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div
                        className={`rounded-2xl px-4 py-3 shadow-md cursor-pointer hover:shadow-lg transition-shadow ${
                          msg.sender === "patient"
                            ? "bg-gradient-primary text-primary-foreground"
                            : "bg-card text-card-foreground border border-border"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            msg.sender === "patient" ? "bg-primary-foreground/20" : "bg-primary/10"
                          }`}>
                            <FileText className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{msg.fileName}</p>
                            <p className={`text-xs ${
                              msg.sender === "patient" ? "text-primary-foreground/70" : "text-muted-foreground"
                            }`}>
                              {msg.fileSize}
                            </p>
                          </div>
                          <Download className="h-4 w-4 flex-shrink-0" />
                        </div>
                        {msg.content && (
                          <p className="text-sm mt-2 leading-relaxed">{msg.content}</p>
                        )}
                        <div className={`flex items-center justify-end mt-2 space-x-1`}>
                          <Clock className={`h-3 w-3 ${
                            msg.sender === "patient" ? "text-primary-foreground/70" : "text-muted-foreground"
                          }`} />
                          <span className={`text-xs ${
                            msg.sender === "patient" ? "text-primary-foreground/70" : "text-muted-foreground"
                          }`}>{msg.timestamp}</span>
                          {msg.sender === "patient" && (
                            msg.status === "read" ? (
                              <CheckCheck className="h-3 w-3 text-primary-foreground/90" />
                            ) : msg.status === "delivered" ? (
                              <CheckCheck className="h-3 w-3 text-primary-foreground/50" />
                            ) : (
                              <CheckCircle className="h-3 w-3 text-primary-foreground/50" />
                            )
                          )}
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div
                        className={`rounded-2xl px-4 py-3 shadow-md cursor-pointer hover:shadow-lg transition-shadow ${
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
                            msg.status === "read" ? (
                              <CheckCheck className="h-3 w-3 text-primary-foreground/90" />
                            ) : msg.status === "delivered" ? (
                              <CheckCheck className="h-3 w-3 text-primary-foreground/50" />
                            ) : (
                              <CheckCircle className="h-3 w-3 text-primary-foreground/50" />
                            )
                          )}
                        </div>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align={msg.sender === "patient" ? "end" : "start"}>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Star className="mr-2 h-4 w-4" />
                        Star Message
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center space-x-2 mb-3">
              <Avatar className="w-8 h-8 ring-2 ring-primary/10">
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs font-semibold">
                  {currentDoctor?.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="bg-card border border-border rounded-2xl px-4 py-3 shadow-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

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