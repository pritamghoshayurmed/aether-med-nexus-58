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
import { useAppointments } from "@/hooks/useDatabase";

const PatientAppointments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const { appointments, loading } = useAppointments();

  // Separate past and upcoming appointments
  const now = new Date();
  const upcomingAppointments = appointments.filter(apt => 
    new Date(apt.appointment_date) >= new Date(now.toDateString())
  );
  const pastAppointments = appointments.filter(apt => 
    new Date(apt.appointment_date) < new Date(now.toDateString())
  );

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
          {/* Appointments List */}
          <div className="lg:col-span-2">
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle>Your Appointments</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading appointments...</p>
                  </div>
                ) : appointments.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments yet</h3>
                    <p className="text-gray-600 mb-4">Book your first appointment with a healthcare provider</p>
                    <MedicalButton 
                      variant="medical"
                      onClick={() => window.location.href = '/appointment/booking'}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Appointment
                    </MedicalButton>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appointment: any) => (
                      <div key={appointment.id} className="p-4 rounded-lg bg-muted/30 border border-border/50">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-4">
                            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                              <span className="text-primary font-bold text-lg">
                                {appointment.doctors?.profiles?.full_name?.split(' ').map((n: string) => n[0]).join('') || 'DR'}
                              </span>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-lg">{appointment.doctors?.profiles?.full_name || 'Doctor'}</h3>
                              <p className="text-primary font-medium">{appointment.doctors?.specialty || 'Specialist'}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  {new Date(appointment.appointment_date).toLocaleDateString()} at {appointment.appointment_time}
                                </span>
                              </div>
                              {appointment.reason && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  Reason: {appointment.reason}
                                </p>
                              )}
                            </div>
                          </div>
                          <Badge 
                            variant={
                              appointment.status === 'scheduled' ? 'default' : 
                              appointment.status === 'completed' ? 'secondary' : 
                              appointment.status === 'cancelled' ? 'destructive' : 'outline'
                            }
                            className="text-xs capitalize"
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                          <Badge variant="outline" className="text-xs capitalize">
                            {appointment.appointment_type}
                          </Badge>
                          <div className="flex items-center space-x-2">
                            {appointment.appointment_type === 'video' && appointment.status === 'scheduled' && (
                              <MedicalButton variant="medical" size="sm">
                                <Video className="mr-1 h-4 w-4" />
                                Join Call
                              </MedicalButton>
                            )}
                            {appointment.status === 'scheduled' && (
                              <MedicalButton variant="outline" size="sm">
                                <MessageSquare className="h-4 w-4" />
                              </MedicalButton>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </MedicalCardContent>
            </MedicalCard>
          </div>

          {/* Summary Sidebar */}
          <div>
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  Quick Actions
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-3">
                  <MedicalButton 
                    variant="medical" 
                    className="w-full"
                    onClick={() => window.location.href = '/appointment/booking'}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Book New Appointment
                  </MedicalButton>
                  
                  <div className="p-4 rounded-lg bg-muted/30 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Appointments</span>
                      <span className="font-semibold">{appointments.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Upcoming</span>
                      <span className="font-semibold text-primary">{upcomingAppointments.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Completed</span>
                      <span className="font-semibold text-success">{pastAppointments.filter((a: any) => a.status === 'completed').length}</span>
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

export default PatientAppointments;