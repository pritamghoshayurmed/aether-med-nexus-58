import { useState } from "react";
import { 
  Building2, 
  Bed, 
  Pill, 
  Users, 
  Calendar,
  TrendingUp,
  Package,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Settings,
  Truck,
  BarChart3,
  UserCheck
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const HospitalDashboard = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const hospitalStats = [
    { label: "Total Beds", value: "150", available: "23", icon: Bed, status: "good" },
    { label: "ICU Beds", value: "25", available: "3", icon: Activity, status: "critical" },
    { label: "Staff on Duty", value: "89", available: "12", icon: Users, status: "good" },
    { label: "Medicine Stock", value: "850", available: "45", icon: Pill, status: "warning" },
  ];

  const appointments = [
    { id: 1, patient: "John Doe", doctor: "Dr. Smith", time: "10:30 AM", department: "Cardiology", status: "confirmed" },
    { id: 2, patient: "Jane Smith", doctor: "Dr. Johnson", time: "11:15 AM", department: "Neurology", status: "pending" },
    { id: 3, patient: "Mike Davis", doctor: "Dr. Brown", time: "2:00 PM", department: "Orthopedics", status: "confirmed" },
  ];

  const medicineRequests = [
    { id: 1, medicine: "Paracetamol 500mg", quantity: "500 units", supplier: "MedSupply Co", status: "pending", urgency: "high" },
    { id: 2, medicine: "Amoxicillin 250mg", quantity: "200 units", supplier: "PharmaDistrib", status: "shipped", urgency: "medium" },
    { id: 3, medicine: "Insulin Cartridges", quantity: "100 units", supplier: "DiabetesCare", status: "delivered", urgency: "high" },
  ];

  const departments = [
    { name: "Cardiology", patients: 15, capacity: 25, occupancy: 60 },
    { name: "Neurology", patients: 8, capacity: 15, occupancy: 53 },
    { name: "Orthopedics", patients: 12, capacity: 20, occupancy: 60 },
    { name: "Pediatrics", patients: 18, capacity: 30, occupancy: 60 },
  ];

  return (
    <div className="min-h-screen bg-gradient-background p-4 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="gradient-text">City General Hospital</span>
            </h1>
            <p className="text-muted-foreground">Resource Management & Operations Dashboard</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <MedicalButton variant="ghost" className="relative">
              <AlertTriangle className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs">3</Badge>
            </MedicalButton>
            <MedicalButton variant="medical">
              <Settings className="mr-2 h-4 w-4" />
              Update Resources
            </MedicalButton>
          </div>
        </div>

        {/* Resource Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {hospitalStats.map((stat) => (
            <MedicalCard key={stat.label} variant="glass">
              <MedicalCardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`h-8 w-8 ${
                    stat.status === "good" ? "text-green-500" :
                    stat.status === "warning" ? "text-yellow-500" : "text-red-500"
                  }`} />
                  <div className={`w-3 h-3 rounded-full ${
                    stat.status === "good" ? "bg-green-500" :
                    stat.status === "warning" ? "bg-yellow-500" : "bg-red-500"
                  }`} />
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <div className="flex items-baseline space-x-2">
                  <p className="text-2xl font-bold text-primary">{stat.available}</p>
                  <p className="text-sm text-muted-foreground">/ {stat.value}</p>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bed Management */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <Bed className="mr-2 h-5 w-5 text-primary" />
                  Department Occupancy
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  {departments.map((dept) => (
                    <div key={dept.name} className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{dept.name}</h3>
                        <Badge variant={dept.occupancy > 80 ? "destructive" : dept.occupancy > 60 ? "secondary" : "default"}>
                          {dept.occupancy}% Full
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{dept.patients} patients</span>
                        <span>{dept.capacity - dept.patients} beds available</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className={`h-2 rounded-full ${
                            dept.occupancy > 80 ? "bg-red-500" : 
                            dept.occupancy > 60 ? "bg-yellow-500" : "bg-green-500"
                          }`}
                          style={{ width: `${dept.occupancy}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Appointment Management */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-primary" />
                  Today's Appointments
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                          <UserCheck className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{appointment.patient}</h3>
                          <p className="text-sm text-muted-foreground">{appointment.doctor} • {appointment.department}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Clock className="h-3 w-3 text-primary" />
                            <span className="text-xs text-primary">{appointment.time}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                        {appointment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Supply Chain Management */}
            <MedicalCard variant="glass" className="medical-glow">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <Truck className="mr-2 h-5 w-5 text-primary" />
                  Medicine Supply Requests
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  {medicineRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                          <Package className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{request.medicine}</h3>
                          <p className="text-sm text-muted-foreground">{request.supplier}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-primary">{request.quantity}</span>
                            <Badge variant={request.urgency === "high" ? "destructive" : "secondary"} className="text-xs">
                              {request.urgency} priority
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Badge variant={
                        request.status === "delivered" ? "default" :
                        request.status === "shipped" ? "secondary" : "outline"
                      }>
                        {request.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <MedicalButton variant="medical" className="w-full mt-4">
                  <Package className="mr-2 h-4 w-4" />
                  New Supply Request
                </MedicalButton>
              </MedicalCardContent>
            </MedicalCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle>Quick Actions</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-3">
                  <MedicalButton variant="medical" className="w-full justify-start">
                    <Bed className="mr-2 h-4 w-4" />
                    Update Bed Status
                  </MedicalButton>
                  <MedicalButton variant="outline" className="w-full justify-start">
                    <Pill className="mr-2 h-4 w-4" />
                    Stock Management
                  </MedicalButton>
                  <MedicalButton variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Staff Schedule
                  </MedicalButton>
                  <MedicalButton variant="outline" className="w-full justify-start">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Generate Report
                  </MedicalButton>
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Real-time Alerts */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-primary" />
                  Active Alerts
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                    <p className="text-sm font-medium text-red-800">ICU Capacity Critical</p>
                    <p className="text-xs text-red-600">Only 3 beds remaining</p>
                  </div>
                  <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                    <p className="text-sm font-medium text-yellow-800">Low Medicine Stock</p>
                    <p className="text-xs text-yellow-600">Paracetamol running low</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="text-sm font-medium text-blue-800">Staff Update</p>
                    <p className="text-xs text-blue-600">New shift assignments</p>
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* Performance Metrics */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                  Performance Metrics
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Patient Satisfaction</span>
                    <span className="text-primary font-bold">94%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bed Turnover Rate</span>
                    <span className="text-primary font-bold">2.3/day</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Stay</span>
                    <span className="text-primary font-bold">3.2 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Revenue Today</span>
                    <span className="text-primary font-bold">₹2.4L</span>
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>
        </div>
      </div>

      <BottomNavigation userRole="hospital" />
    </div>
  );
};

export default HospitalDashboard;