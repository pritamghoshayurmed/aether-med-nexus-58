import { useState } from "react";
import { 
  Phone, 
  MapPin, 
  Ambulance, 
  Heart, 
  Brain, 
  Flame,
  Shield,
  Clock,
  Navigation,
  User,
  AlertTriangle,
  Activity,
  Stethoscope
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const EmergencyServices = () => {
  const [emergencyType, setEmergencyType] = useState<string | null>(null);

  const emergencyContacts = [
    {
      service: "Ambulance",
      number: "102",
      icon: Ambulance,
      color: "text-red-500",
      description: "Medical emergencies and patient transport"
    },
    {
      service: "Fire Department",
      number: "101",
      icon: Flame,
      color: "text-orange-500",
      description: "Fire emergencies and rescue operations"
    },
    {
      service: "Police",
      number: "100",
      icon: Shield,
      color: "text-blue-500",
      description: "Security and law enforcement"
    },
    {
      service: "Emergency Helpline",
      number: "112",
      icon: Phone,
      color: "text-green-500",
      description: "All emergency services"
    }
  ];

  const emergencyTypes = [
    {
      id: "cardiac",
      title: "Cardiac Emergency",
      icon: Heart,
      symptoms: ["Chest pain", "Shortness of breath", "Irregular heartbeat", "Dizziness"],
      priority: "critical"
    },
    {
      id: "stroke",
      title: "Stroke/Neurological",
      icon: Brain,
      symptoms: ["Sudden weakness", "Speech difficulty", "Vision problems", "Severe headache"],
      priority: "critical"
    },
    {
      id: "trauma",
      title: "Trauma/Injury",
      icon: AlertTriangle,
      symptoms: ["Severe bleeding", "Broken bones", "Head injury", "Burns"],
      priority: "high"
    },
    {
      id: "breathing",
      title: "Breathing Problems",
      icon: Activity,
      symptoms: ["Difficulty breathing", "Choking", "Severe asthma", "Allergic reaction"],
      priority: "high"
    }
  ];

  const nearbyHospitals = [
    {
      id: 1,
      name: "City General Hospital",
      distance: "2.1 km",
      eta: "8 mins",
      emergencyLevel: "Level 1 Trauma Center",
      available: true,
      contact: "+91 11 2234 5678"
    },
    {
      id: 2,
      name: "Apollo Emergency Center",
      distance: "3.5 km",
      eta: "12 mins",
      emergencyLevel: "24/7 Emergency",
      available: true,
      contact: "+91 11 2234 5679"
    },
    {
      id: 3,
      name: "Max Healthcare ER",
      distance: "4.2 km",
      eta: "15 mins",
      emergencyLevel: "Specialty Emergency",
      available: false,
      contact: "+91 11 2234 5680"
    }
  ];

  const myEmergencyContacts = [
    {
      name: "Dr. Sarah Johnson",
      relation: "Primary Doctor",
      number: "+91 98765 43210",
      specialty: "Cardiology",
      avatar: "SJ"
    },
    {
      name: "John Smith",
      relation: "Emergency Contact",
      number: "+91 98765 43211",
      specialty: "Family",
      avatar: "JS"
    },
    {
      name: "Insurance Provider",
      relation: "Health Insurance",
      number: "+91 1800 123 456",
      specialty: "Claims & Support",
      avatar: "IP"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-500/10 border-red-500/20 text-red-600";
      case "high": return "bg-orange-500/10 border-orange-500/20 text-orange-600";
      default: return "bg-yellow-500/10 border-yellow-500/20 text-yellow-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4 md:p-6 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 text-red-600">
            Emergency Services
          </h1>
          <p className="text-muted-foreground">Quick access to emergency help and medical assistance</p>
        </div>

        {/* Emergency Alert Banner */}
        <MedicalCard variant="glass" className="mb-6 border-red-500/20 bg-red-500/5">
          <MedicalCardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-500/20 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <h3 className="font-bold text-red-600 text-lg">Emergency Situation?</h3>
                  <p className="text-sm text-muted-foreground">Call emergency services immediately for life-threatening situations</p>
                </div>
              </div>
              <MedicalButton variant="destructive" size="lg">
                <Phone className="mr-2 h-5 w-5" />
                Call 102
              </MedicalButton>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Emergency Contacts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Emergency Numbers */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="text-red-600">Emergency Numbers</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {emergencyContacts.map((contact) => (
                    <div key={contact.service} className="p-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-muted/50">
                            <contact.icon className={`h-5 w-5 ${contact.color}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold">{contact.service}</h3>
                            <p className="text-xs text-muted-foreground">{contact.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">{contact.number}</div>
                        </div>
                      </div>
                      <MedicalButton variant="destructive" className="w-full" size="sm">
                        <Phone className="mr-2 h-4 w-4" />
                        Call {contact.number}
                      </MedicalButton>
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Emergency Types */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle>What type of emergency?</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {emergencyTypes.map((type) => (
                    <div 
                      key={type.id} 
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        emergencyType === type.id 
                          ? "border-red-500/50 bg-red-500/10" 
                          : "border-border/50 hover:bg-muted/30"
                      } ${getPriorityColor(type.priority)}`}
                      onClick={() => setEmergencyType(type.id)}
                    >
                      <div className="flex items-start space-x-3 mb-3">
                        <div className="p-2 rounded-lg bg-red-500/10">
                          <type.icon className="h-5 w-5 text-red-500" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{type.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {type.priority.toUpperCase()} PRIORITY
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground mb-2">Common symptoms:</p>
                        {type.symptoms.map((symptom, index) => (
                          <p key={index} className="text-xs">• {symptom}</p>
                        ))}
                      </div>
                      {emergencyType === type.id && (
                        <MedicalButton variant="destructive" className="w-full mt-3" size="sm">
                          <Ambulance className="mr-2 h-4 w-4" />
                          Request Emergency Help
                        </MedicalButton>
                      )}
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Nearby Hospitals */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-primary" />
                  Nearest Emergency Centers
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  {nearbyHospitals.map((hospital) => (
                    <div key={hospital.id} className="p-4 rounded-lg border border-border/50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold">{hospital.name}</h3>
                            <Badge 
                              variant={hospital.available ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {hospital.available ? "Available" : "Busy"}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{hospital.emergencyLevel}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Navigation className="h-4 w-4" />
                              <span>{hospital.distance}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>ETA: {hospital.eta}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <MedicalButton variant="outline" size="sm" className="flex-1">
                          <Phone className="mr-1 h-4 w-4" />
                          Call
                        </MedicalButton>
                        <MedicalButton variant="outline" size="sm" className="flex-1">
                          <Navigation className="mr-1 h-4 w-4" />
                          Directions
                        </MedicalButton>
                        <MedicalButton variant="destructive" size="sm" className="flex-1">
                          <Ambulance className="mr-1 h-4 w-4" />
                          Request Ambulance
                        </MedicalButton>
                      </div>
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>

          {/* Personal Emergency Contacts */}
          <div>
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-primary" />
                  My Emergency Contacts
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  {myEmergencyContacts.map((contact, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/30">
                      <div className="flex items-center space-x-3 mb-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-primary/20 text-primary font-medium">
                            {contact.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{contact.name}</h4>
                          <p className="text-xs text-muted-foreground">{contact.relation}</p>
                          <p className="text-xs text-muted-foreground">{contact.specialty}</p>
                        </div>
                      </div>
                      <MedicalButton variant="outline" size="sm" className="w-full">
                        <Phone className="mr-1 h-4 w-4" />
                        Call {contact.number}
                      </MedicalButton>
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Emergency Instructions */}
            <MedicalCard variant="glass" className="mt-6">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center text-warning">
                  <Stethoscope className="mr-2 h-5 w-5" />
                  Emergency Guidelines
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 rounded-lg bg-red-500/10">
                    <h4 className="font-medium text-red-600 mb-1">Life-threatening situations:</h4>
                    <p className="text-xs">Call 102 immediately for unconsciousness, severe bleeding, or difficulty breathing</p>
                  </div>
                  <div className="p-3 rounded-lg bg-orange-500/10">
                    <h4 className="font-medium text-orange-600 mb-1">Stay calm:</h4>
                    <p className="text-xs">Provide clear location and describe the emergency when calling for help</p>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/10">
                    <h4 className="font-medium text-primary mb-1">Medical information:</h4>
                    <p className="text-xs">Keep your medical ID and allergies information easily accessible</p>
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

export default EmergencyServices;