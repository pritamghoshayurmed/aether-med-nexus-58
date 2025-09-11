import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  Shield, 
  Activity, 
  Users, 
  Building2,
  TrendingUp,
  AlertTriangle,
  FileCheck,
  Truck,
  MessageSquare,
  Eye,
  Settings,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  Globe,
  Database,
  Menu,
  X
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import SystemAnalytics from "./admin/SystemAnalytics";
import ComplianceMonitoring from "./admin/ComplianceMonitoring";
import SupplyChainTracking from "./admin/SupplyChainTracking";
import ComplaintsManagement from "./admin/ComplaintsManagement";

const SuperAdminDashboard = () => {
  const location = useLocation();
  const [selectedTimeframe, setSelectedTimeframe] = useState("today");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentPath = location.pathname;
  const isOverviewPage = currentPath === "/dashboard/admin";

  const navigationItems = [
    { path: "/dashboard/admin", label: "Overview", icon: BarChart3 },
    { path: "/dashboard/admin/analytics", label: "System Analytics", icon: TrendingUp },
    { path: "/dashboard/admin/compliance", label: "Compliance", icon: Shield },
    { path: "/dashboard/admin/supply-chain", label: "Supply Chain", icon: Truck },
    { path: "/dashboard/admin/complaints", label: "Complaints", icon: MessageSquare },
  ];

  const renderCurrentPage = () => {
    switch (currentPath) {
      case "/dashboard/admin/analytics":
        return <SystemAnalytics />;
      case "/dashboard/admin/compliance":
        return <ComplianceMonitoring />;
      case "/dashboard/admin/supply-chain":
        return <SupplyChainTracking />;
      case "/dashboard/admin/complaints":
        return <ComplaintsManagement />;
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => (
    <>
      {/* System Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {systemMetrics.map((metric) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Revenue Analytics */}
          <MedicalCard variant="glass">
            <MedicalCardHeader>
              <MedicalCardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                Revenue Analytics
              </MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {revenueData.map((data) => (
                  <div key={data.period} className="p-4 rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">{data.period}</p>
                    <p className="text-2xl font-bold text-primary">{data.amount}</p>
                    <p className="text-xs text-muted-foreground mt-1">{data.transactions} transactions</p>
                  </div>
                ))}
              </div>
            </MedicalCardContent>
          </MedicalCard>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MedicalCard variant="glass" className="cursor-pointer hover:bg-muted/50 transition-colors">
              <NavLink to="/dashboard/admin/analytics" className="block">
                <MedicalCardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">System Analytics</h3>
                      <p className="text-sm text-muted-foreground">Detailed platform metrics</p>
                    </div>
                  </div>
                </MedicalCardContent>
              </NavLink>
            </MedicalCard>

            <MedicalCard variant="glass" className="cursor-pointer hover:bg-muted/50 transition-colors">
              <NavLink to="/dashboard/admin/compliance" className="block">
                <MedicalCardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Shield className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">Compliance Monitoring</h3>
                      <p className="text-sm text-muted-foreground">Regulatory compliance tracking</p>
                    </div>
                  </div>
                </MedicalCardContent>
              </NavLink>
            </MedicalCard>

            <MedicalCard variant="glass" className="cursor-pointer hover:bg-muted/50 transition-colors">
              <NavLink to="/dashboard/admin/supply-chain" className="block">
                <MedicalCardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Truck className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">Supply Chain Tracking</h3>
                      <p className="text-sm text-muted-foreground">Inventory and distribution</p>
                    </div>
                  </div>
                </MedicalCardContent>
              </NavLink>
            </MedicalCard>

            <MedicalCard variant="glass" className="cursor-pointer hover:bg-muted/50 transition-colors">
              <NavLink to="/dashboard/admin/complaints" className="block">
                <MedicalCardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <MessageSquare className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">Complaints Management</h3>
                      <p className="text-sm text-muted-foreground">User feedback and support</p>
                    </div>
                  </div>
                </MedicalCardContent>
              </NavLink>
            </MedicalCard>
          </div>

          {/* Recent Activity */}
          <MedicalCard variant="glass">
            <MedicalCardHeader>
              <MedicalCardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5 text-primary" />
                Recent System Activity
              </MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="space-y-4">
                {auditLogs.slice(0, 5).map((log, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-3">
                      {log.status === "success" ? 
                        <CheckCircle className="h-4 w-4 text-green-500" /> :
                        <XCircle className="h-4 w-4 text-red-500" />
                      }
                      <div>
                        <p className="text-sm font-medium">{log.action}</p>
                        <p className="text-xs text-muted-foreground">{log.user}</p>
                      </div>
                    </div>
                    <p className="text-xs text-primary">{log.timestamp}</p>
                  </div>
                ))}
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* System Health */}
          <MedicalCard variant="glass">
            <MedicalCardHeader>
              <MedicalCardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5 text-primary" />
                System Health
              </MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Database className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Database</span>
                  </div>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-green-500" />
                    <span className="text-sm">API Services</span>
                  </div>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Security</span>
                  </div>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Performance</span>
                  </div>
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                </div>
              </div>
            </MedicalCardContent>
          </MedicalCard>

          {/* Quick Stats */}
          <MedicalCard variant="glass">
            <MedicalCardHeader>
              <MedicalCardTitle>Quick Stats</MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Open Complaints</span>
                  <Badge variant="destructive">23</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Critical Supplies</span>
                  <Badge variant="destructive">8</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Compliance Issues</span>
                  <Badge variant="secondary">5</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Active Users</span>
                  <Badge variant="default">15.8K</Badge>
                </div>
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </div>
      </div>
    </>
  );

  const systemMetrics = [
    { label: "Active Users", value: "15,847", change: "+12%", icon: Users, trend: "up" },
    { label: "Total Hospitals", value: "234", change: "+3%", icon: Building2, trend: "up" },
    { label: "Consultations", value: "8,923", change: "+18%", icon: Activity, trend: "up" },
    { label: "System Uptime", value: "99.9%", change: "0%", icon: Shield, trend: "stable" },
  ];

  const revenueData = [
    { period: "Today", amount: "₹12.4L", transactions: "2,847" },
    { period: "This Week", amount: "₹68.2L", transactions: "18,934" },
    { period: "This Month", amount: "₹2.8Cr", transactions: "89,462" },
  ];

  const complianceStatus = [
    { category: "HIPAA Compliance", status: "compliant", lastCheck: "2 days ago", score: 98 },
    { category: "Data Protection", status: "compliant", lastCheck: "1 day ago", score: 96 },
    { category: "Medical Licensing", status: "warning", lastCheck: "5 days ago", score: 87 },
    { category: "Audit Logs", status: "compliant", lastCheck: "Today", score: 99 },
  ];

  const supplyChainAlerts = [
    { hospital: "City General", item: "Ventilators", status: "critical", quantity: "2 units", urgency: "high" },
    { hospital: "Metro Hospital", item: "Blood Units (O+)", status: "low", quantity: "15 units", urgency: "medium" },
    { hospital: "Care Center", item: "ICU Beds", status: "full", quantity: "0 available", urgency: "high" },
  ];

  const complaints = [
    { id: "C001", user: "Patient John D.", type: "Technical Issue", status: "open", priority: "high", time: "2h ago" },
    { id: "C002", user: "Dr. Sarah M.", type: "Payment Dispute", status: "investigating", priority: "medium", time: "4h ago" },
    { id: "C003", user: "Metro Hospital", type: "System Downtime", status: "resolved", priority: "high", time: "1d ago" },
  ];

  const auditLogs = [
    { action: "User Login", user: "admin@hospital.com", timestamp: "10:30 AM", status: "success" },
    { action: "Data Export", user: "dr.smith@care.com", timestamp: "10:15 AM", status: "success" },
    { action: "Failed Login", user: "unknown@test.com", timestamp: "10:05 AM", status: "failed" },
    { action: "Policy Update", user: "admin@system.com", timestamp: "9:45 AM", status: "success" },
  ];

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Navigation Header */}
      <div className="bg-card/50 border-b backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Title */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <h1 className="text-xl font-bold">SuperAdmin</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`
                  }
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* System Status & Settings */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs text-muted-foreground">All Systems Operational</span>
              </div>
              <MedicalButton variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </MedicalButton>
              
              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-muted"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 pb-24">
        {isOverviewPage && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Platform <span className="gradient-text">Overview</span>
            </h1>
            <p className="text-muted-foreground">SuperAdmin Dashboard • Comprehensive system management</p>
          </div>
        )}

        {renderCurrentPage()}
      </div>


      <BottomNavigation userRole="admin" />
    </div>
  );
};

export default SuperAdminDashboard;