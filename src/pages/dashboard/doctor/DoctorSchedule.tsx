import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  Video, 
  User, 
  Plus,
  Check,
  X,
  Phone,
  MapPin
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Badge } from "@/components/ui/badge";
import BottomNavigation from "@/components/navigation/BottomNavigation";

interface Appointment {
  id: string;
  patient: string;
  time: string;
  date: string;
  type: "video" | "in-person" | "phone";
  status: "scheduled" | "completed" | "cancelled" | "no-show";
  condition: string;
  duration: number;
  notes?: string;
}

const DoctorSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const appointments: Appointment[] = [
    {
      id: "1",
      patient: "Alice Johnson",
      time: "09:00",
      date: "2024-01-20",
      type: "video",
      status: "scheduled",
      condition: "Hypertension Follow-up",
      duration: 30
    },
    {
      id: "2", 
      patient: "Robert Davis",
      time: "09:30",
      date: "2024-01-20",
      type: "in-person",
      status: "scheduled",
      condition: "Diabetes Check-up",
      duration: 45,
      notes: "Bring recent lab reports"
    },
    {
      id: "3",
      patient: "Sarah Wilson", 
      time: "10:30",
      date: "2024-01-20",
      type: "video",
      status: "completed",
      condition: "Anxiety Consultation",
      duration: 30
    },
    {
      id: "4",
      patient: "Michael Brown",
      time: "11:15",
      date: "2024-01-20",
      type: "in-person",
      status: "scheduled",
      condition: "Cardiac Assessment",
      duration: 60,
      notes: "Emergency consultation"
    },
    {
      id: "5",
      patient: "Emma Davis",
      time: "14:00",
      date: "2024-01-20",
      type: "phone",
      status: "scheduled", 
      condition: "Prescription Renewal",
      duration: 15
    }
  ];

  const todaysAppointments = appointments.filter(apt => apt.date === selectedDate);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "bg-blue-500";
      case "completed": return "bg-green-500";
      case "cancelled": return "bg-red-500";
      case "no-show": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return <Video className="h-4 w-4" />;
      case "phone": return <Phone className="h-4 w-4" />;
      case "in-person": return <MapPin className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "scheduled": return "default";
      case "completed": return "secondary";
      case "cancelled": return "destructive";
      case "no-show": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="gradient-text">Schedule & Appointments</span>
            </h1>
            <p className="text-muted-foreground">Manage your daily schedule and appointments</p>
          </div>
          <MedicalButton variant="medical">
            <Plus className="mr-2 h-4 w-4" />
            Add Appointment
          </MedicalButton>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar Section */}
          <div className="lg:col-span-1">
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  Calendar
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-2 rounded-lg bg-muted/50 border border-border"
                />
                
                {/* Quick Stats */}
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Appointments</span>
                    <Badge variant="outline">{todaysAppointments.length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Completed</span>
                    <Badge variant="secondary">
                      {todaysAppointments.filter(apt => apt.status === "completed").length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Remaining</span>
                    <Badge variant="default">
                      {todaysAppointments.filter(apt => apt.status === "scheduled").length}
                    </Badge>
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Availability Status */}
            <MedicalCard variant="glass" className="mt-4">
              <MedicalCardHeader>
                <MedicalCardTitle>Today's Status</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Available</span>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Next break: 12:00 PM - 1:00 PM
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>

          {/* Appointments List */}
          <div className="lg:col-span-3">
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle>
                  Appointments for {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  {todaysAppointments.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No appointments today</h3>
                      <p className="text-muted-foreground">You have a free day!</p>
                    </div>
                  ) : (
                    todaysAppointments.map((appointment) => (
                      <div 
                        key={appointment.id} 
                        className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex flex-col items-center">
                            <span className="text-lg font-bold text-primary">{appointment.time}</span>
                            <span className="text-xs text-muted-foreground">{appointment.duration}min</span>
                          </div>
                          
                          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-primary" />
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-semibold">{appointment.patient}</h3>
                            <p className="text-sm text-muted-foreground">{appointment.condition}</p>
                            {appointment.notes && (
                              <p className="text-xs text-yellow-600 mt-1">📝 {appointment.notes}</p>
                            )}
                            <div className="flex items-center space-x-2 mt-2">
                              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                {getTypeIcon(appointment.type)}
                                <span>{appointment.type.replace("-", " ")}</span>
                              </div>
                              <Badge variant={getStatusBadgeVariant(appointment.status)} className="text-xs">
                                {appointment.status.replace("-", " ")}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          {appointment.status === "scheduled" && (
                            <>
                              <MedicalButton variant="outline" size="sm">
                                <Check className="h-3 w-3" />
                              </MedicalButton>
                              <MedicalButton variant="medical" size="sm">
                                {appointment.type === "video" ? (
                                  <Video className="mr-1 h-3 w-3" />
                                ) : appointment.type === "phone" ? (
                                  <Phone className="mr-1 h-3 w-3" />
                                ) : (
                                  <Clock className="mr-1 h-3 w-3" />
                                )}
                                Start
                              </MedicalButton>
                              <MedicalButton variant="outline" size="sm">
                                <X className="h-3 w-3" />
                              </MedicalButton>
                            </>
                          )}
                          {appointment.status === "completed" && (
                            <MedicalButton variant="outline" size="sm">
                              View Notes
                            </MedicalButton>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>
        </div>
      </div>

      <BottomNavigation userRole="doctor" />
    </div>
  );
};

export default DoctorSchedule;