import { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Activity,
  Calendar,
  DollarSign,
  Pill,
  Building2
} from "lucide-react";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { MedicalButton } from "@/components/ui/medical-button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SystemAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  const kpiMetrics = [
    { label: "Daily Active Users", value: "15,847", change: "+12%", icon: Users, trend: "up" },
    { label: "Total Appointments", value: "8,923", change: "+18%", icon: Calendar, trend: "up" },
    { label: "Revenue Today", value: "₹12.4L", change: "+8%", icon: DollarSign, trend: "up" },
    { label: "Medicine Orders", value: "2,341", change: "+15%", icon: Pill, trend: "up" },
  ];

  const appointmentTypes = [
    { type: "General Consultation", count: 4234, percentage: 47 },
    { type: "Specialist Visit", count: 2891, percentage: 32 },
    { type: "Follow-up", count: 1456, percentage: 16 },
    { type: "Emergency", count: 342, percentage: 4 },
  ];

  const usageHeatmap = [
    { hour: "6 AM", usage: 15 },
    { hour: "8 AM", usage: 45 },
    { hour: "10 AM", usage: 78 },
    { hour: "12 PM", usage: 92 },
    { hour: "2 PM", usage: 85 },
    { hour: "4 PM", usage: 67 },
    { hour: "6 PM", usage: 54 },
    { hour: "8 PM", usage: 32 },
    { hour: "10 PM", usage: 18 },
  ];

  const medicineUsage = [
    { name: "Paracetamol", prescribed: 1245, trend: "+8%" },
    { name: "Amoxicillin", prescribed: 892, trend: "+12%" },
    { name: "Omeprazole", prescribed: 743, trend: "-3%" },
    { name: "Metformin", prescribed: 654, trend: "+15%" },
    { name: "Aspirin", prescribed: 432, trend: "+5%" },
  ];

  const hospitalPerformance = [
    { name: "City General Hospital", patients: 2341, revenue: "₹4.2L", rating: 4.8 },
    { name: "Metro Medical Center", patients: 1987, revenue: "₹3.8L", rating: 4.6 },
    { name: "Care Plus Hospital", patients: 1654, revenue: "₹3.1L", rating: 4.7 },
    { name: "Health First Clinic", patients: 1432, revenue: "₹2.9L", rating: 4.5 },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            System <span className="gradient-text">Analytics</span>
          </h1>
          <p className="text-muted-foreground">Comprehensive platform metrics and insights</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          <MedicalButton variant="medical">
            <BarChart3 className="mr-2 h-4 w-4" />
            Export Report
          </MedicalButton>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpiMetrics.map((metric) => (
          <MedicalCard key={metric.label} variant="glass">
            <MedicalCardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className="h-8 w-8 text-primary" />
                <Badge variant={metric.trend === "up" ? "default" : "secondary"} className="text-xs">
                  {metric.change}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className="text-2xl font-bold text-primary">{metric.value}</p>
            </MedicalCardContent>
          </MedicalCard>
        ))}
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="appointments" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="usage">Usage Patterns</TabsTrigger>
          <TabsTrigger value="medicine">Medicine Trends</TabsTrigger>
          <TabsTrigger value="hospitals">Hospital Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle>Appointments by Type</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  {appointmentTypes.map((type) => (
                    <div key={type.type} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{type.type}</p>
                        <p className="text-sm text-muted-foreground">{type.count} appointments</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">{type.percentage}%</p>
                        <div className="w-20 h-2 bg-muted rounded-full">
                          <div 
                            className="h-full bg-primary rounded-full" 
                            style={{ width: `${type.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>

            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle>Revenue Breakdown</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">Today's Revenue</p>
                    <p className="text-2xl font-bold text-primary">₹12.4L</p>
                    <p className="text-xs text-green-600">+8.2% from yesterday</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">Weekly Revenue</p>
                    <p className="text-2xl font-bold text-primary">₹68.2L</p>
                    <p className="text-xs text-green-600">+12.5% from last week</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-primary">₹2.8Cr</p>
                    <p className="text-xs text-green-600">+18.3% from last month</p>
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <MedicalCard variant="glass">
            <MedicalCardHeader>
              <MedicalCardTitle>Platform Usage Heatmap</MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {usageHeatmap.map((data) => (
                  <div key={data.hour} className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">{data.hour}</p>
                    <div className="h-16 bg-muted/50 rounded-lg relative flex items-end justify-center p-2">
                      <div 
                        className="bg-primary rounded w-full opacity-80"
                        style={{ height: `${data.usage}%` }}
                      />
                      <span className="absolute text-xs font-medium text-white">{data.usage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </TabsContent>

        <TabsContent value="medicine" className="space-y-4">
          <MedicalCard variant="glass">
            <MedicalCardHeader>
              <MedicalCardTitle>Top Prescribed Medicines</MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="space-y-4">
                {medicineUsage.map((medicine, index) => (
                  <div key={medicine.name} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{medicine.name}</p>
                        <p className="text-sm text-muted-foreground">{medicine.prescribed} prescriptions</p>
                      </div>
                    </div>
                    <Badge variant={medicine.trend.startsWith('+') ? "default" : "secondary"}>
                      {medicine.trend}
                    </Badge>
                  </div>
                ))}
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </TabsContent>

        <TabsContent value="hospitals" className="space-y-4">
          <MedicalCard variant="glass">
            <MedicalCardHeader>
              <MedicalCardTitle>Hospital Performance Rankings</MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="space-y-4">
                {hospitalPerformance.map((hospital, index) => (
                  <div key={hospital.name} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{hospital.name}</p>
                        <p className="text-sm text-muted-foreground">{hospital.patients} patients served</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{hospital.revenue}</p>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm">{hospital.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemAnalytics;