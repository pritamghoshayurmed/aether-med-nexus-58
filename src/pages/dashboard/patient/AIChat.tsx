import { useState } from "react";
import {
  Brain,
  Send,
  Mic,
  User,
  Bot,
  Menu,
  Upload,
  Settings,
  History
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const PatientAIChat = () => {
  const [message, setMessage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "Hello! I'm your AI Health Assistant. How can I help you today?",
      timestamp: "10:30 AM"
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages([...chatMessages, newMessage]);

    setMessage("");

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand your concern. Let me help you with that.",
        "That's a great question! Based on what you've told me...",
        "I'm here to assist you with your health-related queries.",
        "Let me provide you with some helpful information about that."
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const aiResponse = {
        id: Date.now() + 1,
        type: "ai",
        content: randomResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, aiResponse]);
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

  const handleMicClick = () => {
    setIsSpeaking(!isSpeaking);
    // For regular chat, just toggle mic state
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4 md:p-6 pb-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text">AI Health Assistant</span>
          </h1>
          <p className="text-muted-foreground">Chat with AI for your health concerns</p>
        </div>

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
                    <div className={`p-3 rounded-lg ${msg.type === 'user'
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
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <MedicalButton onClick={handleDocumentUpload} variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </MedicalButton>
              <MedicalButton
                onClick={() => handleMicClick()}
                variant={isSpeaking ? "destructive" : "outline"}
                size="icon"
              >
                <Mic className={`h-4 w-4 ${isSpeaking ? 'animate-pulse' : ''}`} />
              </MedicalButton>
              <MedicalButton onClick={() => handleSendMessage()} size="icon">
                <Send className="h-4 w-4" />
              </MedicalButton>
            </div>
          </MedicalCardContent>
        </MedicalCard>
      </div>

      <BottomNavigation userRole="patient" />
    </div>
  );
};

export default PatientAIChat;