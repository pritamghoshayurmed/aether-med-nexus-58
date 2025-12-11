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
  UserPlus,
  Globe,
  Mic,
  Camera,
  Volume2,
  Shield,
  CheckCircle,
  Timer,
  Wallet,
  Sparkles
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import { useAuth } from "@/contexts/AuthContext";

const DoctorDashboard = () => {
  const { user, profile } = useAuth();
  const [availabilityStatus, setAvailabilityStatus] = useState<"available" | "busy" | "offline">("available");

  const upcomingConsultations = [
    { id: 1, patient: "John Smith", time: "2:30 PM", type: "Video Call", condition: "Follow-up", tokenNumber: 3 },
    { id: 2, patient: "Mary Johnson", time: "3:15 PM", type: "In-Person", condition: "New Patient", tokenNumber: 4 },
    { id: 3, patient: "Robert Davis", time: "4:00 PM", type: "Video Call", condition: "Prescription", tokenNumber: 5 },
  ];

  const recentPatients = [
    { id: 1, name: "Alice Brown", lastVisit: "2 days ago", condition: "Hypertension", status: "stable", vitalsRecorded: true },
    { id: 2, name: "Tom Wilson", lastVisit: "1 week ago", condition: "Diabetes", status: "needs-attention", vitalsRecorded: true },
    { id: 3, name: "Sarah Lee", lastVisit: "3 days ago", condition: "Anxiety", status: "improving", vitalsRecorded: false },
  ];

  const revenueData = [
    { period: "Today", amount: "₹8,500", change: "+12%", consultations: 8 },
    { period: "This Week", amount: "₹45,200", change: "+8%", consultations: 42 },
    { period: "This Month", amount: "₹1,85,000", change: "+15%", consultations: 156 },
  ];

  // Mock data for available slots today
  const availableSlots = [
    { time: "2:00 PM", status: "available" },
    { time: "2:30 PM", status: "booked" },
    { time: "3:00 PM", status: "booked" },
    { time: "3:30 PM", status: "available" },
    { time: "4:00 PM", status: "booked" },
    { time: "4:30 PM", status: "available" },
  ];

  const bookedSlots = availableSlots.filter(s => s.status === "booked").length;
  const totalSlots = availableSlots.length;

  return (
    <div className="min-h-screen bg-gradient-background p-3 sm:p-4 pb-20 sm:pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">
              Welcome, <span className="gradient-text">Dr. {profile?.full_name || 'Doctor'}</span>
            </h1>
            <div className="flex items-center space-x-3">
              <p className="text-sm sm:text-base text-muted-foreground">Today's Schedule</p>
              <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                <Shield className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
            {/* Availability Status - FR-06 */}
            <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-muted/50 border border-border/50">
              <div className={`w-3 h-3 rounded-full ${availabilityStatus === "available" ? "bg-green-500 animate-pulse" :
                  availabilityStatus === "busy" ? "bg-yellow-500" : "bg-red-500"
                }`} />
              <span className="text-sm capitalize font-medium">{availabilityStatus}</span>
            </div>
            <MedicalButton variant="medical" size="sm">
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
                  <p className="text-xs text-muted-foreground mt-1">3 completed</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </MedicalCardContent>
          </MedicalCard>

          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Slot Utilization</p>
                  <p className="text-2xl font-bold text-primary">{Math.round((bookedSlots / totalSlots) * 100)}%</p>
                  <p className="text-xs text-muted-foreground mt-1">{bookedSlots}/{totalSlots} slots</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </MedicalCardContent>
          </MedicalCard>

          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Revenue</p>
                  <p className="text-2xl font-bold text-primary">₹8.5K</p>
                  <p className="text-xs text-success mt-1">+12% vs yesterday</p>
                </div>
                <Wallet className="h-8 w-8 text-primary" />
              </div>
            </MedicalCardContent>
          </MedicalCard>

          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Patient Rating</p>
                  <p className="text-2xl font-bold text-primary">4.9</p>
                  <p className="text-xs text-muted-foreground mt-1">Based on 156 reviews</p>
                </div>
                <Activity className="h-8 w-8 text-primary" />
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Schedule with Token Management - FR-06, FR-07 */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <div className="flex items-center justify-between">
                  <MedicalCardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-primary" />
                    Today's Schedule
                  </MedicalCardTitle>
                  <MedicalButton size="sm" variant="outline" onClick={() => window.location.href = '/dashboard/doctor/schedule'}>
                    Manage Slots
                  </MedicalButton>
                </div>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  {upcomingConsultations.map((consultation) => (
                    <div key={consultation.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted/70 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-1">
                            <Stethoscope className="h-6 w-6 text-primary" />
                          </div>
                          <Badge variant="outline" className="text-xs">
                            #{consultation.tokenNumber}
                          </Badge>
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
                      <div className="flex flex-col space-y-2">
                        <MedicalButton size="sm" variant="medical">
                          <Video className="mr-1 h-3 w-3" />
                          Start
                        </MedicalButton>
                        <MedicalButton size="sm" variant="outline">
                          <FileText className="mr-1 h-3 w-3" />
                          Notes
                        </MedicalButton>
                      </div>
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* AI Medical Assistant - FR-11, FR-12, FR-10 */}
            <MedicalCard variant="glass" className="medical-glow border-primary/20">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-primary" />
                  AI Medical Assistant
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* AI Scribe - FR-11 */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <Sparkles className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">AI Scribe</h4>
                        <Badge variant="outline" className="text-[10px] mt-1">Auto-Notes</Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Auto-generates clinical notes from consultation recordings
                    </p>
                    <MedicalButton size="sm" variant="medical" className="w-full">
                      <Mic className="h-3 w-3 mr-1" />
                      Start Recording
                    </MedicalButton>
                  </div>

                  {/* Bhasha Setu - FR-10 */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="p-2 rounded-lg bg-success/20">
                        <Globe className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">Bhasha Setu</h4>
                        <Badge variant="outline" className="text-[10px] mt-1">Translation</Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Real-time voice translation (&lt;3s latency)
                    </p>
                    <MedicalButton size="sm" variant="outline" className="w-full">
                      <Volume2 className="h-3 w-3 mr-1" />
                      Enable Translation
                    </MedicalButton>
                  </div>

                  {/* Remote Camera Control - FR-12 */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-warning/10 to-warning/5 border border-warning/20">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="p-2 rounded-lg bg-warning/20">
                        <Camera className="h-5 w-5 text-warning" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">Camera Control</h4>
                        <Badge variant="outline" className="text-[10px] mt-1">Remote</Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Control patient's camera (flashlight, zoom)
                    </p>
                    <MedicalButton size="sm" variant="outline" className="w-full">
                      <Zap className="h-3 w-3 mr-1" />
                      Request Control
                    </MedicalButton>
                  </div>

                  {/* Live Vitals Overlay - FR-14 */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-destructive/10 to-destructive/5 border border-destructive/20">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="p-2 rounded-lg bg-destructive/20">
                        <Activity className="h-5 w-5 text-destructive" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">Live Vitals</h4>
                        <Badge variant="outline" className="text-[10px] mt-1">Real-time</Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Real-time pulse graph overlay during video call
                    </p>
                    <MedicalButton size="sm" variant="outline" className="w-full">
                      <Activity className="h-3 w-3 mr-1" />
                      Trigger Live Check
                    </MedicalButton>
                  </div>
                </div>

                {/* Quick Access to AI Tools */}
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">More AI Tools</span>
                    <MedicalButton size="sm" variant="ghost" onClick={() => window.location.href = '/dashboard/doctor/analytics'}>
                      View All
                      <Zap className="ml-1 h-3 w-3" />
                    </MedicalButton>
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* One-Tap Rx Templates - FR-19 */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <div className="flex items-center justify-between">
                  <MedicalCardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-primary" />
                    Quick Prescription Templates
                  </MedicalCardTitle>
                  <MedicalButton size="sm" variant="outline" onClick={() => window.location.href = '/dashboard/doctor/prescription'}>
                    Create New
                  </MedicalButton>
                </div>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { name: "Viral Fever Kit", uses: 45 },
                    { name: "Common Cold", uses: 38 },
                    { name: "Hypertension", uses: 52 },
                    { name: "Diabetes Follow-up", uses: 41 },
                    { name: "Gastritis", uses: 29 },
                    { name: "Skin Allergy", uses: 22 },
                  ].map((template) => (
                    <div
                      key={template.name}
                      className="p-3 rounded-lg bg-muted/50 hover:bg-primary/10 border border-border/50 hover:border-primary/30 cursor-pointer transition-all group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Clipboard className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                        <Badge variant="outline" className="text-[10px]">{template.uses}</Badge>
                      </div>
                      <h4 className="text-sm font-medium line-clamp-2">{template.name}</h4>
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Patients with Vitals Status */}
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
                    <div key={patient.id} className="p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors cursor-pointer">
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
                      <p className="text-xs text-muted-foreground mb-2">{patient.condition}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-primary">{patient.lastVisit}</p>
                        {patient.vitalsRecorded && (
                          <div className="flex items-center space-x-1">
                            <Activity className="h-3 w-3 text-success" />
                            <span className="text-xs text-success">Vitals ✓</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <MedicalButton
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => window.location.href = '/dashboard/doctor/patients'}
                >
                  View All Patients
                </MedicalButton>
              </MedicalCardContent>
            </MedicalCard>

            {/* Revenue Tracking & Escrow - FR-17, FR-18 */}
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
                    <div key={data.period} className="p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-sm font-medium">{data.period}</p>
                          <p className="text-xs text-muted-foreground">{data.consultations} consultations</p>
                        </div>
                        <Badge variant="secondary" className="text-success">
                          {data.change}
                        </Badge>
                      </div>
                      <p className="text-xl font-bold text-primary">{data.amount}</p>
                    </div>
                  ))}
                </div>

                {/* Escrow System Indicator */}
                <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Escrow Protected</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Payments released after consultation completion
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">Pending Release:</span>
                    <span className="text-sm font-semibold text-primary">₹12,500</span>
                  </div>
                </div>

                <MedicalButton
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => window.location.href = '/dashboard/doctor/revenue'}
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  Detailed Analytics
                </MedicalButton>
              </MedicalCardContent>
            </MedicalCard>

            {/* Slot Management Quick View - FR-06 */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <Timer className="mr-2 h-5 w-5 text-primary" />
                  Today's Slots
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {availableSlots.map((slot, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg text-center text-xs font-medium transition-all ${slot.status === "booked"
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "bg-muted/50 text-muted-foreground border border-border/50"
                        }`}
                    >
                      {slot.time}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-muted-foreground">Utilization:</span>
                  <span className="font-semibold text-primary">{Math.round((bookedSlots / totalSlots) * 100)}%</span>
                </div>
                <MedicalButton
                  variant="medical"
                  className="w-full"
                  onClick={() => window.location.href = '/dashboard/doctor/schedule'}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Manage Availability
                </MedicalButton>
              </MedicalCardContent>
            </MedicalCard>

            {/* Medical Council Verification - FR-02 */}
            <MedicalCard variant="glass" className="border-success/30">
              <MedicalCardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-xl bg-success/20">
                    <Shield className="h-6 w-6 text-success" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-sm">Medical Council Verified</h4>
                      <CheckCircle className="h-4 w-4 text-success" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Your profile is verified and trusted by patients
                    </p>
                  </div>
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