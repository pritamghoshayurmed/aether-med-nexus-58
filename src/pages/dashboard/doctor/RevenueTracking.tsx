import { useState } from "react";
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Users, 
  FileText,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Target
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BottomNavigation from "@/components/navigation/BottomNavigation";

interface RevenueData {
  period: string;
  consultations: number;
  revenue: number;
  growth: number;
  patients: number;
}

interface PaymentRecord {
  id: string;
  patient: string;
  service: string;
  amount: number;
  date: string;
  status: "paid" | "pending" | "overdue";
  method: string;
}

const RevenueTracking = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedYear, setSelectedYear] = useState("2024");

  const revenueData: RevenueData[] = [
    { period: "Jan", consultations: 85, revenue: 127500, growth: 12, patients: 68 },
    { period: "Feb", consultations: 92, revenue: 138000, growth: 8, patients: 73 },
    { period: "Mar", consultations: 98, revenue: 147000, growth: 6, patients: 79 },
    { period: "Apr", consultations: 105, revenue: 157500, growth: 7, patients: 84 },
    { period: "May", consultations: 110, revenue: 165000, growth: 5, patients: 88 },
    { period: "Jun", consultations: 118, revenue: 177000, growth: 7, patients: 94 }
  ];

  const paymentRecords: PaymentRecord[] = [
    {
      id: "1",
      patient: "Alice Johnson",
      service: "Cardiology Consultation",
      amount: 2500,
      date: "2024-01-20",
      status: "paid",
      method: "UPI"
    },
    {
      id: "2", 
      patient: "Robert Davis",
      service: "Follow-up Consultation",
      amount: 1500,
      date: "2024-01-19", 
      status: "pending",
      method: "Credit Card"
    },
    {
      id: "3",
      patient: "Sarah Wilson",
      service: "ECG Analysis",
      amount: 1200,
      date: "2024-01-18",
      status: "paid",
      method: "Bank Transfer"
    },
    {
      id: "4",
      patient: "Michael Brown",
      service: "Emergency Consultation",
      amount: 3500,
      date: "2024-01-17",
      status: "overdue",
      method: "Cash"
    }
  ];

  const totalRevenue = revenueData.reduce((sum, data) => sum + data.revenue, 0);
  const totalConsultations = revenueData.reduce((sum, data) => sum + data.consultations, 0);
  const avgRevenuePerConsultation = totalRevenue / totalConsultations;
  const totalPatients = revenueData[revenueData.length - 1]?.patients || 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return "bg-green-500";
      case "pending": return "bg-yellow-500"; 
      case "overdue": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "paid": return "secondary";
      case "pending": return "default";
      case "overdue": return "destructive";
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
              <span className="gradient-text">Revenue Analytics</span>
            </h1>
            <p className="text-muted-foreground">Track your practice revenue and financial performance</p>
          </div>
          <div className="flex space-x-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <MedicalButton variant="medical">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </MedicalButton>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-primary">₹{(totalRevenue / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% vs last month
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </MedicalCardContent>
          </MedicalCard>

          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Consultations</p>
                  <p className="text-2xl font-bold text-primary">{totalConsultations}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8% vs last month
                  </p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </MedicalCardContent>
          </MedicalCard>

          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg per Consultation</p>
                  <p className="text-2xl font-bold text-primary">₹{avgRevenuePerConsultation.toFixed(0)}</p>
                  <p className="text-xs text-blue-600 flex items-center mt-1">
                    <Target className="h-3 w-3 mr-1" />
                    On target
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
            </MedicalCardContent>
          </MedicalCard>

          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Patients</p>
                  <p className="text-2xl font-bold text-primary">{totalPatients}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +15% vs last month
                  </p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2">
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                  Revenue Trend (2024)
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  {/* Simple Chart Representation */}
                  <div className="grid grid-cols-6 gap-2">
                    {revenueData.map((data, index) => (
                      <div key={data.period} className="text-center">
                        <div 
                          className="bg-gradient-primary rounded-t mx-auto mb-2"
                          style={{ 
                            height: `${(data.revenue / Math.max(...revenueData.map(d => d.revenue))) * 120}px`,
                            width: '20px'
                          }}
                        />
                        <p className="text-xs text-muted-foreground">{data.period}</p>
                        <p className="text-xs font-medium">₹{(data.revenue / 1000).toFixed(0)}K</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Monthly Breakdown */}
                  <div className="space-y-2">
                    {revenueData.slice(-3).map((data) => (
                      <div key={data.period} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-primary rounded-full" />
                          <span className="font-medium">{data.period} 2024</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <span>{data.consultations} consultations</span>
                          <span className="font-bold">₹{(data.revenue / 1000).toFixed(0)}K</span>
                          <Badge 
                            variant={data.growth > 0 ? "secondary" : "destructive"}
                            className="text-xs"
                          >
                            {data.growth > 0 ? "+" : ""}{data.growth}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>

          {/* Revenue Breakdown */}
          <div className="lg:col-span-1">
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <PieChart className="mr-2 h-5 w-5 text-primary" />
                  Service Breakdown
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      <span className="text-sm">Consultations</span>
                    </div>
                    <span className="font-medium">65%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-sm">Follow-ups</span>
                    </div>
                    <span className="font-medium">25%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <span className="text-sm">Procedures</span>
                    </div>
                    <span className="font-medium">10%</span>
                  </div>
                </div>

                {/* Goals */}
                <div className="mt-6 pt-4 border-t border-border/50">
                  <h4 className="font-medium mb-3">Monthly Targets</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Revenue Goal</span>
                      <span className="text-sm font-medium">₹150K</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }} />
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>₹127.5K achieved</span>
                      <span>85% complete</span>
                    </div>
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>
        </div>

        {/* Recent Payments */}
        <div className="mt-6">
          <MedicalCard variant="glass">
            <MedicalCardHeader>
              <div className="flex items-center justify-between">
                <MedicalCardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  Recent Payments
                </MedicalCardTitle>
                <MedicalButton variant="outline" size="sm">
                  <Filter className="mr-1 h-3 w-3" />
                  Filter
                </MedicalButton>
              </div>
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="space-y-3">
                {paymentRecords.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{payment.patient}</h4>
                        <p className="text-sm text-muted-foreground">{payment.service}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Calendar className="h-3 w-3 text-primary" />
                          <span className="text-xs text-primary">{new Date(payment.date).toLocaleDateString()}</span>
                          <span className="text-xs text-muted-foreground">• {payment.method}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="font-bold">₹{payment.amount.toLocaleString()}</p>
                        <Badge variant={getStatusBadgeVariant(payment.status)} className="text-xs">
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </div>
      </div>

      <BottomNavigation userRole="doctor" />
    </div>
  );
};

export default RevenueTracking;