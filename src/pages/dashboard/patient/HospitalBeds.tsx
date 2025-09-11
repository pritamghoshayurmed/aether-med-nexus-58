import { useState } from "react";
import { 
  Bed, 
  MapPin, 
  Phone, 
  Clock, 
  Search, 
  Filter,
  Star,
  Navigation,
  Ambulance,
  Users
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const HospitalBeds = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("all");

  const hospitals = [
    {
      id: 1,
      name: "Apollo Hospital",
      distance: "2.1 km",
      rating: 4.8,
      reviews: 234,
      totalBeds: 150,
      availableBeds: 15,
      departments: [
        { name: "General Ward", available: 8, total: 50 },
        { name: "ICU", available: 2, total: 20 },
        { name: "Emergency", available: 5, total: 30 },
        { name: "Private Rooms", available: 0, total: 50 }
      ],
      contact: "+91 98765 43210",
      address: "Sector 26, Delhi",
      emergency: true
    },
    {
      id: 2,
      name: "Max Healthcare",
      distance: "1.8 km",
      rating: 4.9,
      reviews: 189,
      totalBeds: 200,
      availableBeds: 28,
      departments: [
        { name: "General Ward", available: 12, total: 80 },
        { name: "ICU", available: 4, total: 25 },
        { name: "Emergency", available: 8, total: 35 },
        { name: "Private Rooms", available: 4, total: 60 }
      ],
      contact: "+91 98765 43211",
      address: "Saket, Delhi",
      emergency: true
    },
    {
      id: 3,
      name: "Fortis Hospital",
      distance: "3.2 km",
      rating: 4.7,
      reviews: 156,
      totalBeds: 120,
      availableBeds: 5,
      departments: [
        { name: "General Ward", available: 2, total: 40 },
        { name: "ICU", available: 1, total: 15 },
        { name: "Emergency", available: 2, total: 25 },
        { name: "Private Rooms", available: 0, total: 40 }
      ],
      contact: "+91 98765 43212",
      address: "Vasant Kunj, Delhi",
      emergency: true
    }
  ];

  const getAvailabilityStatus = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage > 20) return "high";
    if (percentage > 10) return "medium";
    return "low";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "high": return "text-success";
      case "medium": return "text-warning";
      case "low": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4 md:p-6 pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text">Hospital Bed Availability</span>
          </h1>
          <p className="text-muted-foreground">Find available beds in nearby hospitals</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search hospitals by name or area..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedArea} onValueChange={setSelectedArea}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Areas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Areas</SelectItem>
              <SelectItem value="sector26">Sector 26</SelectItem>
              <SelectItem value="saket">Saket</SelectItem>
              <SelectItem value="vasantkunj">Vasant Kunj</SelectItem>
            </SelectContent>
          </Select>
          <MedicalButton variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </MedicalButton>
        </div>

        {/* Emergency Banner */}
        <MedicalCard variant="glass" className="mb-6 border-destructive/20">
          <MedicalCardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-destructive/20 rounded-full">
                  <Ambulance className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <h3 className="font-semibold text-destructive">Emergency Services</h3>
                  <p className="text-sm text-muted-foreground">24/7 emergency bed allocation available</p>
                </div>
              </div>
              <MedicalButton variant="destructive">
                <Phone className="mr-2 h-4 w-4" />
                Call 102
              </MedicalButton>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* Hospital List */}
        <div className="space-y-6">
          {hospitals.map((hospital) => (
            <MedicalCard key={hospital.id} variant="glass">
              <MedicalCardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <MedicalCardTitle className="flex items-center">
                      {hospital.name}
                      {hospital.emergency && (
                        <Badge variant="destructive" className="ml-2 text-xs">
                          24/7 Emergency
                        </Badge>
                      )}
                    </MedicalCardTitle>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{hospital.address} • {hospital.distance}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span>{hospital.rating}</span>
                        <span>({hospital.reviews})</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{hospital.availableBeds}</div>
                    <div className="text-sm text-muted-foreground">Available Beds</div>
                    <div className="text-xs text-muted-foreground">of {hospital.totalBeds} total</div>
                  </div>
                </div>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  {hospital.departments.map((dept) => {
                    const status = getAvailabilityStatus(dept.available, dept.total);
                    return (
                      <div key={dept.name} className="p-3 rounded-lg bg-muted/30">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">{dept.name}</h4>
                          <Bed className={`h-4 w-4 ${getStatusColor(status)}`} />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className={`text-lg font-bold ${getStatusColor(status)}`}>
                            {dept.available}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            of {dept.total}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 mt-2">
                          <div 
                            className={`h-2 rounded-full ${
                              status === "high" ? "bg-success" : 
                              status === "medium" ? "bg-warning" : "bg-destructive"
                            }`}
                            style={{ width: `${(dept.available / dept.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Last updated: 5 mins ago</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>Current occupancy: {Math.round((hospital.totalBeds - hospital.availableBeds) / hospital.totalBeds * 100)}%</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MedicalButton variant="outline" size="sm">
                      <Phone className="mr-1 h-4 w-4" />
                      Call Hospital
                    </MedicalButton>
                    <MedicalButton variant="outline" size="sm">
                      <Navigation className="mr-1 h-4 w-4" />
                      Get Directions
                    </MedicalButton>
                    <MedicalButton variant="medical" size="sm">
                      <Bed className="mr-1 h-4 w-4" />
                      Reserve Bed
                    </MedicalButton>
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          ))}
        </div>
      </div>

      <BottomNavigation userRole="patient" />
    </div>
  );
};

export default HospitalBeds;