import { useState } from "react";
import { 
  Brain, 
  Send, 
  Mic, 
  Camera, 
  FileText, 
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  Stethoscope
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const PatientAIChat = () => {
  const [message, setMessage] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "Hello! I'm your AI Health Assistant. I can help you identify potential health conditions based on your symptoms and recommend appropriate specialists. How are you feeling today?",
      timestamp: "10:30 AM"
    }
  ]);

  const quickSymptoms = [
    "Headache", "Fever", "Cough", "Chest Pain", "Shortness of breath", 
    "Nausea", "Fatigue", "Dizziness", "Back Pain", "Joint Pain"
  ];

  const recommendations = [
    {
      condition: "Common Cold",
      probability: 85,
      severity: "mild",
      specialist: "General Physician",
      symptoms: ["Runny nose", "Cough", "Mild fever"],
      actions: ["Rest", "Stay hydrated", "Monitor symptoms"]
    },
    {
      condition: "Seasonal Allergies", 
      probability: 60,
      severity: "mild",
      specialist: "Allergist",
      symptoms: ["Sneezing", "Watery eyes", "Congestion"],
      actions: ["Avoid allergens", "Consider antihistamines"]
    }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: chatMessages.length + 1,
      type: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages([...chatMessages, newMessage]);
    setMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: chatMessages.length + 2,
        type: "ai", 
        content: "Thank you for sharing your symptoms. Based on what you've described, I'm analyzing the information. Let me provide you with some insights and recommendations.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const handleSymptomAnalysis = () => {
    if (!symptoms.trim()) return;

    const analysisMessage = {
      id: chatMessages.length + 1,
      type: "analysis",
      content: `Analyzing symptoms: ${symptoms}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages([...chatMessages, analysisMessage]);
    setSymptoms("");
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4 md:p-6 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text">AI Health Assistant</span>
          </h1>
          <p className="text-muted-foreground">Get AI-powered health insights & specialist recommendations</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chat Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chat Messages */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-primary" />
                  AI Conversation
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="h-96 overflow-y-auto space-y-4 mb-4 p-2">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-lg ${
                        msg.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : msg.type === 'analysis'
                          ? 'bg-orange-500/20 border border-orange-500/30'
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{msg.content}</p>
                        <span className="text-xs opacity-70 mt-1 block">{msg.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Message Input */}
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message or describe symptoms..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <MedicalButton onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </MedicalButton>
                  <MedicalButton variant="outline" size="icon">
                    <Mic className="h-4 w-4" />
                  </MedicalButton>
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Symptom Analysis */}
            <MedicalCard variant="glass" className="medical-glow">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <AlertCircle className="mr-2 h-5 w-5 text-primary" />
                  Symptom Analysis
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Describe your symptoms in detail:</label>
                    <Textarea
                      placeholder="Example: I have a persistent headache for 2 days, mild fever, and feeling tired..."
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      rows={3}
                    />
                  </div>
                  
                  {/* Quick Symptom Tags */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Quick symptoms:</label>
                    <div className="flex flex-wrap gap-2">
                      {quickSymptoms.map((symptom) => (
                        <Badge 
                          key={symptom}
                          variant="outline" 
                          className="cursor-pointer hover:bg-primary/10"
                          onClick={() => setSymptoms(prev => prev ? `${prev}, ${symptom}` : symptom)}
                        >
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <MedicalButton onClick={handleSymptomAnalysis} variant="medical" className="flex-1">
                      <Brain className="mr-2 h-4 w-4" />
                      Analyze Symptoms
                    </MedicalButton>
                    <MedicalButton variant="outline" size="icon">
                      <Camera className="h-4 w-4" />
                    </MedicalButton>
                    <MedicalButton variant="outline" size="icon">
                      <FileText className="h-4 w-4" />
                    </MedicalButton>
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>

          {/* Recommendations Panel */}
          <div className="space-y-6">
            {/* AI Recommendations */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  AI Recommendations
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/30 border border-border/50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{rec.condition}</h4>
                        <Badge 
                          variant={rec.severity === "mild" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {rec.probability}% match
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="font-medium">Severity:</span>
                          <Badge 
                            variant="outline" 
                            className={`ml-1 text-xs ${rec.severity === 'mild' ? 'text-green-600' : 'text-orange-600'}`}
                          >
                            {rec.severity}
                          </Badge>
                        </div>
                        
                        <div>
                          <span className="font-medium">Specialist:</span>
                          <span className="text-primary ml-1">{rec.specialist}</span>
                        </div>
                        
                        <div>
                          <span className="font-medium">Symptoms:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {rec.symptoms.map((symptom, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {symptom}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <span className="font-medium">Recommended actions:</span>
                          <ul className="mt-1 space-y-1">
                            {rec.actions.map((action, i) => (
                              <li key={i} className="text-muted-foreground">• {action}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <MedicalButton variant="medical" size="sm" className="w-full mt-3">
                        <Stethoscope className="mr-1 h-3 w-3" />
                        Find {rec.specialist}
                      </MedicalButton>
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* AI Features */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle>AI Features</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 rounded-lg bg-primary/10">
                    <Brain className="h-4 w-4 text-primary" />
                    <div className="text-sm">
                      <div className="font-medium">Smart Diagnosis</div>
                      <div className="text-xs text-muted-foreground">AI-powered symptom analysis</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-2 rounded-lg bg-primary/10">
                    <Users className="h-4 w-4 text-primary" />
                    <div className="text-sm">
                      <div className="font-medium">Specialist Matching</div>
                      <div className="text-xs text-muted-foreground">Find the right doctor</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-2 rounded-lg bg-primary/10">
                    <Clock className="h-4 w-4 text-primary" />
                    <div className="text-sm">
                      <div className="font-medium">24/7 Availability</div>
                      <div className="text-xs text-muted-foreground">Always here to help</div>
                    </div>
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>
        </div>
      </div>

      <BottomNavigation userRole="patient" />
    </div>
  );
};

export default PatientAIChat;