import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  Video, 
  Star, 
  Search, 
  Filter,
  MapPin,
  Phone,
  MessageSquare
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const PatientAppointments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      rating: 4.9,
      reviews: 234,
      experience: "15+ years",
      fee: "₹800",
      avatar: "SJ",
      nextSlot: "Today 2:30 PM",
      hospital: "Apollo Hospital",
      distance: "2.1 km"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "General Medicine", 
      rating: 4.8,
      reviews: 189,
      experience: "12+ years",
      fee: "₹600",
      avatar: "MC",
      nextSlot: "Tomorrow 10:00 AM",
      hospital: "Max Healthcare",
      distance: "1.8 km"
    },
    {
      id: 3,
      name: "Dr. Priya Sharma",
      specialty: "Dermatologist",
      rating: 4.7,
      reviews: 156,
      experience: "10+ years", 
      fee: "₹750",
      avatar: "PS",
      nextSlot: "Today 4:00 PM",
      hospital: "Fortis Hospital",
      distance: "3.2 km"
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist", 
      date: "Today, 2:30 PM",
      type: "Video Call",
      status: "confirmed",
      rating: null
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "General Medicine",
      date: "Tomorrow, 10:00 AM", 
      type: "In-Person",
      status: "confirmed",
      rating: null
    },
    {
      id: 3,
      doctor: "Dr. Priya Sharma",
      specialty: "Dermatologist",
      date: "Dec 12, 3:00 PM",
      type: "Video Call", 
      status: "completed",
      rating: 4.5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-background p-4 md:p-6 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text">Appointments</span>
          </h1>
          <p className="text-muted-foreground">Book appointments & manage consultations</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search doctors by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Specialties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="general">General Medicine</SelectItem>
              <SelectItem value="dermatology">Dermatology</SelectItem>
            </SelectContent>
          </Select>
          <MedicalButton variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </MedicalButton>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Doctor Search Results */}
          <div className="lg:col-span-2">
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle>Available Doctors</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  {doctors.map((doctor) => (
                    <div key={doctor.id} className="p-4 rounded-lg bg-muted/30 border border-border/50">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                            <span className="text-primary font-bold text-lg">{doctor.avatar}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg">{doctor.name}</h3>
                            <p className="text-primary font-medium">{doctor.specialty}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span>{doctor.rating}</span>
                                <span>({doctor.reviews})</span>
                              </div>
                              <span>{doctor.experience}</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{doctor.hospital} • {doctor.distance}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-primary">{doctor.fee}</div>
                          <div className="text-sm text-muted-foreground">Consultation</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">Next: {doctor.nextSlot}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MedicalButton variant="outline" size="sm">
                            <Phone className="mr-1 h-4 w-4" />
                            Call
                          </MedicalButton>
                          <MedicalButton variant="medical" size="sm">
                            <Video className="mr-1 h-4 w-4" />
                            Book Slot
                          </MedicalButton>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>

          {/* Upcoming Appointments */}
          <div>
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  My Appointments
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-3">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-3 rounded-lg bg-muted/30">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm">{appointment.doctor}</h4>
                        <Badge 
                          variant={appointment.status === "confirmed" ? "default" : appointment.status === "completed" ? "secondary" : "outline"}
                          className="text-xs"
                        >
                          {appointment.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{appointment.specialty}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-primary">{appointment.date}</span>
                        <Badge variant="outline" className="text-xs">
                          {appointment.type}
                        </Badge>
                      </div>
                      
                      {appointment.status === "completed" ? (
                        <div className="mt-3 pt-2 border-t border-border/30">
                          {appointment.rating ? (
                            <div className="flex items-center space-x-1">
                              <span className="text-xs">Rated:</span>
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${i < appointment.rating! ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`} 
                                />
                              ))}
                            </div>
                          ) : (
                            <MedicalButton variant="outline" size="sm" className="w-full">
                              Rate Doctor
                            </MedicalButton>
                          )}
                        </div>
                      ) : (
                        <div className="mt-3 pt-2 border-t border-border/30 flex space-x-2">
                          <MedicalButton variant="outline" size="sm" className="flex-1">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Chat
                          </MedicalButton>
                          <MedicalButton variant="medical" size="sm" className="flex-1">
                            <Video className="h-3 w-3 mr-1" />
                            Join
                          </MedicalButton>
                        </div>
                      )}
                    </div>
                  ))}
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

export default PatientAppointments;