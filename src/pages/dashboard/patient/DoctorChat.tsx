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
  CheckCheck
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const PatientDoctorChat = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState("");

  const chatList = [
    {
      id: 1,
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      lastMessage: "Your test results look normal. Let's schedule a follow-up next week.",
      timestamp: "2 mins ago",
      unread: 2,
      online: true,
      avatar: "SJ"
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      specialty: "General Medicine",
      lastMessage: "Please take the prescribed medication twice daily after meals.",
      timestamp: "1 hour ago",
      unread: 0,
      online: false,
      avatar: "MC"
    },
    {
      id: 3,
      doctorName: "Dr. Priya Sharma",
      specialty: "Dermatologist",
      lastMessage: "The skin condition should improve with the new treatment.",
      timestamp: "Yesterday",
      unread: 1,
      online: true,
      avatar: "PS"
    }
  ];

  const messages = [
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
      content: "Your cholesterol is within normal range now. The lifestyle changes you've made are working well.",
      timestamp: "10:33 AM",
      status: "read"
    },
    {
      id: 4,
      sender: "patient",
      content: "Should I continue with the current medication dosage?",
      timestamp: "10:35 AM",
      status: "read"
    },
    {
      id: 5,
      sender: "doctor",
      content: "Yes, continue with the same dosage for another month. We'll reassess after your next appointment.",
      timestamp: "10:36 AM",
      status: "delivered"
    },
    {
      id: 6,
      sender: "doctor",
      content: "Your test results look normal. Let's schedule a follow-up next week.",
      timestamp: "10:38 AM",
      status: "delivered"
    }
  ];

  const currentDoctor = chatList.find(chat => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add message sending logic here
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background pb-24">
      <div className="max-w-7xl mx-auto h-screen flex">
        {/* Chat List Sidebar */}
        <div className="w-1/3 border-r border-border/50 bg-background/50">
          <div className="p-4 border-b border-border/50">
            <h2 className="text-xl font-bold mb-4">
              <span className="gradient-text">My Doctors</span>
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search doctors..."
                className="pl-10"
              />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-2">
              {chatList.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                    selectedChat === chat.id 
                      ? "bg-primary/10 border border-primary/20" 
                      : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-primary/20 text-primary font-medium">
                          {chat.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {chat.online && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium truncate">{chat.doctorName}</h3>
                        <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{chat.specialty}</p>
                      <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <Badge variant="default" className="text-xs">
                        {chat.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {currentDoctor && (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border/50 bg-background/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary/20 text-primary font-medium">
                          {currentDoctor.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {currentDoctor.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{currentDoctor.doctorName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {currentDoctor.online ? "Online" : "Last seen 2 hours ago"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MedicalButton variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </MedicalButton>
                    <MedicalButton variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                    </MedicalButton>
                    <MedicalButton variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </MedicalButton>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "patient" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          msg.sender === "patient"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <div className={`flex items-center justify-end mt-2 space-x-1 ${
                          msg.sender === "patient" ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}>
                          <Clock className="h-3 w-3" />
                          <span className="text-xs">{msg.timestamp}</span>
                          {msg.sender === "patient" && (
                            <CheckCheck className={`h-3 w-3 ${
                              msg.status === "read" ? "text-primary-foreground" : "text-primary-foreground/50"
                            }`} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t border-border/50 bg-background/50">
                <div className="flex items-center space-x-2">
                  <MedicalButton variant="ghost" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </MedicalButton>
                  <MedicalButton variant="ghost" size="icon">
                    <Image className="h-4 w-4" />
                  </MedicalButton>
                  <div className="flex-1">
                    <Input
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                  </div>
                  <MedicalButton variant="ghost" size="icon">
                    <Mic className="h-4 w-4" />
                  </MedicalButton>
                  <MedicalButton 
                    variant="medical" 
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </MedicalButton>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <BottomNavigation userRole="patient" />
    </div>
  );
};

export default PatientDoctorChat;