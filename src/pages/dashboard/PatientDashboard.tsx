import { useState, useEffect } from "react";
import { 
  Calendar, 
  Heart, 
  Brain, 
  Bell,
  Search,
  MapPin,
  Star,
  Clock,
  Activity,
  Pill,
  Bed,
  FileText,
  TestTube,
  Shield,
  Users,
  CreditCard,
  User
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import { useAuth } from "@/contexts/AuthContext";
import { useAppointments, useVitals, useNotifications } from "@/hooks/useDatabase";

const PatientDashboard = () => {
  const { user, profile } = useAuth();
  const { appointments, loading: appointmentsLoading } = useAppointments();
  const { vitals, loading: vitalsLoading } = useVitals();
  const { unreadCount } = useNotifications();
  const [activeTab, setActiveTab] = useState("overview");

  // Get latest vital signs
  const latestVitals = vitals.length > 0 ? vitals[0] : null;

  // Get upcoming appointments (future dates only)
  const upcomingAppointments = appointments
    .filter(apt => new Date(apt.appointment_date) >= new Date())
    .slice(0, 3);

  const vitalsData = [
    { 
      label: "Heart Rate", 
      value: latestVitals?.heart_rate ? `${latestVitals.heart_rate} bpm` : 'N/A', 
      status: "normal", 
      icon: Heart, 
      color: "text-success" 
    },
    { 
      label: "Blood Pressure", 
      value: latestVitals?.blood_pressure_systolic && latestVitals?.blood_pressure_diastolic 
        ? `${latestVitals.blood_pressure_systolic}/${latestVitals.blood_pressure_diastolic}` 
        : 'N/A', 
      status: "normal", 
      icon: Activity, 
      color: "text-success" 
    },
    { 
      label: "Oxygen Level", 
      value: latestVitals?.oxygen_saturation ? `${latestVitals.oxygen_saturation}%` : 'N/A', 
      status: "normal", 
      icon: Activity, 
      color: "text-success" 
    },
    { 
      label: "Temperature", 
      value: latestVitals?.temperature ? `${latestVitals.temperature}°F` : 'N/A', 
      status: "good", 
      icon: Brain, 
      color: "text-primary" 
    },
  ];

  const nearbyResources = [
    { name: "City General Hospital", type: "Hospital", distance: "2.1 km", beds: 15, status: "available" },
    { name: "MedPlus Pharmacy", type: "Pharmacy", distance: "0.8 km", medicines: "In Stock", status: "open" },
    { name: "Care Hospital", type: "Hospital", distance: "3.5 km", beds: 8, status: "limited" },
  ];

  return (
    <div className="min-h-screen bg-gradient-background p-3 sm:p-4 md:p-6 pb-20 sm:pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">
              Good morning, <span className="gradient-text">{profile?.full_name || 'Patient'}</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">Here's your health overview for today</p>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
            <MedicalButton 
              variant="ghost" 
              size="icon" 
              className="min-w-[44px] min-h-[44px] relative"
              onClick={() => window.location.href = '/dashboard/patient/notifications'}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </MedicalButton>
            <MedicalButton 
              variant="ghost" 
              size="icon" 
              className="min-w-[44px] min-h-[44px]"
              onClick={() => window.location.href = '/dashboard/patient/profile'}
            >
              <User className="h-5 w-5" />
            </MedicalButton>
            <MedicalButton 
              variant="medical" 
              className="flex-1 sm:flex-initial min-h-[44px]"
              onClick={() => window.location.href = '/appointment/booking'}
            >
              <Calendar className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Book Appointment</span>
              <span className="sm:hidden">Book</span>
            </MedicalButton>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {[
            { icon: Calendar, label: "Book Appointment", variant: "glass" as const, path: "/appointment/booking" },
            { icon: Brain, label: "AI Health Chat", variant: "glass" as const, path: "/dashboard/patient/ai-chat" },
            { icon: Activity, label: "Check Vitals", variant: "glass" as const, path: "/dashboard/patient/vitals" },
            { icon: FileText, label: "Medical Records", variant: "glass" as const, path: "/dashboard/patient/medical-records" },
            { icon: Pill, label: "Prescriptions", variant: "glass" as const, path: "/dashboard/patient/prescriptions" },
            { icon: TestTube, label: "Lab Results", variant: "glass" as const, path: "/dashboard/patient/lab-results" },
            { icon: Bed, label: "Hospital Beds", variant: "glass" as const, path: "/dashboard/patient/hospital-beds" },
            { icon: Shield, label: "Insurance", variant: "glass" as const, path: "/dashboard/patient/insurance" },
            { icon: Users, label: "Family Members", variant: "glass" as const, path: "/dashboard/patient/family-members" },
            { icon: CreditCard, label: "Billing", variant: "glass" as const, path: "/dashboard/patient/billing" },
          ].map((action, index) => (
            <MedicalButton
              key={action.label}
              variant={action.variant}
              className="min-h-[80px] sm:h-20 flex-col space-y-2 p-3 touch-manipulation"
              onClick={() => window.location.href = action.path}
            >
              <action.icon className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-xs sm:text-sm text-center leading-tight">{action.label}</span>
            </MedicalButton>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Upcoming Appointments */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <div className="flex items-center justify-between">
                  <MedicalCardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-primary" />
                    Upcoming Appointments
                  </MedicalCardTitle>
                  <MedicalButton 
                    size="sm" 
                    variant="medical"
                    onClick={() => window.location.href = '/appointment/booking'}
                  >
                    Book New
                  </MedicalButton>
                </div>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  {appointmentsLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                      <p className="text-muted-foreground">Loading appointments...</p>
                    </div>
                  ) : upcomingAppointments.length > 0 ? (
                    upcomingAppointments.map((appointment: any) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                            <span className="text-primary font-medium">
                              {appointment.doctors?.profiles?.full_name?.split(' ').map((n: string) => n[0]).join('') || 'DR'}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold">{appointment.doctors?.profiles?.full_name || 'Doctor'}</h3>
                            <p className="text-sm text-muted-foreground">{appointment.doctors?.specialty || 'Specialist'}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Clock className="h-3 w-3 text-primary" />
                              <span className="text-xs text-primary">
                                {new Date(appointment.appointment_date).toLocaleDateString()} at {appointment.appointment_time}
                              </span>
                              <Badge variant="outline" className="text-xs capitalize">
                                {appointment.appointment_type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="mb-2 capitalize">{appointment.status}</Badge>
                          {appointment.appointment_type === 'video' && (
                            <MedicalButton size="sm" variant="medical">
                              Join Call
                            </MedicalButton>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No upcoming appointments</h3>
                      <p className="text-gray-600 mb-4">Schedule your first appointment with a healthcare provider</p>
                      <MedicalButton 
                        variant="medical"
                        onClick={() => window.location.href = '/appointment/booking'}
                      >
                        Book Your First Appointment
                      </MedicalButton>
                    </div>
                  )}
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* AI Health Assistant */}
            <MedicalCard variant="glass" className="medical-glow">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-primary" />
                  AI Health Assistant
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  <div className="bg-primary/10 rounded-lg p-4">
                    <p className="text-sm mb-3">
                      <span className="font-medium">AI Suggestion:</span> Based on your recent vitals, 
                      consider scheduling a routine cardiology check-up within the next month.
                    </p>
                    <MedicalButton size="sm" variant="medical">
                      Schedule Check-up
                    </MedicalButton>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Describe your symptoms..."
                      className="pl-10"
                    />
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Vitals Monitoring */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-primary" />
                  Current Vitals
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                {vitalsLoading ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {vitalsData.map((vital) => (
                      <div key={vital.label} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <vital.icon className={`h-4 w-4 ${vital.color}`} />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{vital.label}</p>
                            <p className="text-xs text-muted-foreground">{vital.status}</p>
                          </div>
                        </div>
                        <span className="font-semibold text-primary">{vital.value}</span>
                      </div>
                    ))}
                    {latestVitals && (
                      <p className="text-xs text-muted-foreground text-center mt-2">
                        Last updated: {new Date(latestVitals.recorded_at).toLocaleString()}
                      </p>
                    )}
                  </div>
                )}
                <MedicalButton 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => window.location.href = '/dashboard/patient/vitals'}
                >
                  <Activity className="mr-2 h-4 w-4" />
                  {latestVitals ? 'Update Vitals' : 'Record Vitals'}
                </MedicalButton>
              </MedicalCardContent>
            </MedicalCard>

            {/* Nearby Resources */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-primary" />
                  Nearby Resources
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-3">
                  {nearbyResources.map((resource, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{resource.name}</h4>
                        <Badge 
                          variant={resource.status === "available" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {resource.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{resource.type}</span>
                        <span className="text-primary">{resource.distance}</span>
                      </div>
                      <div className="flex items-center mt-2 text-xs">
                        {resource.type === "Hospital" ? (
                          <>
                            <Bed className="h-3 w-3 mr-1 text-success" />
                            <span>{resource.beds} beds available</span>
                          </>
                        ) : (
                          <>
                            <Pill className="h-3 w-3 mr-1 text-success" />
                            <span>{resource.medicines}</span>
                          </>
                        )}
                      </div>
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

export default PatientDashboard;