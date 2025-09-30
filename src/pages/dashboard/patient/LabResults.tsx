import { useState } from "react";
import { 
  TestTube, 
  Download, 
  Eye, 
  Search, 
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Share,
  FileText,
  Activity
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const LabResults = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTest, setSelectedTest] = useState<number | null>(null);

  const labTests = [
    {
      id: 1,
      name: "Complete Blood Count (CBC)",
      date: "2024-01-20",
      status: "completed",
      laboratory: "City Diagnostics Lab",
      doctor: "Dr. Sarah Johnson",
      category: "Hematology",
      results: [
        { parameter: "Hemoglobin", value: "14.2", unit: "g/dL", range: "12.0-16.0", status: "normal" },
        { parameter: "RBC Count", value: "4.8", unit: "million/μL", range: "4.2-5.4", status: "normal" },
        { parameter: "WBC Count", value: "8.5", unit: "thousand/μL", range: "4.0-11.0", status: "normal" },
        { parameter: "Platelet Count", value: "250", unit: "thousand/μL", range: "150-400", status: "normal" },
        { parameter: "Hematocrit", value: "42", unit: "%", range: "36-46", status: "normal" }
      ]
    },
    {
      id: 2,
      name: "Lipid Profile",
      date: "2024-01-18",
      status: "completed",
      laboratory: "HealthCare Labs",
      doctor: "Dr. Michael Chen",
      category: "Biochemistry",
      results: [
        { parameter: "Total Cholesterol", value: "210", unit: "mg/dL", range: "<200", status: "high" },
        { parameter: "HDL Cholesterol", value: "45", unit: "mg/dL", range: ">40", status: "normal" },
        { parameter: "LDL Cholesterol", value: "140", unit: "mg/dL", range: "<100", status: "high" },
        { parameter: "Triglycerides", value: "150", unit: "mg/dL", range: "<150", status: "normal" },
        { parameter: "VLDL", value: "30", unit: "mg/dL", range: "<30", status: "normal" }
      ]
    },
    {
      id: 3,
      name: "Blood Glucose Test",
      date: "2024-01-15",
      status: "completed",
      laboratory: "City Diagnostics Lab",
      doctor: "Dr. Priya Sharma",
      category: "Biochemistry",
      results: [
        { parameter: "Fasting Blood Sugar", value: "105", unit: "mg/dL", range: "70-100", status: "high" },
        { parameter: "HbA1c", value: "6.2", unit: "%", range: "<5.7", status: "high" },
        { parameter: "Random Blood Sugar", value: "145", unit: "mg/dL", range: "<140", status: "high" }
      ]
    },
    {
      id: 4,
      name: "Thyroid Function Test",
      date: "2024-01-10",
      status: "completed",
      laboratory: "MediScan Labs",
      doctor: "Dr. Sarah Johnson",
      category: "Endocrinology",
      results: [
        { parameter: "TSH", value: "2.5", unit: "μIU/mL", range: "0.4-4.0", status: "normal" },
        { parameter: "T3", value: "1.2", unit: "ng/mL", range: "0.8-2.0", status: "normal" },
        { parameter: "T4", value: "8.5", unit: "μg/dL", range: "4.5-12.0", status: "normal" }
      ]
    },
    {
      id: 5,
      name: "Kidney Function Test",
      date: "2024-01-05",
      status: "completed",
      laboratory: "HealthCare Labs",
      doctor: "Dr. Michael Chen",
      category: "Biochemistry",
      results: [
        { parameter: "Creatinine", value: "0.9", unit: "mg/dL", range: "0.7-1.3", status: "normal" },
        { parameter: "Blood Urea", value: "25", unit: "mg/dL", range: "7-20", status: "high" },
        { parameter: "Uric Acid", value: "5.5", unit: "mg/dL", range: "3.5-7.2", status: "normal" }
      ]
    }
  ];

  const upcomingTests = [
    {
      id: 1,
      name: "Vitamin D Test",
      date: "2024-01-25",
      laboratory: "City Diagnostics Lab",
      status: "scheduled"
    },
    {
      id: 2,
      name: "Liver Function Test",
      date: "2024-01-28",
      laboratory: "HealthCare Labs",
      status: "scheduled"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "normal":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "high":
      case "low":
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case "critical":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-success";
      case "high":
      case "low":
        return "text-warning";
      case "critical":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getTrendIcon = (status: string) => {
    if (status === "high") return <TrendingUp className="h-4 w-4" />;
    if (status === "low") return <TrendingDown className="h-4 w-4" />;
    return null;
  };

  const filteredTests = labTests.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.laboratory.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || test.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-background p-3 sm:p-4 md:p-6 pb-20 sm:pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            <span className="gradient-text">Lab Results</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            View and track your laboratory test results
          </p>
        </div>

        <Tabs defaultValue="all" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="all" className="text-xs sm:text-sm min-h-[44px]">
              All Results
            </TabsTrigger>
            <TabsTrigger value="upcoming" className="text-xs sm:text-sm min-h-[44px]">
              Upcoming Tests
            </TabsTrigger>
            <TabsTrigger value="trends" className="text-xs sm:text-sm min-h-[44px]">
              Trends
            </TabsTrigger>
          </TabsList>

          {/* All Results Tab */}
          <TabsContent value="all" className="space-y-4 sm:space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search lab tests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 min-h-[44px]"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[200px] min-h-[44px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Hematology">Hematology</SelectItem>
                  <SelectItem value="Biochemistry">Biochemistry</SelectItem>
                  <SelectItem value="Endocrinology">Endocrinology</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Lab Tests List */}
            <div className="space-y-4">
              {filteredTests.map((test) => (
                <MedicalCard 
                  key={test.id} 
                  variant="glass"
                  className="cursor-pointer hover:shadow-medical transition-all"
                  onClick={() => setSelectedTest(selectedTest === test.id ? null : test.id)}
                >
                  <MedicalCardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <MedicalCardTitle className="text-base sm:text-lg mb-2">
                          {test.name}
                        </MedicalCardTitle>
                        <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(test.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <TestTube className="w-3 h-3 mr-1" />
                            {test.laboratory}
                          </span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {test.category}
                      </Badge>
                    </div>
                  </MedicalCardHeader>
                  
                  {selectedTest === test.id && (
                    <MedicalCardContent className="p-4 sm:p-6 space-y-4">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <MedicalButton variant="medical" size="sm" className="flex-1 sm:flex-initial min-h-[40px]">
                          <Eye className="mr-2 h-4 w-4" />
                          View Full Report
                        </MedicalButton>
                        <MedicalButton variant="outline" size="sm" className="flex-1 sm:flex-initial min-h-[40px]">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </MedicalButton>
                        <MedicalButton variant="outline" size="sm" className="flex-1 sm:flex-initial min-h-[40px]">
                          <Share className="mr-2 h-4 w-4" />
                          Share
                        </MedicalButton>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm">Test Parameters</h4>
                        {test.results.map((result, index) => (
                          <div key={index} className="bg-background/50 rounded-lg p-3 sm:p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <p className="font-medium text-sm sm:text-base">{result.parameter}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Normal Range: {result.range} {result.unit}
                                </p>
                              </div>
                              {getStatusIcon(result.status)}
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className={`text-lg sm:text-xl font-bold ${getStatusColor(result.status)}`}>
                                {result.value} {result.unit}
                              </span>
                              <div className="flex items-center space-x-2">
                                {getTrendIcon(result.status)}
                                <Badge 
                                  variant={result.status === "normal" ? "default" : "secondary"}
                                  className="text-xs"
                                >
                                  {result.status.toUpperCase()}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium">Prescribed by:</span> {test.doctor}
                        </p>
                      </div>
                    </MedicalCardContent>
                  )}
                </MedicalCard>
              ))}
            </div>
          </TabsContent>

          {/* Upcoming Tests Tab */}
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingTests.map((test) => (
              <MedicalCard key={test.id} variant="glass">
                <MedicalCardContent className="p-4 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <TestTube className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base sm:text-lg mb-1">{test.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {test.laboratory}
                        </p>
                        <div className="flex items-center text-sm">
                          <Calendar className="w-4 h-4 mr-1 text-primary" />
                          <span className="font-medium">
                            {new Date(test.date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">Scheduled</Badge>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <MedicalButton variant="outline" size="sm" className="flex-1 sm:flex-initial min-h-[40px]">
                      Reschedule
                    </MedicalButton>
                    <MedicalButton variant="outline" size="sm" className="flex-1 sm:flex-initial min-h-[40px]">
                      Cancel
                    </MedicalButton>
                  </div>
                </MedicalCardContent>
              </MedicalCard>
            ))}
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-4 sm:space-y-6">
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="text-base sm:text-lg">Health Trends</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent className="p-4 sm:p-6">
                <div className="space-y-6">
                  {/* Blood Sugar Trend */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-sm sm:text-base">Blood Sugar Level</h4>
                      <Badge variant="secondary">Last 6 months</Badge>
                    </div>
                    <div className="bg-background/50 rounded-lg p-4 sm:p-6 h-32 sm:h-40 flex items-center justify-center">
                      <Activity className="h-12 w-12 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground ml-4">Chart visualization coming soon</p>
                    </div>
                  </div>

                  {/* Cholesterol Trend */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-sm sm:text-base">Cholesterol Level</h4>
                      <Badge variant="secondary">Last 6 months</Badge>
                    </div>
                    <div className="bg-background/50 rounded-lg p-4 sm:p-6 h-32 sm:h-40 flex items-center justify-center">
                      <Activity className="h-12 w-12 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground ml-4">Chart visualization coming soon</p>
                    </div>
                  </div>
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

export default LabResults;
