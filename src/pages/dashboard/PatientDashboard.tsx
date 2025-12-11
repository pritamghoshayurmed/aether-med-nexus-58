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
  User,
  RefreshCw,
  AlertCircle,
  Mic,
  Users,
  Wallet,
  Volume2,
  Video,
  Smartphone,
  Timer,
  CreditCard,
  ChevronRight
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import { useAuth } from "@/contexts/AuthContext";
import { useAppointments, useVitals, useNotifications } from "@/hooks/useDatabase";
import { useNearbyPlaces } from "@/hooks/useNearbyPlaces";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { parseDMS } from "@/utils/coordinateConverter";
import { FacilityDetailsModal } from "@/components/sections/FacilityDetailsModal";

const PatientDashboard = () => {
  const { user, profile } = useAuth();
  const { appointments, loading: appointmentsLoading } = useAppointments();
  const { vitals, loading: vitalsLoading } = useVitals();
  const { unreadCount } = useNotifications();
  const {
    nearbyPlaces,
    loading: placesLoading,
    error: placesError,
    permissionDenied,
    locationSource,
    location,
    refreshLocation,
    setManualLocation,
    searchByPinCode,
    getCurrentLocationInfo
  } = useNearbyPlaces();
  const [activeTab, setActiveTab] = useState("overview");
  const [showManualLocation, setShowManualLocation] = useState(false);
  const [manualLat, setManualLat] = useState("");
  const [manualLng, setManualLng] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [inputMode, setInputMode] = useState<'coords' | 'pin'>('pin');
  const [useDMS, setUseDMS] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<any>(null);
  const [showFacilityModal, setShowFacilityModal] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState("");

  // Get latest vital signs
  const latestVitals = vitals.length > 0 ? vitals[0] : null;

  // Get upcoming appointments (future dates only)
  const upcomingAppointments = appointments
    .filter(apt => new Date(apt.appointment_date) >= new Date())
    .slice(0, 3);

  // Mock token tracking data
  const tokenData = upcomingAppointments.length > 0 ? {
    tokenNumber: 5,
    currentToken: 3,
    estimatedWait: "~10 mins"
  } : null;

  // Mock wallet balance
  const walletBalance = "₹2,500";

  const vitalsData = [
    {
      label: "Heart Rate",
      value: latestVitals?.heart_rate ? `${latestVitals.heart_rate} bpm` : 'N/A',
      status: "normal",
      icon: Heart,
      color: "text-success"
    },
    {
      label: "Respiratory Rate",
      value: latestVitals?.respiratory_rate ? `${latestVitals.respiratory_rate} BrPM` : 'N/A',
      status: "normal",
      icon: Activity,
      color: "text-success"
    },
  ];

  // Voice search simulation
  const handleVoiceSearch = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setVoiceQuery("Chest pain specialist");
      setIsListening(false);
    }, 2000);
  };

  // Quick Actions with features from requirements
  const quickActions = [
    { icon: Mic, label: "Voice Search", variant: "medical" as const, path: "#voice", highlight: true },
    { icon: Calendar, label: "Book Appointment", variant: "glass" as const, path: "/appointment/booking" },
    { icon: Video, label: "Video Consult", variant: "glass" as const, path: "/dashboard/patient/video-call" },
    { icon: Activity, label: "PPG Vital Scan", variant: "glass" as const, path: "/dashboard/patient/vitals" },
    { icon: Users, label: "Family Vault", variant: "glass" as const, path: "/dashboard/patient/family-members" },
    { icon: FileText, label: "Prescriptions", variant: "glass" as const, path: "/dashboard/patient/prescriptions" },
  ];

  return (
    <div className="min-h-screen bg-gradient-background p-3 sm:p-4 md:p-6 pb-20 sm:pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header with Wallet */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">
              Namaste, <span className="gradient-text">{profile?.full_name || 'Patient'}</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">Your health companion is ready</p>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
            {/* Kabiraj Wallet */}
            <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-gradient-to-r from-primary/20 to-success/20 border border-primary/30">
              <Wallet className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">{walletBalance}</span>
            </div>
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
          </div>
        </div>

        {/* Voice-First Search Bar - FR-04 */}
        <MedicalCard variant="glass" className="mb-6 medical-glow">
          <MedicalCardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={voiceQuery || "Search doctors, symptoms, or say 'Chest pain'..."}
                  className="pl-10 pr-12 h-12 text-base"
                  value={voiceQuery}
                  onChange={(e) => setVoiceQuery(e.target.value)}
                />
                <MedicalButton
                  variant={isListening ? "medical" : "ghost"}
                  size="icon"
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${isListening ? 'animate-pulse' : ''}`}
                  onClick={handleVoiceSearch}
                >
                  <Mic className={`h-5 w-5 ${isListening ? 'text-white' : ''}`} />
                </MedicalButton>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-3">
              <Badge variant="outline" className="text-xs">Hindi</Badge>
              <Badge variant="outline" className="text-xs">Bengali</Badge>
              <Badge variant="outline" className="text-xs">+ 10 languages</Badge>
              <span className="text-xs text-muted-foreground ml-auto">Powered by AI</span>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* Quick Actions - Feature-focused */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {quickActions.map((action, index) => (
            <MedicalButton
              key={action.label}
              variant={action.variant}
              className={`min-h-[80px] sm:h-20 flex-col space-y-2 p-3 touch-manipulation ${action.highlight ? 'bg-gradient-to-br from-primary to-primary-glow text-white hover:from-primary/90 hover:to-primary-glow/90' : ''}`}
              onClick={() => {
                if (action.path === '#voice') {
                  handleVoiceSearch();
                } else {
                  window.location.href = action.path;
                }
              }}
            >
              <action.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${action.highlight ? 'text-white' : ''}`} />
              <span className={`text-xs sm:text-sm text-center leading-tight ${action.highlight ? 'text-white' : ''}`}>{action.label}</span>
            </MedicalButton>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Live Token Tracking - FR-07 */}
            {tokenData && (
              <MedicalCard variant="glass" className="border-primary/30 bg-gradient-to-r from-primary/5 to-transparent">
                <MedicalCardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">#{tokenData.tokenNumber}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Your Token</h3>
                        <p className="text-sm text-muted-foreground">
                          Current: #{tokenData.currentToken} • Wait: {tokenData.estimatedWait}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Timer className="h-5 w-5 text-primary animate-pulse" />
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
                        Live
                      </Badge>
                    </div>
                  </div>
                </MedicalCardContent>
              </MedicalCard>
            )}

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
                      <div key={appointment.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted/70 transition-colors">
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
                              <Video className="h-3 w-3 mr-1" />
                              Join
                            </MedicalButton>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No upcoming appointments</h3>
                      <p className="text-muted-foreground mb-4">Use voice search to find a doctor</p>
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

            {/* AI Health Assistant with Audio Rx - FR-20 */}
            <MedicalCard variant="glass" className="medical-glow">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-primary" />
                  AI Health Assistant
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-primary/10 to-success/10 rounded-xl p-4 border border-primary/20">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-primary/20">
                        <Brain className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm mb-3">
                          <span className="font-medium">AI Suggestion:</span> Based on your recent vitals,
                          consider scheduling a routine cardiology check-up within the next month.
                        </p>
                        <MedicalButton size="sm" variant="medical">
                          Schedule Check-up
                        </MedicalButton>
                      </div>
                    </div>
                  </div>

                  {/* Audio Prescription Feature */}
                  <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Volume2 className="h-5 w-5 text-primary" />
                        <span className="font-medium">Audio Prescriptions</span>
                      </div>
                      <Badge variant="outline" className="text-xs">New</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Listen to your prescriptions in your preferred language
                    </p>
                    <div className="flex items-center space-x-2">
                      <MedicalButton size="sm" variant="outline">
                        <Volume2 className="h-3 w-3 mr-1" />
                        Play in Hindi
                      </MedicalButton>
                      <MedicalButton size="sm" variant="outline">
                        <Volume2 className="h-3 w-3 mr-1" />
                        Play in Bengali
                      </MedicalButton>
                    </div>
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Offline Health Records - FR-21 */}
            <MedicalCard variant="glass">
              <MedicalCardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-success/20">
                      <Smartphone className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <h4 className="font-medium">Offline Health Records</h4>
                      <p className="text-sm text-muted-foreground">Last 10 prescriptions cached</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                      ✓ Synced
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* PPG Vitals Monitoring - FR-13 */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-primary" />
                  PPG Vital Scan
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
                  variant="medical"
                  className="w-full mt-4"
                  onClick={() => window.location.href = '/dashboard/patient/vitals/measure'}
                >
                  <Activity className="mr-2 h-4 w-4" />
                  Start PPG Scan
                </MedicalButton>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  Uses camera + flashlight for heart rate measurement
                </p>
              </MedicalCardContent>
            </MedicalCard>

            {/* Family Vault - FR-03 */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <div className="flex items-center justify-between">
                  <MedicalCardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-primary" />
                    Family Vault
                  </MedicalCardTitle>
                  <Badge variant="outline" className="text-xs">3/6</Badge>
                </div>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-3">
                  {['Self', 'Spouse', 'Child'].map((member, idx) => (
                    <div key={member} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium">{member}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
                <MedicalButton
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => window.location.href = '/dashboard/patient/family-members'}
                >
                  Manage Family Profiles
                </MedicalButton>
              </MedicalCardContent>
            </MedicalCard>

            {/* Payment Methods - FR-16 */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-primary" />
                  Payment Options
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-2">
                      <Wallet className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">Kabiraj Wallet</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">{walletBalance}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">GPay</Badge>
                    <Badge variant="outline" className="text-xs">PhonePe</Badge>
                    <Badge variant="outline" className="text-xs">UPI</Badge>
                    <Badge variant="outline" className="text-xs">Cards</Badge>
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Nearby Resources */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <MedicalCardTitle className="flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-primary" />
                      Nearby Resources
                    </MedicalCardTitle>
                    {location && locationSource && (
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {locationSource === 'gps' && '📍 GPS'}
                          {locationSource === 'ip' && '🌐 IP Location'}
                          {locationSource === 'manual' && '📌 Manual'}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <MedicalButton
                    size="sm"
                    variant="ghost"
                    onClick={refreshLocation}
                    disabled={placesLoading}
                    className="min-w-[32px] min-h-[32px] p-1"
                  >
                    <RefreshCw className={`h-4 w-4 ${placesLoading ? 'animate-spin' : ''}`} />
                  </MedicalButton>
                </div>
              </MedicalCardHeader>
              <MedicalCardContent>
                {placesError && (
                  <Alert variant="destructive" className="mb-3">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      {placesError}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-3">
                  {placesLoading ? (
                    <div className="text-center py-6">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                      <p className="text-xs text-muted-foreground">Finding nearby facilities...</p>
                    </div>
                  ) : nearbyPlaces.length > 0 ? (
                    nearbyPlaces.slice(0, 3).map((place, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-all cursor-pointer"
                        onClick={() => {
                          setSelectedFacility(place);
                          setShowFacilityModal(true);
                        }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm line-clamp-1">{place.name}</h4>
                          <Badge variant="outline" className="text-xs ml-2">
                            {place.distance}
                          </Badge>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="line-clamp-1">{place.type}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No nearby facilities found</p>
                    </div>
                  )}
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>
        </div>
      </div>

      <BottomNavigation userRole="patient" />

      {/* Facility Details Modal */}
      {selectedFacility && (
        <FacilityDetailsModal
          facility={selectedFacility}
          userLocation={location}
          isOpen={showFacilityModal}
          onClose={() => {
            setShowFacilityModal(false);
            setSelectedFacility(null);
          }}
        />
      )}
    </div>
  );
};

export default PatientDashboard;