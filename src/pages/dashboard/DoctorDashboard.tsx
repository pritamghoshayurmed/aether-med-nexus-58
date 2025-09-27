import { useState } from "react";
import { 
  Users, 
  Calendar, 
  Video, 
  Brain, 
  DollarSign,
  FileText,
  MessageSquare,
  Activity,
  Clock,
  TrendingUp,
  Stethoscope,
  Clipboard,
  Zap,
  UserPlus
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const DoctorDashboard = () => {
  const [availabilityStatus, setAvailabilityStatus] = useState<"available" | "busy" | "offline">("available");

  const upcomingConsultations = [
    { id: 1, patient: "John Smith", time: "2:30 PM", type: "Video Call", condition: "Follow-up" },
    { id: 2, patient: "Mary Johnson", time: "3:15 PM", type: "In-Person", condition: "New Patient" },
    { id: 3, patient: "Robert Davis", time: "4:00 PM", type: "Video Call", condition: "Prescription" },
  ];

  const recentPatients = [
    { id: 1, name: "Alice Brown", lastVisit: "2 days ago", condition: "Hypertension", status: "stable" },
    { id: 2, name: "Tom Wilson", lastVisit: "1 week ago", condition: "Diabetes", status: "needs-attention" },
    { id: 3, name: "Sarah Lee", lastVisit: "3 days ago", condition: "Anxiety", status: "improving" },
  ];

  const revenueData = [
    { period: "Today", amount: "₹8,500", change: "+12%" },
    { period: "This Week", amount: "₹45,200", change: "+8%" },
    { period: "This Month", amount: "₹1,85,000", change: "+15%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-background p-3 sm:p-4 pb-20 sm:pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">
              Welcome, <span className="gradient-text">Dr. Sarah Johnson</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">Cardiologist • Today's Schedule</p>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                availabilityStatus === "available" ? "bg-green-500" :
                availabilityStatus === "busy" ? "bg-yellow-500" : "bg-red-500"
              }`} />
              <span className="text-sm capitalize">{availabilityStatus}</span>
            </div>
            <MedicalButton variant="medical">
              <UserPlus className="mr-2 h-4 w-4" />
              Add Patient
            </MedicalButton>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Patients</p>
                  <p className="text-2xl font-bold text-primary">12</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </MedicalCardContent>
          </MedicalCard>
          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Consultations</p>
                  <p className="text-2xl font-bold text-primary">8</p>
                </div>
                <Video className="h-8 w-8 text-primary" />
              </div>
            </MedicalCardContent>
          </MedicalCard>
          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold text-primary">₹8.5K</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </MedicalCardContent>
          </MedicalCard>
          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <p className="text-2xl font-bold text-primary">4.9</p>
                </div>
                <Activity className="h-8 w-8 text-primary" />
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Consultations */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  Today's Schedule
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  {upcomingConsultations.map((consultation) => (
                    <div key={consultation.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                          <Stethoscope className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{consultation.patient}</h3>
                          <p className="text-sm text-muted-foreground">{consultation.condition}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Clock className="h-3 w-3 text-primary" />
                            <span className="text-xs text-primary">{consultation.time}</span>
                            <Badge variant="outline" className="text-xs">
                              {consultation.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <MedicalButton size="sm" variant="medical">
                        <Video className="mr-1 h-3 w-3" />
                        Start
                      </MedicalButton>
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* AI Tools */}
            <MedicalCard variant="glass" className="medical-glow">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-primary" />
                  AI Medical Assistant
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MedicalButton variant="glass" className="h-20 flex-col">
                    <Zap className="h-6 w-6 mb-2" />
                    <span className="text-sm">ECG Analysis</span>
                  </MedicalButton>
                  <MedicalButton variant="glass" className="h-20 flex-col">
                    <Brain className="h-6 w-6 mb-2" />
                    <span className="text-sm">X-Ray Analysis</span>
                  </MedicalButton>
                  <MedicalButton variant="glass" className="h-20 flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    <span className="text-sm">Smart Notes</span>
                  </MedicalButton>
                  <MedicalButton variant="glass" className="h-20 flex-col">
                    <Clipboard className="h-6 w-6 mb-2" />
                    <span className="text-sm">Digital Rx</span>
                  </MedicalButton>
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Group Chat */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                  Medical Board Chat
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm"><span className="font-medium">Dr. Michael Chen:</span> Complex cardiac case discussion in Room 3</p>
                    <p className="text-xs text-muted-foreground mt-1">5 minutes ago</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-sm"><span className="font-medium">Dr. Emily Rodriguez:</span> New treatment protocol shared in cardiology group</p>
                    <p className="text-xs text-muted-foreground mt-1">12 minutes ago</p>
                  </div>
                  <MedicalButton variant="outline" className="w-full">
                    View All Messages
                  </MedicalButton>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Patients */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Recent Patients
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-3">
                  {recentPatients.map((patient) => (
                    <div key={patient.id} className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{patient.name}</h4>
                        <Badge 
                          variant={patient.status === "stable" ? "default" : 
                                 patient.status === "improving" ? "secondary" : "destructive"}
                          className="text-xs"
                        >
                          {patient.status.replace('-', ' ')}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{patient.condition}</p>
                      <p className="text-xs text-primary">{patient.lastVisit}</p>
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Revenue Tracking */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                  Revenue Overview
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  {revenueData.map((data) => (
                    <div key={data.period} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{data.period}</p>
                        <p className="text-lg font-bold text-primary">{data.amount}</p>
                      </div>
                      <Badge variant="secondary" className="text-green-600">
                        {data.change}
                      </Badge>
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Availability Control */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle>Availability Status</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-3">
                  {["available", "busy", "offline"].map((status) => (
                    <MedicalButton
                      key={status}
                      variant={availabilityStatus === status ? "medical" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setAvailabilityStatus(status as typeof availabilityStatus)}
                    >
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        status === "available" ? "bg-green-500" :
                        status === "busy" ? "bg-yellow-500" : "bg-red-500"
                      }`} />
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </MedicalButton>
                  ))}
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

export default DoctorDashboard;