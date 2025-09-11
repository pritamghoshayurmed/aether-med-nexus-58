import { useState } from "react";
import { 
  Brain, 
  Upload, 
  Activity, 
  FileText, 
  Zap, 
  Eye,
  Download,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Scan
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Badge } from "@/components/ui/badge";
import BottomNavigation from "@/components/navigation/BottomNavigation";

interface AnalysisResult {
  id: string;
  type: "ecg" | "xray" | "mri" | "ct";
  patientName: string;
  uploadTime: string;
  status: "processing" | "completed" | "review-needed";
  confidence: number;
  findings: string[];
  priority: "low" | "medium" | "high" | "critical";
}

const AIAnalytics = () => {
  const [activeTab, setActiveTab] = useState<"upload" | "results">("upload");
  const [dragActive, setDragActive] = useState(false);

  const analysisResults: AnalysisResult[] = [
    {
      id: "1",
      type: "ecg",
      patientName: "Alice Johnson",
      uploadTime: "2024-01-20 10:30:00",
      status: "completed",
      confidence: 94,
      findings: [
        "Normal sinus rhythm detected",
        "Heart rate: 72 BPM (Normal)",
        "No significant arrhythmias detected",
        "PR interval: 160ms (Normal)"
      ],
      priority: "low"
    },
    {
      id: "2",
      type: "xray", 
      patientName: "Michael Brown",
      uploadTime: "2024-01-20 09:15:00",
      status: "review-needed",
      confidence: 87,
      findings: [
        "Possible pneumonia in right lower lobe",
        "Increased opacity in lung field",
        "Recommend clinical correlation",
        "Consider CT scan for confirmation"
      ],
      priority: "high"
    },
    {
      id: "3",
      type: "ecg",
      patientName: "Robert Davis",
      uploadTime: "2024-01-20 08:45:00", 
      status: "completed",
      confidence: 78,
      findings: [
        "Atrial fibrillation detected",
        "Irregular R-R intervals",
        "Ventricular rate: 95 BPM",
        "Recommend anticoagulation assessment"
      ],
      priority: "critical"
    }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file upload
      console.log("Files dropped:", e.dataTransfer.files);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ecg": return <Activity className="h-5 w-5" />;
      case "xray": return <Scan className="h-5 w-5" />;
      case "mri": return <Brain className="h-5 w-5" />;
      case "ct": return <Eye className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "processing": return <Zap className="h-4 w-4 text-blue-500 animate-pulse" />;
      case "review-needed": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="gradient-text">AI Medical Analysis</span>
            </h1>
            <p className="text-muted-foreground">ECG & X-ray analysis powered by artificial intelligence</p>
          </div>
          <div className="flex space-x-2">
            <MedicalButton
              variant={activeTab === "upload" ? "medical" : "outline"}
              onClick={() => setActiveTab("upload")}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload & Analyze
            </MedicalButton>
            <MedicalButton
              variant={activeTab === "results" ? "medical" : "outline"}
              onClick={() => setActiveTab("results")}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              View Results
            </MedicalButton>
          </div>
        </div>

        {activeTab === "upload" && (
          <div className="space-y-6">
            {/* Upload Section */}
            <MedicalCard variant="glass" className="medical-glow">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <Brain className="mr-2 h-5 w-5 text-primary" />
                  AI Analysis Upload
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* ECG Upload */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Activity className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">ECG Analysis</h3>
                    <p className="text-muted-foreground mb-4">
                      Upload ECG files for AI-powered cardiac rhythm analysis
                    </p>
                    <MedicalButton variant="medical">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload ECG
                    </MedicalButton>
                    <p className="text-xs text-muted-foreground mt-2">
                      Supports: PDF, JPG, PNG, DICOM
                    </p>
                  </div>

                  {/* X-Ray Upload */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Scan className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">X-Ray Analysis</h3>
                    <p className="text-muted-foreground mb-4">
                      Upload chest X-rays for AI-assisted radiology screening
                    </p>
                    <MedicalButton variant="medical">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload X-Ray
                    </MedicalButton>
                    <p className="text-xs text-muted-foreground mt-2">
                      Supports: DICOM, JPG, PNG, TIFF
                    </p>
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>

            {/* AI Features */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle>AI Analysis Features</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-muted/30">
                    <Zap className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">Real-time Analysis</h3>
                    <p className="text-sm text-muted-foreground">
                      Get instant AI-powered insights within seconds of upload
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <Eye className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">Pattern Recognition</h3>
                    <p className="text-sm text-muted-foreground">
                      Advanced algorithms detect subtle patterns and anomalies
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30">
                    <TrendingUp className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">Confidence Scoring</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive confidence levels for all AI-generated findings
                    </p>
                  </div>
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>
        )}

        {activeTab === "results" && (
          <div className="space-y-6">
            {/* Analysis Results */}
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle>Recent Analysis Results</MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  {analysisResults.map((result) => (
                    <div 
                      key={result.id}
                      className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                            {getTypeIcon(result.type)}
                          </div>
                          <div>
                            <h3 className="font-semibold">{result.patientName}</h3>
                            <p className="text-sm text-muted-foreground">
                              {result.type.toUpperCase()} • {new Date(result.uploadTime).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">
                            {result.confidence}% confidence
                          </Badge>
                          <div className={`w-3 h-3 rounded-full ${getPriorityColor(result.priority)}`} />
                          {getStatusIcon(result.status)}
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <h4 className="text-sm font-medium">AI Findings:</h4>
                        {result.findings.map((finding, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground">{finding}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        <MedicalButton variant="outline" size="sm">
                          <Eye className="mr-1 h-3 w-3" />
                          View Details
                        </MedicalButton>
                        <MedicalButton variant="outline" size="sm">
                          <Download className="mr-1 h-3 w-3" />
                          Export Report
                        </MedicalButton>
                        {result.status === "review-needed" && (
                          <MedicalButton variant="medical" size="sm">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Review & Approve
                          </MedicalButton>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>
        )}
      </div>

      <BottomNavigation userRole="doctor" />
    </div>
  );
};

export default AIAnalytics;