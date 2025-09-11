import { useState } from "react";
import { 
  FileText, 
  Download, 
  Eye, 
  Search, 
  Filter,
  Calendar,
  User,
  Heart,
  TestTube,
  Pill,
  Stethoscope,
  Upload,
  Share
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const MedicalRecords = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const medicalRecords = [
    {
      id: 1,
      title: "Cardiology Consultation Report",
      type: "consultation",
      doctor: "Dr. Sarah Johnson",
      date: "2024-01-15",
      category: "Cardiology",
      size: "2.4 MB",
      icon: Heart,
      description: "Comprehensive cardiac evaluation and ECG results",
      urgent: false
    },
    {
      id: 2,
      title: "Blood Test Results - Complete Panel",
      type: "lab_report",
      doctor: "Dr. Michael Chen",
      date: "2024-01-10",
      category: "Laboratory",
      size: "1.2 MB",
      icon: TestTube,
      description: "Complete blood count, lipid profile, and liver function tests",
      urgent: true
    },
    {
      id: 3,
      title: "Prescription - Hypertension Medication",
      type: "prescription",
      doctor: "Dr. Sarah Johnson",
      date: "2024-01-08",
      category: "Pharmacy",
      size: "0.8 MB",
      icon: Pill,
      description: "Monthly prescription for blood pressure medication",
      urgent: false
    },
    {
      id: 4,
      title: "Annual Physical Examination",
      type: "examination",
      doctor: "Dr. Michael Chen",
      date: "2024-01-05",
      category: "General Medicine",
      size: "3.1 MB",
      icon: Stethoscope,
      description: "Complete physical examination with vital signs and assessments",
      urgent: false
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: "New lab results uploaded",
      doctor: "Dr. Michael Chen",
      time: "2 hours ago",
      type: "upload"
    },
    {
      id: 2,
      action: "Prescription updated",
      doctor: "Dr. Sarah Johnson",
      time: "1 day ago",
      type: "update"
    },
    {
      id: 3,
      action: "Report shared with specialist",
      doctor: "Dr. Priya Sharma",
      time: "3 days ago",
      type: "share"
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      date: "Tomorrow, 2:30 PM",
      type: "Follow-up"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen", 
      specialty: "General Medicine",
      date: "Dec 20, 10:00 AM",
      type: "Routine Check-up"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "consultation": return Heart;
      case "lab_report": return TestTube;
      case "prescription": return Pill;
      case "examination": return Stethoscope;
      default: return FileText;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "consultation": return "default";
      case "lab_report": return "secondary";
      case "prescription": return "outline";
      case "examination": return "default";
      default: return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4 md:p-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text">Medical Records</span>
          </h1>
          <p className="text-muted-foreground">Access and manage your health documents</p>
        </div>

        <Tabs defaultValue="records" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="records">Medical Records</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="appointments">Upcoming</TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search medical records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="laboratory">Laboratory</SelectItem>
                  <SelectItem value="pharmacy">Pharmacy</SelectItem>
                  <SelectItem value="general">General Medicine</SelectItem>
                </SelectContent>
              </Select>
              <MedicalButton variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </MedicalButton>
              <MedicalButton variant="medical">
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </MedicalButton>
            </div>

            {/* Records Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {medicalRecords.map((record) => {
                const IconComponent = getTypeIcon(record.type);
                return (
                  <MedicalCard key={record.id} variant="glass">
                    <MedicalCardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <IconComponent className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <MedicalCardTitle className="text-base mb-1">
                              {record.title}
                              {record.urgent && (
                                <Badge variant="destructive" className="ml-2 text-xs">
                                  Urgent
                                </Badge>
                              )}
                            </MedicalCardTitle>
                            <p className="text-sm text-muted-foreground mb-2">
                              {record.description}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <User className="h-3 w-3" />
                                <span>{record.doctor}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(record.date).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Badge variant={getTypeBadgeColor(record.type)} className="text-xs">
                          {record.category}
                        </Badge>
                      </div>
                    </MedicalCardHeader>
                    <MedicalCardContent>
                      <div className="flex items-center justify-between pt-4 border-t border-border/50">
                        <span className="text-sm text-muted-foreground">
                          Size: {record.size}
                        </span>
                        <div className="flex items-center space-x-2">
                          <MedicalButton variant="outline" size="sm">
                            <Eye className="mr-1 h-4 w-4" />
                            View
                          </MedicalButton>
                          <MedicalButton variant="outline" size="sm">
                            <Download className="mr-1 h-4 w-4" />
                            Download
                          </MedicalButton>
                          <MedicalButton variant="outline" size="sm">
                            <Share className="mr-1 h-4 w-4" />
                            Share
                          </MedicalButton>
                        </div>
                      </div>
                    </MedicalCardContent>
                  </MedicalCard>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle>Recent Activity</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/30">
                      <div className="p-2 rounded-full bg-primary/10">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">by {activity.doctor}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle>Upcoming Appointments</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div>
                        <h4 className="font-medium">{appointment.doctor}</h4>
                        <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                        <p className="text-sm text-primary">{appointment.date}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-xs mb-2">
                          {appointment.type}
                        </Badge>
                        <div>
                          <MedicalButton variant="medical" size="sm">
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
        </Tabs>
      </div>

      <BottomNavigation userRole="patient" />
    </div>
  );
};

export default MedicalRecords;