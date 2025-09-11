import { useState } from "react";
import { 
  MessageSquare, 
  Video, 
  Phone, 
  Send, 
  Paperclip, 
  Smile,
  Search,
  Users,
  UserPlus,
  MoreVertical
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import BottomNavigation from "@/components/navigation/BottomNavigation";

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  isOwn: boolean;
  type: "text" | "image" | "file";
}

interface ChatContact {
  id: string;
  name: string;
  type: "patient" | "doctor";
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  avatar?: string;
}

const DoctorChat = () => {
  const [selectedChat, setSelectedChat] = useState<string>("1");
  const [messageInput, setMessageInput] = useState("");
  const [activeTab, setActiveTab] = useState<"patients" | "doctors">("patients");

  const patientChats: ChatContact[] = [
    {
      id: "1",
      name: "Alice Johnson",
      type: "patient",
      lastMessage: "Thank you for the prescription, doctor. When should I take my next dose?",
      timestamp: "2 min ago",
      unread: 2,
      online: true
    },
    {
      id: "2",
      name: "Robert Davis", 
      type: "patient",
      lastMessage: "I've uploaded my latest test results as you requested.",
      timestamp: "1 hour ago",
      unread: 0,
      online: false
    },
    {
      id: "3",
      name: "Sarah Wilson",
      type: "patient",
      lastMessage: "Could we reschedule tomorrow's appointment?",
      timestamp: "3 hours ago",
      unread: 1,
      online: true
    }
  ];

  const doctorChats: ChatContact[] = [
    {
      id: "4", 
      name: "Medical Board - Cardiology",
      type: "doctor",
      lastMessage: "Dr. Chen: Complex arrhythmia case discussion needed",
      timestamp: "15 min ago",
      unread: 3,
      online: true
    },
    {
      id: "5",
      name: "Dr. Michael Chen",
      type: "doctor", 
      lastMessage: "Can you review this ECG interpretation?",
      timestamp: "1 hour ago",
      unread: 1,
      online: true
    },
    {
      id: "6",
      name: "Emergency Consult Group",
      type: "doctor",
      lastMessage: "Dr. Rodriguez: Urgent cardiac case in ER",
      timestamp: "2 hours ago", 
      unread: 0,
      online: false
    }
  ];

  const currentMessages: ChatMessage[] = [
    {
      id: "1",
      sender: "Alice Johnson",
      message: "Hello Doctor, I wanted to follow up on my blood pressure medication.",
      timestamp: "10:30 AM",
      isOwn: false,
      type: "text"
    },
    {
      id: "2",
      sender: "You",
      message: "Hello Alice! How are you feeling? Any side effects from the new medication?",
      timestamp: "10:32 AM", 
      isOwn: true,
      type: "text"
    },
    {
      id: "3",
      sender: "Alice Johnson",
      message: "I'm feeling much better. The dizziness has reduced significantly.",
      timestamp: "10:35 AM",
      isOwn: false,
      type: "text"
    },
    {
      id: "4",
      sender: "You",
      message: "That's great to hear! Continue with the current dosage. Let me send you the prescription for next month.",
      timestamp: "10:37 AM",
      isOwn: true, 
      type: "text"
    },
    {
      id: "5",
      sender: "Alice Johnson",
      message: "Thank you for the prescription, doctor. When should I take my next dose?",
      timestamp: "10:40 AM",
      isOwn: false,
      type: "text"
    }
  ];

  const currentChats = activeTab === "patients" ? patientChats : doctorChats;
  const selectedContact = currentChats.find(chat => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle sending message
      setMessageInput("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="gradient-text">Medical Communications</span>
            </h1>
            <p className="text-muted-foreground">Chat with patients and medical colleagues</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[700px]">
          {/* Contacts Sidebar */}
          <div className="lg:col-span-1">
            <MedicalCard variant="glass" className="h-full flex flex-col">
              <MedicalCardHeader>
                <div className="flex space-x-2">
                  <MedicalButton
                    variant={activeTab === "patients" ? "medical" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("patients")}
                    className="flex-1"
                  >
                    Patients
                  </MedicalButton>
                  <MedicalButton
                    variant={activeTab === "doctors" ? "medical" : "outline"}
                    size="sm"
                    onClick={() => setActiveTab("doctors")}
                    className="flex-1"
                  >
                    Doctors
                  </MedicalButton>
                </div>
                <div className="relative mt-3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search chats..." className="pl-10" />
                </div>
              </MedicalCardHeader>
              <MedicalCardContent className="flex-1 overflow-y-auto">
                <div className="space-y-2">
                  {currentChats.map((chat) => (
                    <div
                      key={chat.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedChat === chat.id 
                          ? "bg-primary/20 border border-primary/30" 
                          : "bg-muted/30 hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedChat(chat.id)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${chat.online ? "bg-green-500" : "bg-gray-400"}`} />
                          <h4 className="font-medium text-sm truncate">{chat.name}</h4>
                        </div>
                        {chat.unread > 0 && (
                          <Badge variant="destructive" className="text-xs min-w-[20px] h-5">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                      <p className="text-xs text-muted-foreground mt-1">{chat.timestamp}</p>
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-3">
            <MedicalCard variant="glass" className="h-full flex flex-col">
              {/* Chat Header */}
              <MedicalCardHeader className="border-b border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedContact?.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedContact?.online ? "Online" : "Last seen 2 hours ago"}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <MedicalButton variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </MedicalButton>
                    <MedicalButton variant="outline" size="sm">
                      <Video className="h-4 w-4" />
                    </MedicalButton>
                    <MedicalButton variant="outline" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </MedicalButton>
                  </div>
                </div>
              </MedicalCardHeader>

              {/* Messages Area */}
              <MedicalCardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {currentMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.isOwn
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${
                          message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </MedicalCardContent>

              {/* Message Input */}
              <div className="border-t border-border/50 p-4">
                <div className="flex items-end space-x-2">
                  <div className="flex-1">
                    <Textarea
                      placeholder="Type your message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      rows={1}
                      className="resize-none"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <MedicalButton variant="outline" size="sm">
                      <Paperclip className="h-4 w-4" />
                    </MedicalButton>
                    <MedicalButton variant="outline" size="sm">
                      <Smile className="h-4 w-4" />
                    </MedicalButton>
                    <MedicalButton 
                      variant="medical" 
                      size="sm"
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </MedicalButton>
                  </div>
                </div>
              </div>
            </MedicalCard>
          </div>
        </div>
      </div>

      <BottomNavigation userRole="doctor" />
    </div>
  );
};

export default DoctorChat;