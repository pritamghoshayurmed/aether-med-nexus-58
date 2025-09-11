import { useState } from "react";
import { 
  Search, 
  Plus, 
  Filter, 
  User, 
  Calendar, 
  Activity, 
  AlertTriangle,
  Eye,
  Edit,
  Phone
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import BottomNavigation from "@/components/navigation/BottomNavigation";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  condition: string;
  status: "stable" | "critical" | "improving" | "needs-attention";
  lastVisit: string;
  nextAppointment?: string;
  phone: string;
  email: string;
  bloodGroup: string;
  allergies: string[];
}

const PatientManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const patients: Patient[] = [
    {
      id: "1",
      name: "Alice Johnson",
      age: 45,
      gender: "Female",
      condition: "Hypertension",
      status: "stable",
      lastVisit: "2024-01-15",
      nextAppointment: "2024-02-15",
      phone: "+91 9876543210",
      email: "alice@email.com",
      bloodGroup: "O+",
      allergies: ["Penicillin"]
    },
    {
      id: "2", 
      name: "Robert Davis",
      age: 62,
      gender: "Male",
      condition: "Diabetes Type 2",
      status: "needs-attention",
      lastVisit: "2024-01-10",
      nextAppointment: "2024-01-25",
      phone: "+91 9876543211",
      email: "robert@email.com",
      bloodGroup: "A+",
      allergies: ["Aspirin", "Shellfish"]
    },
    {
      id: "3",
      name: "Sarah Wilson",
      age: 34,
      gender: "Female", 
      condition: "Anxiety Disorder",
      status: "improving",
      lastVisit: "2024-01-12",
      phone: "+91 9876543212",
      email: "sarah@email.com",
      bloodGroup: "B-",
      allergies: []
    },
    {
      id: "4",
      name: "Michael Brown",
      age: 28,
      gender: "Male",
      condition: "Cardiac Arrhythmia",
      status: "critical",
      lastVisit: "2024-01-18",
      nextAppointment: "2024-01-22",
      phone: "+91 9876543213", 
      email: "michael@email.com",
      bloodGroup: "AB+",
      allergies: ["Latex"]
    }
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.condition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || patient.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "stable": return "bg-green-500";
      case "improving": return "bg-blue-500";
      case "needs-attention": return "bg-yellow-500";
      case "critical": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "stable": return "default";
      case "improving": return "secondary";
      case "needs-attention": return "outline";
      case "critical": return "destructive";
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
              <span className="gradient-text">Patient Management</span>
            </h1>
            <p className="text-muted-foreground">Manage your patients and their medical records</p>
          </div>
          <MedicalButton variant="medical">
            <Plus className="mr-2 h-4 w-4" />
            Add New Patient
          </MedicalButton>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients by name or condition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {["all", "stable", "improving", "needs-attention", "critical"].map((filter) => (
              <MedicalButton
                key={filter}
                variant={selectedFilter === filter ? "medical" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
              >
                <Filter className="mr-1 h-3 w-3" />
                {filter.replace("-", " ").replace(/^\w/, c => c.toUpperCase())}
              </MedicalButton>
            ))}
          </div>
        </div>

        {/* Patients Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <MedicalCard key={patient.id} variant="glass">
              <MedicalCardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <MedicalCardTitle className="text-lg">{patient.name}</MedicalCardTitle>
                      <p className="text-sm text-muted-foreground">
                        {patient.age} years • {patient.gender}
                      </p>
                    </div>
                  </div>
                  <Badge variant={getStatusBadgeVariant(patient.status)} className="text-xs">
                    {patient.status.replace("-", " ")}
                  </Badge>
                </div>
              </MedicalCardHeader>
              <MedicalCardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Condition:</span>
                    <span className="text-sm font-medium">{patient.condition}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Blood Group:</span>
                    <span className="text-sm font-medium">{patient.bloodGroup}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Last Visit:</span>
                    <span className="text-sm">{new Date(patient.lastVisit).toLocaleDateString()}</span>
                  </div>
                  {patient.nextAppointment && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Next Appointment:</span>
                      <span className="text-sm text-primary font-medium">
                        {new Date(patient.nextAppointment).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                {patient.allergies.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span className="text-xs text-yellow-600">
                      Allergies: {patient.allergies.join(", ")}
                    </span>
                  </div>
                )}

                <div className="flex space-x-2">
                  <MedicalButton variant="outline" size="sm" className="flex-1">
                    <Eye className="mr-1 h-3 w-3" />
                    View
                  </MedicalButton>
                  <MedicalButton variant="outline" size="sm" className="flex-1">
                    <Edit className="mr-1 h-3 w-3" />
                    Edit
                  </MedicalButton>
                  <MedicalButton variant="medical" size="sm" className="flex-1">
                    <Phone className="mr-1 h-3 w-3" />
                    Call
                  </MedicalButton>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No patients found</h3>
            <p className="text-muted-foreground">
              {searchQuery ? "Try adjusting your search criteria" : "Start by adding your first patient"}
            </p>
          </div>
        )}
      </div>

      <BottomNavigation userRole="doctor" />
    </div>
  );
};

export default PatientManagement;