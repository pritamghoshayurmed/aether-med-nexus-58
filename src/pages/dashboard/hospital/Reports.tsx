import { useState } from "react";
import { 
  BarChart3, 
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  Users,
  Bed,
  Calendar,
  Download,
  Filter
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const Reports = () => {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState("week");
  const [reportType, setReportType] = useState("overview");

  // Mock data for statistics
  const hospitalStats = {
    revenue: {
      current: "₹2,45,000",
      previous: "₹2,12,000",
      change: 15.6,
      trend: "up"
    },
    patients: {
      current: 187,
      previous: 165,
      change: 13.3,
      trend: "up"
    },
    occupancy: {
      current: "78%",
      previous: "72%",
      change: 8.3,
      trend: "up"
    },
    satisfaction: {
      current: "94%",
      previous: "92%",
      change: 2.2,
      trend: "up"
    }
  };

  const departmentPerformance = [
    { name: "Cardiology", patients: 45, revenue: "₹85,000", occupancy: "85%", rating: 4.8 },
    { name: "Neurology", patients: 32, revenue: "₹65,000", occupancy: "70%", rating: 4.6 },
    { name: "Orthopedics", patients: 38, revenue: "₹58,000", occupancy: "75%", rating: 4.7 },
    { name: "Pediatrics", patients: 42, revenue: "₹35,000", occupancy: "60%", rating: 4.9 },
    { name: "ICU", patients: 15, revenue: "₹125,000", occupancy: "90%", rating: 4.5 },
  ];

  const medicineUsage = [
    { name: "Paracetamol 500mg", used: 245, cost: "₹4,900", category: "Analgesic" },
    { name: "Amoxicillin 250mg", used: 180, cost: "₹8,100", category: "Antibiotic" },
    { name: "Insulin Cartridges", used: 95, cost: "₹28,500", category: "Diabetes" },
    { name: "Ibuprofen 400mg", used: 160, cost: "₹3,200", category: "Anti-inflammatory" },
    { name: "Aspirin 75mg", used: 125, cost: "₹1,875", category: "Cardiovascular" },
  ];

  const staffMetrics = [
    { department: "Cardiology", doctors: 8, nurses: 15, efficiency: "92%" },
    { department: "Neurology", doctors: 6, nurses: 12, efficiency: "88%" },
    { department: "Orthopedics", doctors: 7, nurses: 14, efficiency: "90%" },
    { department: "Pediatrics", doctors: 5, nurses: 18, efficiency: "95%" },
    { department: "ICU", doctors: 4, nurses: 20, efficiency: "87%" },
  ];

  const exportReport = () => {
    toast({
      title: "Report Exported",
      description: "Hospital report has been exported successfully.",
    });
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-green-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-500" />
    );
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-green-500" : "text-red-500";
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="gradient-text">Hospital Reports & Analytics</span>
            </h1>
            <p className="text-muted-foreground">Comprehensive hospital performance insights</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <MedicalButton variant="medical" onClick={exportReport}>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </MedicalButton>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="h-8 w-8 text-primary" />
                {getTrendIcon(hospitalStats.revenue.trend)}
              </div>
              <p className="text-sm text-muted-foreground">Revenue</p>
              <p className="text-2xl font-bold text-primary">{hospitalStats.revenue.current}</p>
              <p className={`text-xs ${getTrendColor(hospitalStats.revenue.trend)}`}>
                +{hospitalStats.revenue.change}% from last period
              </p>
            </MedicalCardContent>
          </MedicalCard>

          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Users className="h-8 w-8 text-blue-500" />
                {getTrendIcon(hospitalStats.patients.trend)}
              </div>
              <p className="text-sm text-muted-foreground">Patients Treated</p>
              <p className="text-2xl font-bold text-blue-500">{hospitalStats.patients.current}</p>
              <p className={`text-xs ${getTrendColor(hospitalStats.patients.trend)}`}>
                +{hospitalStats.patients.change}% from last period
              </p>
            </MedicalCardContent>
          </MedicalCard>

          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Bed className="h-8 w-8 text-orange-500" />
                {getTrendIcon(hospitalStats.occupancy.trend)}
              </div>
              <p className="text-sm text-muted-foreground">Bed Occupancy</p>
              <p className="text-2xl font-bold text-orange-500">{hospitalStats.occupancy.current}</p>
              <p className={`text-xs ${getTrendColor(hospitalStats.occupancy.trend)}`}>
                +{hospitalStats.occupancy.change}% from last period
              </p>
            </MedicalCardContent>
          </MedicalCard>

          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Activity className="h-8 w-8 text-green-500" />
                {getTrendIcon(hospitalStats.satisfaction.trend)}
              </div>
              <p className="text-sm text-muted-foreground">Patient Satisfaction</p>
              <p className="text-2xl font-bold text-green-500">{hospitalStats.satisfaction.current}</p>
              <p className={`text-xs ${getTrendColor(hospitalStats.satisfaction.trend)}`}>
                +{hospitalStats.satisfaction.change}% from last period
              </p>
            </MedicalCardContent>
          </MedicalCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Department Performance */}
          <MedicalCard variant="glass">
            <MedicalCardHeader>
              <MedicalCardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-primary" />
                Department Performance
              </MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="space-y-4">
                {departmentPerformance.map((dept, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{dept.name}</h3>
                      <Badge variant="outline">Rating: {dept.rating}</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Patients</p>
                        <p className="font-bold text-primary">{dept.patients}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Revenue</p>
                        <p className="font-bold text-green-500">{dept.revenue}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Occupancy</p>
                        <p className="font-bold text-orange-500">{dept.occupancy}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </MedicalCardContent>
          </MedicalCard>

          {/* Staff Metrics */}
          <MedicalCard variant="glass">
            <MedicalCardHeader>
              <MedicalCardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-primary" />
                Staff Efficiency
              </MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="space-y-4">
                {staffMetrics.map((staff, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{staff.department}</h3>
                      <Badge variant={
                        parseInt(staff.efficiency) >= 90 ? "default" : "secondary"
                      }>
                        {staff.efficiency} Efficient
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Doctors</p>
                        <p className="font-bold text-primary">{staff.doctors}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Nurses</p>
                        <p className="font-bold text-blue-500">{staff.nurses}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </div>

        {/* Medicine Usage Analytics */}
        <MedicalCard variant="glass">
          <MedicalCardHeader>
            <MedicalCardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-primary" />
              Medicine Usage & Cost Analysis
            </MedicalCardTitle>
          </MedicalCardHeader>
          <MedicalCardContent>
            <div className="space-y-4">
              {medicineUsage.map((medicine, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex-1">
                    <h3 className="font-semibold">{medicine.name}</h3>
                    <p className="text-sm text-muted-foreground">{medicine.category}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div className="text-center">
                      <p className="text-muted-foreground">Units Used</p>
                      <p className="font-bold text-primary">{medicine.used}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground">Total Cost</p>
                      <p className="font-bold text-green-500">{medicine.cost}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-primary/10 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Total Medicine Cost:</span>
                <span className="text-xl font-bold text-primary">₹46,575</span>
              </div>
            </div>
          </MedicalCardContent>
        </MedicalCard>
      </div>

      <BottomNavigation userRole="hospital" />
    </div>
  );
};

export default Reports;