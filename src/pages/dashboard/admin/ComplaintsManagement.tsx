import { useState } from "react";
import { 
  MessageSquare, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  User,
  Building2,
  Filter,
  Search,
  Eye,
  MessageCircle,
  Star
} from "lucide-react";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { MedicalButton } from "@/components/ui/medical-button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const ComplaintsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedComplaint, setSelectedComplaint] = useState<string | null>(null);

  const complaintStats = [
    { label: "Open Complaints", value: "23", change: "-5", icon: MessageSquare, trend: "down" },
    { label: "Resolved Today", value: "18", change: "+12", icon: CheckCircle, trend: "up" },
    { label: "Critical Issues", value: "4", change: "0", icon: AlertCircle, trend: "stable" },
    { label: "Avg Resolution", value: "2.4h", change: "-0.6h", icon: Clock, trend: "down" },
  ];

  const complaints = [
    {
      id: "C001",
      user: "Patient John D.",
      userType: "patient",
      email: "john.doe@email.com",
      type: "Technical Issue",
      category: "App Performance",
      subject: "App crashes during video consultation",
      description: "The mobile app keeps crashing whenever I try to join a video consultation with my doctor. This has happened 3 times in the past week.",
      status: "open",
      priority: "high",
      assignedTo: "Tech Support Team",
      submittedDate: "2024-01-15 08:30",
      responseTime: "2h 15m",
      lastUpdated: "2 hours ago",
      rating: null,
      attachments: ["crash_log.txt", "screenshot.png"]
    },
    {
      id: "C002",
      user: "Dr. Sarah Martinez",
      userType: "doctor",
      email: "sarah.martinez@hospital.com",
      type: "Payment Dispute",
      category: "Billing",
      subject: "Incorrect consultation fee deduction",
      description: "My account shows a deduction for 5 consultations but I only conducted 3 consultations yesterday. Need clarification on billing.",
      status: "investigating",
      priority: "medium",
      assignedTo: "Finance Team",
      submittedDate: "2024-01-14 16:45",
      responseTime: "4h 20m",
      lastUpdated: "6 hours ago",
      rating: null,
      attachments: ["billing_statement.pdf"]
    },
    {
      id: "C003",
      user: "Metro Hospital Admin",
      userType: "hospital",
      email: "admin@metrohospital.com",
      type: "System Downtime",
      category: "Infrastructure",
      subject: "Dashboard inaccessible for 2 hours",
      description: "Hospital dashboard was completely inaccessible from 2 PM to 4 PM today. This affected patient admissions and appointment scheduling.",
      status: "resolved",
      priority: "high",
      assignedTo: "DevOps Team",
      submittedDate: "2024-01-14 14:15",
      responseTime: "45m",
      lastUpdated: "1 day ago",
      rating: 4,
      resolution: "Server maintenance caused temporary downtime. Additional monitoring implemented to prevent future occurrences."
    },
    {
      id: "C004",
      user: "Patient Maria Rodriguez",
      userType: "patient",
      email: "maria.r@email.com",
      type: "Data Privacy",
      category: "Privacy",
      subject: "Received someone else's medical report",
      description: "I received another patient's medical report in my email. This is a serious privacy breach and I'm very concerned about my own data security.",
      status: "open",
      priority: "critical",
      assignedTo: "Privacy Officer",
      submittedDate: "2024-01-15 11:20",
      responseTime: "30m",
      lastUpdated: "1 hour ago",
      rating: null,
      attachments: []
    },
    {
      id: "C005",
      user: "Dr. Amit Sharma", 
      userType: "doctor",
      email: "amit.sharma@clinic.com",
      type: "Feature Request",
      category: "Enhancement",
      subject: "Need prescription template customization",
      description: "Would like to create custom prescription templates for different specialties. Current templates are too generic for my neurology practice.",
      status: "under-review",
      priority: "low",
      assignedTo: "Product Team",
      submittedDate: "2024-01-13 09:30",
      responseTime: "1d 8h",
      lastUpdated: "2 days ago",
      rating: null,
      attachments: ["template_mockup.jpg"]
    }
  ];

  const categoryStats = [
    { category: "Technical Issues", count: 12, resolved: 8, pending: 4 },
    { category: "Billing Disputes", count: 8, resolved: 6, pending: 2 },
    { category: "Privacy Concerns", count: 5, resolved: 3, pending: 2 },
    { category: "Feature Requests", count: 7, resolved: 2, pending: 5 },
    { category: "Infrastructure", count: 4, resolved: 4, pending: 0 },
  ];

  const resolutionTrends = [
    { month: "Dec 2023", resolved: 45, avgTime: "3.2h" },
    { month: "Jan 2024", resolved: 38, avgTime: "2.8h" },
  ];

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || complaint.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "open": return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "investigating": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "under-review": return <Eye className="h-4 w-4 text-blue-500" />;
      default: return <MessageSquare className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getUserIcon = (userType: string) => {
    switch (userType) {
      case "patient": return <User className="h-4 w-4 text-blue-500" />;
      case "doctor": return <User className="h-4 w-4 text-green-500" />;
      case "hospital": return <Building2 className="h-4 w-4 text-purple-500" />;
      default: return <User className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Complaints <span className="gradient-text">Management</span>
          </h1>
          <p className="text-muted-foreground">Monitor and resolve user feedback and complaints</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <MedicalButton variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filter
          </MedicalButton>
          <MedicalButton variant="medical">
            <MessageCircle className="mr-2 h-4 w-4" />
            Bulk Actions
          </MedicalButton>
        </div>
      </div>

      {/* Complaint Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {complaintStats.map((stat) => (
          <MedicalCard key={stat.label} variant="glass">
            <MedicalCardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="h-8 w-8 text-primary" />
                <Badge variant={
                  stat.trend === "up" ? "default" :
                  stat.trend === "down" ? "secondary" : "outline"
                } className="text-xs">
                  {stat.change}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
            </MedicalCardContent>
          </MedicalCard>
        ))}
      </div>

      {/* Main Content */}
      <Tabs defaultValue="complaints" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="complaints">All Complaints</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="categories">By Category</TabsTrigger>
          <TabsTrigger value="trends">Resolution Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="complaints" className="space-y-4">
          <MedicalCard variant="glass">
            <MedicalCardHeader>
              <div className="flex items-center justify-between">
                <MedicalCardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                  Recent Complaints & Feedback
                </MedicalCardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search complaints..." 
                      className="pl-10 w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="investigating">Investigating</SelectItem>
                      <SelectItem value="under-review">Under Review</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="space-y-4">
                {filteredComplaints.map((complaint) => (
                  <div key={complaint.id} className="p-4 rounded-lg bg-muted/50 border-l-4 border-l-primary">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getUserIcon(complaint.userType)}
                          <span className="font-semibold">{complaint.user}</span>
                          <Badge variant={
                            complaint.status === "resolved" ? "default" :
                            complaint.status === "open" ? "destructive" :
                            complaint.status === "investigating" ? "secondary" : "outline"
                          }>
                            {complaint.status}
                          </Badge>
                          <Badge variant={
                            complaint.priority === "critical" ? "destructive" :
                            complaint.priority === "high" ? "destructive" :
                            complaint.priority === "medium" ? "secondary" : "outline"
                          } className="text-xs">
                            {complaint.priority}
                          </Badge>
                        </div>
                        
                        <h3 className="font-medium mb-1">{complaint.subject}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{complaint.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                          <div>
                            <span className="text-muted-foreground">Type: </span>
                            <span className="text-primary">{complaint.type}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Assigned: </span>
                            <span className="text-primary">{complaint.assignedTo}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Response Time: </span>
                            <span className="text-primary">{complaint.responseTime}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Updated: </span>
                            <span className="text-primary">{complaint.lastUpdated}</span>
                          </div>
                        </div>

                        {complaint.rating && (
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-xs text-muted-foreground">Rating: </span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-3 w-3 ${i < complaint.rating! ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                          </div>
                        )}

                        {complaint.attachments.length > 0 && (
                          <div className="mt-2">
                            <span className="text-xs text-muted-foreground">Attachments: </span>
                            {complaint.attachments.map((attachment, index) => (
                              <Badge key={index} variant="outline" className="text-xs mr-1">
                                {attachment}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <div className="text-right space-y-2 ml-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(complaint.status)}
                          <span className="text-xs text-muted-foreground">{complaint.id}</span>
                        </div>
                        <MedicalButton 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedComplaint(selectedComplaint === complaint.id ? null : complaint.id)}
                        >
                          <Eye className="mr-1 h-3 w-3" />
                          {selectedComplaint === complaint.id ? "Hide" : "View"}
                        </MedicalButton>
                        {complaint.status !== "resolved" && (
                          <MedicalButton variant="medical" size="sm">
                            Resolve
                          </MedicalButton>
                        )}
                      </div>
                    </div>

                    {/* Expanded View */}
                    {selectedComplaint === complaint.id && (
                      <div className="mt-4 pt-4 border-t border-muted">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                          <div>
                            <p><strong>Email:</strong> {complaint.email}</p>
                            <p><strong>Category:</strong> {complaint.category}</p>
                            <p><strong>Submitted:</strong> {complaint.submittedDate}</p>
                          </div>
                          <div>
                            <p><strong>User Type:</strong> {complaint.userType}</p>
                            <p><strong>Priority:</strong> {complaint.priority}</p>
                            <p><strong>Assigned To:</strong> {complaint.assignedTo}</p>
                          </div>
                        </div>
                        
                        {complaint.resolution && (
                          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <p className="text-sm"><strong>Resolution:</strong> {complaint.resolution}</p>
                          </div>
                        )}

                        <div className="space-y-3">
                          <Textarea 
                            placeholder="Add a response or internal note..." 
                            className="min-h-20"
                          />
                          <div className="flex items-center space-x-2">
                            <MedicalButton variant="medical" size="sm">
                              Send Response
                            </MedicalButton>
                            <MedicalButton variant="outline" size="sm">
                              Add Internal Note
                            </MedicalButton>
                            <Select>
                              <SelectTrigger className="w-40">
                                <SelectValue placeholder="Change Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="open">Open</SelectItem>
                                <SelectItem value="investigating">Investigating</SelectItem>
                                <SelectItem value="under-review">Under Review</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <MedicalCard variant="glass">
            <MedicalCardHeader>
              <MedicalCardTitle>Complaints by Category</MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="space-y-4">
                {categoryStats.map((category) => (
                  <div key={category.category} className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{category.category}</h3>
                      <Badge variant="outline">
                        {category.count} total
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Resolved</p>
                        <p className="text-green-600 font-bold">{category.resolved}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Pending</p>
                        <p className="text-yellow-600 font-bold">{category.pending}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Resolution Rate</p>
                        <p className="text-primary font-bold">{Math.round((category.resolved / category.count) * 100)}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <MedicalCard variant="glass">
            <MedicalCardHeader>
              <MedicalCardTitle>Resolution Performance Trends</MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="space-y-4">
                {resolutionTrends.map((trend) => (
                  <div key={trend.month} className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{trend.month}</h3>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Complaints Resolved</p>
                        <p className="text-2xl font-bold text-primary">{trend.resolved}</p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-muted-foreground">Average Resolution Time: 
                        <span className="text-primary font-medium ml-1">{trend.avgTime}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle>Complaint Sources</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Patients</span>
                    <span className="text-primary font-bold">65%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Doctors</span>
                    <span className="text-primary font-bold">25%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Hospitals</span>
                    <span className="text-primary font-bold">10%</span>
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>

            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle>Priority Distribution</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Critical</span>
                    <Badge variant="destructive">4</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>High</span>
                    <Badge variant="destructive">8</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Medium</span>
                    <Badge variant="secondary">12</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Low</span>
                    <Badge variant="outline">15</Badge>
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

export default ComplaintsManagement;