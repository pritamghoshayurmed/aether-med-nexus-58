import { useState, useEffect, useRef } from "react";
import { 
  Send, 
  Phone, 
  Video, 
  Search,
  ArrowLeft,
  MessageSquare,
  Calendar,
  User
} from "lucide-react";
  
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent } from "@/components/ui/medical-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import { useAppointments } from "@/hooks/useDatabase";
import { useAuth } from "@/contexts/AuthContext";

const PatientDoctorChat = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [showChatList, setShowChatList] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { appointments, loading } = useAppointments();
  const { user } = useAuth();

  // Get unique doctors from appointments
  const doctorsFromAppointments = appointments.reduce((acc: any[], apt: any) => {
    const doctorId = apt.doctor_id;
    if (!acc.find((d: any) => d.id === doctorId) && apt.doctors) {
      acc.push({
        id: doctorId,
        doctorName: apt.doctors.profiles?.full_name || 'Doctor',
        specialty: apt.doctors.specialty || 'Specialist',
        avatar: apt.doctors.profiles?.full_name?.split(' ').map((n: string) => n[0]).join('') || 'DR',
        lastAppointment: apt.appointment_date,
        online: false // TODO: Implement real-time online status
      });
    }
    return acc;
  }, []);

  const filteredDoctors = doctorsFromAppointments.filter((doctor: any) =>
    doctor.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Auto-scroll to bottom on new messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // TODO: Implement actual message sending via Supabase
      console.log('Sending message:', message);
      setMessage("");
    }
  };

  const selectedDoctor = doctorsFromAppointments.find((d: any) => d.id === selectedChat);

  return (
    <div className="min-h-screen bg-gradient-background pb-20">
      <div className="h-screen flex flex-col max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {selectedChat && (
                <MedicalButton
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedChat(null);
                    setShowChatList(true);
                  }}
                  className="lg:hidden"
                >
                  <ArrowLeft className="h-5 w-5" />
                </MedicalButton>
              )}
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">
                  {selectedChat && selectedDoctor ? selectedDoctor.doctorName : 'Messages'}
                </h1>
                {selectedChat && selectedDoctor && (
                  <p className="text-sm text-muted-foreground">{selectedDoctor.specialty}</p>
                )}
              </div>
            </div>
            {selectedChat && (
              <div className="flex items-center space-x-2">
                <MedicalButton variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </MedicalButton>
                <MedicalButton variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </MedicalButton>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Chat List Sidebar */}
          <div className={`${showChatList ? 'flex' : 'hidden'} lg:flex flex-col w-full lg:w-80 border-r border-border bg-white/50`}>
            {/* Search */}
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search doctors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Doctor List */}
            <ScrollArea className="flex-1">
              {loading ? (
                <div className="p-4 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                  <p className="text-sm text-muted-foreground">Loading...</p>
                </div>
              ) : filteredDoctors.length === 0 ? (
                <div className="p-8 text-center">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No conversations yet</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Start a conversation after booking an appointment with a doctor
                  </p>
                  <MedicalButton 
                    variant="medical"
                    onClick={() => window.location.href = '/appointment/booking'}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Appointment
                  </MedicalButton>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {filteredDoctors.map((doctor: any) => (
                    <div
                      key={doctor.id}
                      onClick={() => {
                        setSelectedChat(doctor.id);
                        setShowChatList(false);
                      }}
                      className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedChat === doctor.id ? 'bg-muted/70' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                              {doctor.avatar}
                            </AvatarFallback>
                          </Avatar>
                          {doctor.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold truncate">{doctor.doctorName}</h3>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{doctor.specialty}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Last appointment: {new Date(doctor.lastAppointment).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className={`${selectedChat && !showChatList ? 'flex' : 'hidden'} lg:flex flex-col flex-1`}>
            {selectedChat && selectedDoctor ? (
              <>
                {/* Messages Area */}
                <ScrollArea className="flex-1 p-4 bg-muted/20">
                  <div className="space-y-4 max-w-4xl mx-auto">
                    {/* Empty state for new conversations */}
                    <div className="text-center py-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                        <MessageSquare className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">Start a conversation</h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        Send a message to Dr. {selectedDoctor.doctorName}
                      </p>
                      <Badge variant="outline">
                        Chat feature coming soon - Currently in development
                      </Badge>
                    </div>

                    {/* Placeholder for future messages */}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t border-border bg-white/80 backdrop-blur-sm">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendMessage();
                    }}
                    className="flex items-center space-x-2 max-w-4xl mx-auto"
                  >
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1"
                      disabled // TODO: Enable when chat is fully implemented
                    />
                    <MedicalButton 
                      type="submit" 
                      variant="medical"
                      disabled={!message.trim()} // TODO: Enable when chat is fully implemented
                    >
                      <Send className="h-4 w-4" />
                    </MedicalButton>
                  </form>
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    Chat messaging will be available soon
                  </p>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-muted/10">
                <div className="text-center p-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                    <MessageSquare className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">
                    Choose a doctor from the list to start chatting
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNavigation userRole="patient" />
    </div>
  );
};

export default PatientDoctorChat;
