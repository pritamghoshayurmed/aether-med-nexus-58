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
  AlertCircle
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
      label: "Respiratory Rate",
      value: latestVitals?.respiratory_rate ? `${latestVitals.respiratory_rate} BrPM` : 'N/A',
      status: "normal",
      icon: Activity,
      color: "text-success"
    },
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
            { icon: Bed, label: "Hospital Beds", variant: "glass" as const, path: "/dashboard/patient/hospital-beds" },
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
                        {location.accuracy && location.accuracy > 0 && (
                          <span className="text-xs text-muted-foreground">
                            ±{location.accuracy > 1000 ? `${(location.accuracy / 1000).toFixed(1)}km` : `${location.accuracy.toFixed(0)}m`}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <MedicalButton
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowManualLocation(!showManualLocation)}
                      className="min-w-[32px] min-h-[32px] p-1"
                      title="Set location manually"
                    >
                      <MapPin className="h-4 w-4" />
                    </MedicalButton>
                    <MedicalButton
                      size="sm"
                      variant="ghost"
                      onClick={refreshLocation}
                      disabled={placesLoading}
                      className="min-w-[32px] min-h-[32px] p-1"
                      title="Refresh location"
                    >
                      <RefreshCw className={`h-4 w-4 ${placesLoading ? 'animate-spin' : ''}`} />
                    </MedicalButton>
                  </div>
                </div>
              </MedicalCardHeader>
              <MedicalCardContent>
                {showManualLocation && (
                  <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-medium">
                        Set Your Location
                      </p>
                      <div className="flex space-x-1">
                        <MedicalButton
                          size="sm"
                          variant={inputMode === 'pin' ? 'secondary' : 'ghost'}
                          onClick={() => setInputMode('pin')}
                          className="text-xs h-6 px-2"
                        >
                          📮 PIN Code
                        </MedicalButton>
                        <MedicalButton
                          size="sm"
                          variant={inputMode === 'coords' ? 'secondary' : 'ghost'}
                          onClick={() => setInputMode('coords')}
                          className="text-xs h-6 px-2"
                        >
                          📍 Coords
                        </MedicalButton>
                      </div>
                    </div>

                    {inputMode === 'pin' ? (
                      <div className="mb-3">
                        <p className="text-xs text-muted-foreground mb-2">
                          Enter your 6-digit PIN Code
                        </p>
                        <div className="flex space-x-2">
                          <Input
                            placeholder="e.g. 700001"
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value)}
                            className="text-xs h-8"
                            maxLength={6}
                          />
                          <MedicalButton
                            size="sm"
                            variant="medical"
                            onClick={async () => {
                              if (pinCode.length !== 6) {
                                alert('Please enter a valid 6-digit PIN code');
                                return;
                              }
                              await searchByPinCode(pinCode);
                              setShowManualLocation(false);
                              setPinCode("");
                            }}
                            className="text-xs h-8"
                            disabled={placesLoading}
                          >
                            {placesLoading ? '...' : 'Search'}
                          </MedicalButton>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-end mb-2">
                          <MedicalButton
                            size="sm"
                            variant="ghost"
                            onClick={() => setUseDMS(!useDMS)}
                            className="text-xs h-6 px-2"
                          >
                            {useDMS ? '🔢 Use Decimal' : '🧭 Use DMS'}
                          </MedicalButton>
                        </div>

                        {useDMS ? (
                          <>
                            <p className="text-xs text-muted-foreground mb-2">
                              Enter in DMS format (e.g., 22°46'54.2"N)
                            </p>
                            <div className="flex space-x-2 mb-2">
                              <Input
                                placeholder="22°46'54.2&quot;N"
                                value={manualLat}
                                onChange={(e) => setManualLat(e.target.value)}
                                className="text-xs h-8"
                              />
                              <Input
                                placeholder="87°51'48.4&quot;E"
                                value={manualLng}
                                onChange={(e) => setManualLng(e.target.value)}
                                className="text-xs h-8"
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <p className="text-xs text-muted-foreground mb-2">
                              Enter decimal coordinates (e.g., 22.781717, 87.863430)
                            </p>
                            <div className="flex space-x-2 mb-2">
                              <Input
                                placeholder="Latitude (22.781717)"
                                value={manualLat}
                                onChange={(e) => setManualLat(e.target.value)}
                                className="text-xs h-8"
                              />
                              <Input
                                placeholder="Longitude (87.863430)"
                                value={manualLng}
                                onChange={(e) => setManualLng(e.target.value)}
                                className="text-xs h-8"
                              />
                            </div>
                          </>
                        )}

                        <div className="flex flex-wrap gap-2">
                          <MedicalButton
                            size="sm"
                            variant="outline"
                            onClick={async () => {
                              let lat: number, lng: number;

                              if (useDMS) {
                                // Parse DMS format
                                const parsedLat = parseDMS(manualLat);
                                const parsedLng = parseDMS(manualLng);

                                if (parsedLat === null || parsedLng === null) {
                                  alert('Invalid DMS format. Example: 22°46\'54.2"N');
                                  return;
                                }
                                lat = parsedLat;
                                lng = parsedLng;
                              } else {
                                // Parse decimal format
                                lat = parseFloat(manualLat);
                                lng = parseFloat(manualLng);

                                if (isNaN(lat) || isNaN(lng)) {
                                  alert('Please enter valid decimal coordinates');
                                  return;
                                }
                              }

                              await setManualLocation(lat, lng);
                              setShowManualLocation(false);
                              setManualLat("");
                              setManualLng("");
                            }}
                            className="text-xs h-7"
                          >
                            Set Location
                          </MedicalButton>
                          <MedicalButton
                            size="sm"
                            variant="outline"
                            onClick={async () => {
                              await setManualLocation(22.781717, 87.863430); // Your precise location
                              setShowManualLocation(false);
                              setManualLat("");
                              setManualLng("");
                            }}
                            className="text-xs h-7"
                          >
                            📍 Use My Area
                          </MedicalButton>
                        </div>
                      </>
                    )}

                    <div className="flex justify-end mt-2">
                      <MedicalButton
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setShowManualLocation(false);
                          setManualLat("");
                          setManualLng("");
                          setPinCode("");
                        }}
                        className="text-xs h-7"
                      >
                        Cancel
                      </MedicalButton>
                    </div>

                    {getCurrentLocationInfo() && (
                      <div className="mt-2 p-2 bg-muted/30 rounded text-xs">
                        <p className="font-medium mb-1">Current Location:</p>
                        <p className="text-muted-foreground">
                          📍 {getCurrentLocationInfo()?.coordinates.latitude.toFixed(6)}°N, {getCurrentLocationInfo()?.coordinates.longitude.toFixed(6)}°E
                        </p>
                        <p className="text-muted-foreground mt-1">
                          📏 {getCurrentLocationInfo()?.distanceFromArambagh} from Arambagh
                        </p>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      💡 Tip: You can convert DMS (22°46'54.2"N) to decimal using Google
                    </p>
                  </div>
                )}
                {placesError && (
                  <Alert variant="destructive" className="mb-3">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      {placesError}
                      {permissionDenied && (
                        <span className="block mt-2">
                          Please enable location permissions in your browser settings.
                        </span>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                {nearbyPlaces.length > 0 && !placesLoading && (
                  <div className="mb-3 p-2 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      💡 Click on any facility to view details, contact info, and get directions
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  {placesLoading ? (
                    <div className="text-center py-6">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                      <p className="text-xs text-muted-foreground">Finding nearby facilities...</p>
                    </div>
                  ) : nearbyPlaces.length > 0 ? (
                    nearbyPlaces.map((place, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-all cursor-pointer border-2 border-transparent hover:border-primary/50"
                        onClick={() => {
                          setSelectedFacility(place);
                          setShowFacilityModal(true);
                        }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm line-clamp-1" title={place.name}>
                            {place.name}
                          </h4>
                          <Badge
                            variant={
                              place.status === "available" || place.status === "open"
                                ? "default"
                                : "secondary"
                            }
                            className="text-xs ml-2 shrink-0"
                          >
                            {place.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">{place.type}</span>
                          <span className="text-primary font-medium">{place.distance}</span>
                        </div>
                        {place.address && (
                          <div className="flex items-start mt-2 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1 mt-0.5 shrink-0" />
                            <span className="line-clamp-1" title={place.address}>{place.address}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          {place.type === "Hospital" ? (
                            <div className="flex items-center text-xs">
                              <Activity className="h-3 w-3 mr-1 text-success" />
                              <span className="text-muted-foreground">Healthcare Facility</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-xs">
                              <Pill className="h-3 w-3 mr-1 text-success" />
                              <span className="text-muted-foreground">Medicines Available</span>
                            </div>
                          )}
                          <span className="text-xs text-primary font-medium">
                            Tap for details →
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <MapPin className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-3">
                        No nearby facilities found
                      </p>
                      <MedicalButton
                        size="sm"
                        variant="outline"
                        onClick={refreshLocation}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh Location
                      </MedicalButton>
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