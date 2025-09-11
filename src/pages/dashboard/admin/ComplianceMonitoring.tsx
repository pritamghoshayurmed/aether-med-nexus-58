import { useState } from "react";
import { 
  Shield, 
  FileCheck, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Clock,
  Eye,
  Download,
  Filter
} from "lucide-react";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { MedicalButton } from "@/components/ui/medical-button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ComplianceMonitoring = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const complianceOverview = [
    { category: "HIPAA Compliance", status: "compliant", score: 98, lastCheck: "2 days ago", issues: 0 },
    { category: "Data Protection (GDPR)", status: "compliant", score: 96, lastCheck: "1 day ago", issues: 0 },
    { category: "Medical Licensing", status: "warning", score: 87, lastCheck: "5 days ago", issues: 3 },
    { category: "Audit Logs", status: "compliant", score: 99, lastCheck: "Today", issues: 0 },
    { category: "Indian Health Information Rules", status: "compliant", score: 94, lastCheck: "3 days ago", issues: 0 },
    { category: "Pharmacy Regulations", status: "warning", score: 89, lastCheck: "1 week ago", issues: 2 },
  ];

  const auditLogs = [
    { id: "AL001", action: "User Login", user: "admin@hospital.com", timestamp: "2024-01-15 10:30", status: "success", ipAddress: "192.168.1.100", details: "Successful admin login" },
    { id: "AL002", action: "Data Export", user: "dr.smith@care.com", timestamp: "2024-01-15 10:15", status: "success", ipAddress: "10.0.0.50", details: "Patient data export - 50 records" },
    { id: "AL003", action: "Failed Login Attempt", user: "unknown@test.com", timestamp: "2024-01-15 10:05", status: "failed", ipAddress: "203.0.113.1", details: "Invalid credentials - blocked" },
    { id: "AL004", action: "Policy Update", user: "admin@system.com", timestamp: "2024-01-15 09:45", status: "success", ipAddress: "192.168.1.101", details: "Privacy policy updated" },
    { id: "AL005", action: "Patient Data Access", user: "nurse@metro.com", timestamp: "2024-01-15 09:30", status: "success", ipAddress: "10.0.0.75", details: "Accessed patient ID: PT001234" },
    { id: "AL006", action: "Unauthorized Access Attempt", user: "unknown@malicious.com", timestamp: "2024-01-15 09:15", status: "blocked", ipAddress: "198.51.100.1", details: "Attempted database access - IP blocked" },
  ];

  const complianceAlerts = [
    { id: "CA001", type: "critical", title: "Medical License Expiry", description: "3 doctors' licenses expire within 30 days", affected: "Dr. Johnson, Dr. Lee, Dr. Patel", priority: "high", created: "2h ago" },
    { id: "CA002", type: "warning", title: "Data Retention Policy", description: "Patient records older than 7 years need archival", affected: "2,341 records", priority: "medium", created: "1d ago" },
    { id: "CA003", type: "info", title: "Security Audit Due", description: "Quarterly security audit scheduled", affected: "All systems", priority: "low", created: "3d ago" },
  ];

  const regulatoryUpdates = [
    { id: "RU001", title: "Updated HIPAA Guidelines", description: "New requirements for patient data handling in telemedicine", effective: "2024-02-01", status: "pending" },
    { id: "RU002", title: "Indian Digital Health Mission", description: "Integration requirements for health ID systems", effective: "2024-03-15", status: "in-progress" },
    { id: "RU003", title: "Pharmacy Act Amendment", description: "New regulations for online medicine delivery", effective: "2024-01-20", status: "implemented" },
  ];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || log.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Compliance <span className="gradient-text">Monitoring</span>
          </h1>
          <p className="text-muted-foreground">Regulatory compliance tracking and audit management</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <MedicalButton variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </MedicalButton>
          <MedicalButton variant="medical">
            <Shield className="mr-2 h-4 w-4" />
            Run Audit
          </MedicalButton>
        </div>
      </div>

      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {complianceOverview.map((item) => (
          <MedicalCard key={item.category} variant="glass" className={item.status === "warning" ? "border-yellow-500/50" : ""}>
            <MedicalCardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-3 h-3 rounded-full ${
                  item.status === "compliant" ? "bg-green-500" : "bg-yellow-500"
                }`} />
                <Badge variant={item.status === "compliant" ? "default" : "secondary"}>
                  {item.score}% Score
                </Badge>
              </div>
              <h3 className="font-semibold mb-2">{item.category}</h3>
              <p className="text-sm text-muted-foreground mb-2">Last checked: {item.lastCheck}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-primary">{item.issues} Issues</span>
                {item.status === "compliant" ? 
                  <CheckCircle className="h-4 w-4 text-green-500" /> :
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                }
              </div>
            </MedicalCardContent>
          </MedicalCard>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="alerts" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="alerts">Compliance Alerts</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="regulatory">Regulatory Updates</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          <MedicalCard variant="glass">
            <MedicalCardHeader>
              <MedicalCardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-primary" />
                Active Compliance Alerts
              </MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="space-y-4">
                {complianceAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 rounded-lg bg-muted/50 border-l-4 border-l-primary">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant={
                            alert.type === "critical" ? "destructive" :
                            alert.type === "warning" ? "secondary" : "outline"
                          }>
                            {alert.type}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {alert.priority} priority
                          </Badge>
                        </div>
                        <h3 className="font-semibold mb-1">{alert.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                        <p className="text-xs text-primary">Affected: {alert.affected}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">{alert.created}</p>
                        <MedicalButton variant="outline" size="sm" className="mt-2">
                          <Eye className="mr-1 h-3 w-3" />
                          View
                        </MedicalButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <MedicalCard variant="glass">
            <MedicalCardHeader>
              <div className="flex items-center justify-between">
                <MedicalCardTitle className="flex items-center">
                  <FileCheck className="mr-2 h-5 w-5 text-primary" />
                  System Audit Logs
                </MedicalCardTitle>
                <div className="flex items-center space-x-2">
                  <Input 
                    placeholder="Search logs..." 
                    className="w-48"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="space-y-3">
                {filteredLogs.map((log) => (
                  <div key={log.id} className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          {log.status === "success" ? 
                            <CheckCircle className="h-4 w-4 text-green-500" /> :
                            log.status === "failed" ?
                            <XCircle className="h-4 w-4 text-red-500" /> :
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          }
                          <span className="font-medium">{log.action}</span>
                        </div>
                        <Badge variant={
                          log.status === "success" ? "default" :
                          log.status === "failed" ? "destructive" : "secondary"
                        } className="text-xs">
                          {log.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{log.timestamp}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">User: </span>
                        <span className="text-primary">{log.user}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">IP Address: </span>
                        <span>{log.ipAddress}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Details: </span>
                        <span>{log.details}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <MedicalButton variant="outline">
                  Load More Logs
                </MedicalButton>
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </TabsContent>

        <TabsContent value="regulatory" className="space-y-4">
          <MedicalCard variant="glass">
            <MedicalCardHeader>
              <MedicalCardTitle>Regulatory Updates & Requirements</MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="space-y-4">
                {regulatoryUpdates.map((update) => (
                  <div key={update.id} className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{update.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{update.description}</p>
                        <p className="text-xs text-primary">Effective Date: {update.effective}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          update.status === "implemented" ? "default" :
                          update.status === "in-progress" ? "secondary" : "outline"
                        }>
                          {update.status}
                        </Badge>
                        <MedicalButton variant="outline" size="sm" className="mt-2 ml-2">
                          View Details
                        </MedicalButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle>Generate Compliance Report</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full Compliance Report</SelectItem>
                      <SelectItem value="hipaa">HIPAA Compliance Only</SelectItem>
                      <SelectItem value="audit">Audit Log Summary</SelectItem>
                      <SelectItem value="security">Security Assessment</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Last Week</SelectItem>
                      <SelectItem value="month">Last Month</SelectItem>
                      <SelectItem value="quarter">Last Quarter</SelectItem>
                      <SelectItem value="year">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <MedicalButton variant="medical" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Generate Report
                  </MedicalButton>
                </div>
              </MedicalCardContent>
            </MedicalCard>

            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle>Recent Reports</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Monthly Compliance Report</p>
                      <p className="text-xs text-muted-foreground">Generated on Jan 1, 2024</p>
                    </div>
                    <MedicalButton variant="outline" size="sm">
                      <Download className="h-3 w-3" />
                    </MedicalButton>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">HIPAA Audit Report</p>
                      <p className="text-xs text-muted-foreground">Generated on Dec 15, 2023</p>
                    </div>
                    <MedicalButton variant="outline" size="sm">
                      <Download className="h-3 w-3" />
                    </MedicalButton>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium">Security Assessment</p>
                      <p className="text-xs text-muted-foreground">Generated on Dec 1, 2023</p>
                    </div>
                    <MedicalButton variant="outline" size="sm">
                      <Download className="h-3 w-3" />
                    </MedicalButton>
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComplianceMonitoring;