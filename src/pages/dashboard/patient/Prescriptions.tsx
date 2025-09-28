import { useState } from "react";
import { 
  Pill, 
  Download, 
  Eye, 
  Search, 
  Filter,
  Calendar,
  User,
  Clock,
  AlertTriangle,
  RefreshCw,
  ShoppingCart,
  MapPin
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const Prescriptions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const prescriptions = [
    {
      id: 1,
      medication: "Lisinopril 10mg",
      doctor: "Dr. Sarah Johnson",
      prescribedDate: "2024-01-15",
      validUntil: "2024-04-15",
      dosage: "Once daily",
      quantity: "30 tablets",
      refillsRemaining: 2,
      status: "active",
      condition: "Hypertension",
      instructions: "Take with food, preferably in the morning"
    },
    {
      id: 2,
      medication: "Metformin 500mg",
      doctor: "Dr. Michael Chen",
      prescribedDate: "2024-01-10",
      validUntil: "2024-07-10",
      dosage: "Twice daily",
      quantity: "60 tablets",
      refillsRemaining: 5,
      status: "active",
      condition: "Type 2 Diabetes",
      instructions: "Take with meals to reduce stomach upset"
    },
    {
      id: 3,
      medication: "Amoxicillin 500mg",
      doctor: "Dr. Priya Sharma",
      prescribedDate: "2023-12-20",
      validUntil: "2023-12-27",
      dosage: "Three times daily",
      quantity: "21 capsules",
      refillsRemaining: 0,
      status: "expired",
      condition: "Bacterial Infection",
      instructions: "Complete the full course even if feeling better"
    },
    {
      id: 4,
      medication: "Atorvastatin 20mg",
      doctor: "Dr. Sarah Johnson",
      prescribedDate: "2024-01-08",
      validUntil: "2024-02-08",
      dosage: "Once daily",
      quantity: "30 tablets",
      refillsRemaining: 1,
      status: "expiring_soon",
      condition: "High Cholesterol",
      instructions: "Take in the evening with or without food"
    }
  ];

  const activeMedications = [
    {
      id: 1,
      name: "Lisinopril 10mg",
      nextDose: "Tomorrow, 8:00 AM",
      progress: 75,
      daysRemaining: 7
    },
    {
      id: 2,
      name: "Metformin 500mg",
      nextDose: "Today, 7:00 PM",
      progress: 45,
      daysRemaining: 15
    }
  ];

  const nearbyPharmacies = [
    {
      id: 1,
      name: "Apollo Pharmacy",
      distance: "0.5 km",
      rating: 4.8,
      availability: "In Stock",
      deliveryTime: "30 mins"
    },
    {
      id: 2,
      name: "MedPlus",
      distance: "1.2 km",
      rating: 4.6,
      availability: "Limited Stock",
      deliveryTime: "45 mins"
    },
    {
      id: 3,
      name: "Wellness Forever",
      distance: "2.0 km",
      rating: 4.7,
      availability: "In Stock",
      deliveryTime: "60 mins"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "expired": return "secondary";
      case "expiring_soon": return "destructive";
      default: return "outline";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Active";
      case "expired": return "Expired";
      case "expiring_soon": return "Expiring Soon";
      default: return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background p-3 sm:p-4 md:p-6 pb-20 sm:pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            <span className="gradient-text">My Prescriptions</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage your medications and prescriptions</p>
        </div>

        <Tabs defaultValue="prescriptions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="prescriptions" className="text-xs sm:text-sm">All Prescriptions</TabsTrigger>
            <TabsTrigger value="active" className="text-xs sm:text-sm">Active Medications</TabsTrigger>
            <TabsTrigger value="pharmacy" className="text-xs sm:text-sm">Find Pharmacy</TabsTrigger>
          </TabsList>

          <TabsContent value="prescriptions" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search prescriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="expiring_soon">Expiring Soon</SelectItem>
                </SelectContent>
              </Select>
              <MedicalButton variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </MedicalButton>
            </div>

            {/* Prescriptions List */}
            <div className="space-y-4">
              {prescriptions.map((prescription) => (
                <MedicalCard key={prescription.id} variant="glass">
                  <MedicalCardHeader className="pb-3 sm:pb-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                          <Pill className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <MedicalCardTitle className="text-base sm:text-lg mb-2 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                            <span className="truncate">{prescription.medication}</span>
                            <Badge 
                              variant={getStatusColor(prescription.status)} 
                              className="self-start text-xs"
                            >
                              {getStatusText(prescription.status)}
                            </Badge>
                          </MedicalCardTitle>
                          <p className="text-sm text-muted-foreground mb-2">
                            For: {prescription.condition}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                            <div>
                              <span className="text-muted-foreground">Dosage:</span>
                              <p className="font-medium">{prescription.dosage}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Quantity:</span>
                              <p className="font-medium">{prescription.quantity}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Refills:</span>
                              <p className="font-medium">{prescription.refillsRemaining} remaining</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Valid Until:</span>
                              <p className="font-medium">{new Date(prescription.validUntil).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </MedicalCardHeader>
                  <MedicalCardContent className="pt-0">
                    <div className="bg-muted/30 rounded-lg p-3 mb-3 sm:mb-4">
                      <p className="text-sm">
                        <span className="font-medium">Instructions:</span> {prescription.instructions}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{prescription.doctor}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Prescribed: {new Date(prescription.prescribedDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-2">
                        <MedicalButton variant="outline" size="sm" className="w-full sm:w-auto">
                          <Eye className="mr-1 h-4 w-4" />
                          View
                        </MedicalButton>
                        <MedicalButton variant="outline" size="sm" className="w-full sm:w-auto">
                          <Download className="mr-1 h-4 w-4" />
                          Download
                        </MedicalButton>
                        {prescription.status === "active" && prescription.refillsRemaining > 0 && (
                          <MedicalButton variant="medical" size="sm" className="w-full sm:w-auto">
                            <RefreshCw className="mr-1 h-4 w-4" />
                            Refill
                          </MedicalButton>
                        )}
                      </div>
                    </div>
                  </MedicalCardContent>
                </MedicalCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            {/* Active Medications Tracking */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeMedications.map((medication) => (
                <MedicalCard key={medication.id} variant="glass">
                  <MedicalCardHeader>
                    <MedicalCardTitle className="flex items-center">
                      <Pill className="mr-2 h-5 w-5 text-primary" />
                      {medication.name}
                    </MedicalCardTitle>
                  </MedicalCardHeader>
                  <MedicalCardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Supply Remaining</span>
                          <span className="text-sm font-medium">{medication.progress}%</span>
                        </div>
                        <Progress value={medication.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {medication.daysRemaining} days remaining
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <div>
                          <p className="text-sm text-muted-foreground">Next Dose</p>
                          <p className="font-medium">{medication.nextDose}</p>
                        </div>
                        <MedicalButton variant="medical" size="sm">
                          <Clock className="mr-1 h-4 w-4" />
                          Set Reminder
                        </MedicalButton>
                      </div>
                    </div>
                  </MedicalCardContent>
                </MedicalCard>
              ))}
            </div>

            {/* Medication Reminders */}
            <MedicalCard variant="glass" className="border-warning/20">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center text-warning">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Medication Reminders
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-warning/10">
                    <p className="text-sm font-medium">Atorvastatin prescription expires in 5 days</p>
                    <p className="text-xs text-muted-foreground">Contact your doctor for a refill</p>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/10">
                    <p className="text-sm font-medium">Time for your evening Metformin dose</p>
                    <p className="text-xs text-muted-foreground">Take with dinner</p>
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </TabsContent>

          <TabsContent value="pharmacy" className="space-y-6">
            {/* Pharmacy Search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search pharmacies near you..."
                  className="pl-10"
                />
              </div>
              <MedicalButton variant="medical" className="w-full sm:w-auto">
                <Search className="mr-2 h-4 w-4" />
                Find Nearby
              </MedicalButton>
            </div>

            {/* Nearby Pharmacies */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyPharmacies.map((pharmacy) => (
                <MedicalCard key={pharmacy.id} variant="glass">
                  <MedicalCardHeader>
                    <MedicalCardTitle>{pharmacy.name}</MedicalCardTitle>
                  </MedicalCardHeader>
                  <MedicalCardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Distance:</span>
                        <span className="font-medium">{pharmacy.distance}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Rating:</span>
                        <span className="font-medium">⭐ {pharmacy.rating}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Availability:</span>
                        <Badge 
                          variant={pharmacy.availability === "In Stock" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {pharmacy.availability}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Delivery:</span>
                        <span className="font-medium">{pharmacy.deliveryTime}</span>
                      </div>
                      <div className="flex space-x-2 pt-3">
                        <MedicalButton variant="outline" size="sm" className="flex-1">
                          Call
                        </MedicalButton>
                        <MedicalButton variant="medical" size="sm" className="flex-1">
                          <ShoppingCart className="mr-1 h-4 w-4" />
                          Order
                        </MedicalButton>
                      </div>
                    </div>
                  </MedicalCardContent>
                </MedicalCard>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation userRole="patient" />
    </div>
  );
};

export default Prescriptions;