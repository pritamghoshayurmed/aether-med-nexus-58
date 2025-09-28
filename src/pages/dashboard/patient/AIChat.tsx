import { useState } from "react";
import {
  Brain,
  Send,
  Mic,
  MessageCircle,
  Video,
  User,
  Bot,
  Menu,
  Upload,
  Settings,
  History,
  X
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const PatientAIChat = () => {
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAvatarSpeaking, setIsAvatarSpeaking] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "Hello! I'm your AI Health Assistant. How can I help you today?",
      timestamp: "10:30 AM"
    }
  ]);

  const [avatarMessages, setAvatarMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "Hi there! I'm Dr. Virtual, your conversational AI health companion. I can speak with you naturally about your health concerns.",
      timestamp: "10:30 AM"
    }
  ]);

  const handleSendMessage = (targetTab = activeTab) => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (targetTab === "chat") {
      setChatMessages([...chatMessages, newMessage]);
    } else {
      setAvatarMessages([...avatarMessages, newMessage]);
    }
    
    setMessage("");

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        chat: [
          "I understand your concern. Let me help you with that.",
          "That's a great question! Based on what you've told me...",
          "I'm here to assist you with your health-related queries.",
          "Let me provide you with some helpful information about that."
        ],
        avatar: [
          "Thank you for sharing that with me. Let's discuss this further.",
          "I can see why that would be concerning. Here's what I think...",
          "That's quite interesting. From a medical perspective...",
          "I appreciate you being so detailed. Let me explain..."
        ]
      };
      
      const responseArray = responses[targetTab] || responses.chat;
      const randomResponse = responseArray[Math.floor(Math.random() * responseArray.length)];
      
      const aiResponse = {
        id: Date.now() + 1,
        type: "ai", 
        content: randomResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      if (targetTab === "chat") {
        setChatMessages(prev => [...prev, aiResponse]);
      } else {
        setAvatarMessages(prev => [...prev, aiResponse]);
      }
    }, 1500);
  };

  const handleDocumentUpload = () => {
    // Simulate document upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.txt,.jpg,.png';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const newMessage = {
          id: Date.now(),
          type: "user",
          content: `Uploaded document: ${file.name}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, newMessage]);

        // Simulate AI response
        setTimeout(() => {
          const aiResponse = {
            id: Date.now() + 1,
            type: "ai",
            content: `I've received your document "${file.name}". Let me analyze it and provide insights.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setChatMessages(prev => [...prev, aiResponse]);
        }, 1500);
      }
    };
    input.click();
  };

  const handleMicClick = (targetTab = activeTab) => {
    if (targetTab === "avatar") {
      setIsSpeaking(!isSpeaking);
      setIsAvatarSpeaking(!isAvatarSpeaking);

      // Simulate speaking animation duration
      setTimeout(() => {
        setIsSpeaking(false);
        setIsAvatarSpeaking(false);
      }, 3000);
    } else {
      setIsSpeaking(!isSpeaking);
      // For regular chat, just toggle mic state
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4 md:p-6 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text">AI Health Assistant</span>
          </h1>
          <p className="text-muted-foreground">Chat with AI in text or through conversational avatar</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              AI Chat
            </TabsTrigger>
            <TabsTrigger value="avatar" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              AI Avatar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-0">
            <MedicalCard variant="glass" className="h-[600px] flex flex-col">
              <MedicalCardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-4">
                  <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Menu className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-80">
                      <SheetHeader>
                        <SheetTitle>Chat Menu</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6 space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <History className="h-4 w-4" />
                            Previous Chats
                          </h4>
                          <div className="space-y-1 pl-6">
                            <div className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                              Today's Chat
                            </div>
                            <div className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                              Yesterday's Chat
                            </div>
                            <div className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                              Health Consultation - Sep 25
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            Chat Settings
                          </h4>
                          <div className="space-y-1 pl-6">
                            <div className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                              Response Style
                            </div>
                            <div className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                              Language
                            </div>
                            <div className="text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                              Privacy Settings
                            </div>
                          </div>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>
                  <MedicalCardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-primary" />
                    AI Text Chat
                  </MedicalCardTitle>
                </div>
              </MedicalCardHeader>
              <MedicalCardContent className="flex-1 flex flex-col">
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-2">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarFallback className={`text-xs ${msg.type === 'user' ? 'bg-primary text-white' : 'bg-secondary'}`}>
                            {msg.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`p-3 rounded-lg ${
                          msg.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}>
                          <p className="text-sm">{msg.content}</p>
                          <span className="text-xs opacity-70 mt-1 block">{msg.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="flex space-x-2 border-t pt-4">
                  <Input
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage('chat')}
                    className="flex-1"
                  />
                  <MedicalButton onClick={handleDocumentUpload} variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </MedicalButton>
                  <MedicalButton
                    onClick={() => handleMicClick('chat')}
                    variant={isSpeaking ? "destructive" : "outline"}
                    size="icon"
                  >
                    <Mic className={`h-4 w-4 ${isSpeaking ? 'animate-pulse' : ''}`} />
                  </MedicalButton>
                  <MedicalButton onClick={() => handleSendMessage('chat')} size="icon">
                    <Send className="h-4 w-4" />
                  </MedicalButton>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </TabsContent>

          <TabsContent value="avatar" className="space-y-0">
            <MedicalCard variant="glass" className="h-[600px] flex flex-col">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <Video className="mr-2 h-5 w-5 text-primary" />
                  Conversational AI Avatar
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent className="flex-1 flex flex-col">
                {/* Avatar Display Area - Full Height */}
                <div className="flex-1 flex items-center justify-center">
                  {/* Avatar Video/Animation Area */}
                  <div className="w-full h-full max-w-md max-h-96 bg-muted/30 rounded-lg flex items-center justify-center border border-border/50 relative overflow-hidden">
                    <div className="text-center relative z-10">
                      {/* Avatar Circle with Enhanced Animation */}
                      <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-500 ${
                        isAvatarSpeaking
                          ? 'bg-gradient-to-r from-red-500/40 to-orange-500/40 scale-125 shadow-2xl shadow-red-500/30'
                          : 'bg-gradient-to-r from-primary/30 to-blue-500/30 scale-100'
                      }`}>
                        <User className={`h-16 w-16 transition-all duration-500 ${
                          isAvatarSpeaking
                            ? 'text-red-400 animate-bounce'
                            : 'text-primary'
                        }`} />
                      </div>

                      {/* Status Text */}
                      <div className="space-y-2">
                        <p className={`text-lg font-medium transition-colors duration-300 ${
                          isAvatarSpeaking ? 'text-red-400' : 'text-muted-foreground'
                        }`}>
                          {isAvatarSpeaking ? 'AI Avatar is speaking...' : 'AI Avatar is listening'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {isAvatarSpeaking ? 'Responding to your voice' : 'Ready for natural conversation'}
                        </p>
                      </div>
                    </div>

                    {/* Animated Background Effects */}
                    {isAvatarSpeaking && (
                      <>
                        <div className="absolute inset-0 rounded-lg border-4 border-red-500/20 animate-ping"></div>
                        <div className="absolute inset-4 rounded-lg border-2 border-orange-500/30 animate-pulse"></div>
                        <div className="absolute inset-8 rounded-lg border border-yellow-500/20 animate-ping" style={{animationDelay: '0.5s'}}></div>
                      </>
                    )}

                    {/* Subtle Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-secondary/20"></div>
                    </div>
                  </div>
                </div>

                {/* Avatar Controls - Enhanced Mic Button */}
                <div className="flex justify-center border-t pt-6 pb-4">
                  <MedicalButton
                    onClick={() => handleMicClick('avatar')}
                    variant={isSpeaking ? "destructive" : "medical"}
                    size="lg"
                    className={`h-20 w-20 rounded-full transition-all duration-500 relative overflow-hidden ${
                      isSpeaking
                        ? 'animate-pulse scale-110 shadow-2xl shadow-red-500/50 ring-4 ring-red-500/30'
                        : 'scale-100 shadow-lg'
                    }`}
                  >
                    {/* Mic Icon with Animation */}
                    <Mic className={`h-8 w-8 transition-all duration-300 relative z-10 ${
                      isSpeaking
                        ? 'text-white animate-bounce'
                        : 'text-white'
                    }`} />

                    {/* Ripple Effect */}
                    {isSpeaking && (
                      <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping"></div>
                    )}

                    {/* Background Glow */}
                    <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
                      isSpeaking
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 opacity-90'
                        : 'bg-gradient-to-r from-primary to-blue-500 opacity-80'
                    }`}></div>
                  </MedicalButton>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation userRole="patient" />
    </div>
  );
};

export default PatientAIChat;