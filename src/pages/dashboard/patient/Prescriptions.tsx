import { useState } from "react";
import {
  Pill,
  Download,
  Eye,
  Search,
  User,
  RefreshCw,
  Sparkles,
  BookOpen
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const Prescriptions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);
  const [isExplainOpen, setIsExplainOpen] = useState(false);

  const prescriptions = [
    {
      id: 1,
      patientName: "Pritam Ghosh",
      medication: "Lisinopril 10mg",
      doctor: "Dr. Sarah Johnson",
      prescribedDate: "2024-01-15",
      validUntil: "2024-04-15",
      dosage: "Once daily",
      quantity: "30 tablets",
      refillsRemaining: 2,
      status: "active",
      condition: "Hypertension",
      instructions: "Take with food, preferably in the morning",
      explanation: "Lisinopril is an ACE inhibitor used to treat high blood pressure (hypertension) in adults and children 6 years of age and older. It works by relaxing blood vessels so blood can flow more easily."
    },
    {
      id: 2,
      patientName: "Pritam Ghosh",
      medication: "Metformin 500mg",
      doctor: "Dr. Michael Chen",
      prescribedDate: "2024-01-10",
      validUntil: "2024-07-10",
      dosage: "Twice daily",
      quantity: "60 tablets",
      refillsRemaining: 5,
      status: "active",
      condition: "Type 2 Diabetes",
      instructions: "Take with meals to reduce stomach upset",
      explanation: "Metformin is used to treat high blood sugar levels that are caused by type 2 diabetes. It helps your body respond better to insulin."
    },
    {
      id: 3,
      patientName: "Riya Ghosh",
      medication: "Amoxicillin 500mg",
      doctor: "Dr. Priya Sharma",
      prescribedDate: "2023-12-20",
      validUntil: "2023-12-27",
      dosage: "Three times daily",
      quantity: "21 capsules",
      refillsRemaining: 0,
      status: "expired",
      condition: "Bacterial Infection",
      instructions: "Complete the full course even if feeling better",
      explanation: "Amoxicillin is a penicillin antibiotic that fights bacteria. It is used to treat many different types of infection caused by bacteria, such as tonsillitis, bronchitis, pneumonia, and infections of the ear, nose, throat, skin, or urinary tract."
    },
    {
      id: 4,
      patientName: "Riya Ghosh",
      medication: "Atorvastatin 20mg",
      doctor: "Dr. Sarah Johnson",
      prescribedDate: "2024-01-08",
      validUntil: "2024-02-08",
      dosage: "Once daily",
      quantity: "30 tablets",
      refillsRemaining: 1,
      status: "expiring_soon",
      condition: "High Cholesterol",
      instructions: "Take in the evening with or without food",
      explanation: "Atorvastatin is used together with diet to lower blood levels of \"bad\" cholesterol (low-density lipoprotein, or LDL), to increase levels of \"good\" cholesterol (high-density lipoprotein, or HDL), and to lower triglycerides."
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "expired": return "secondary";
      case "expiring_soon": return "destructive";
      default: return "outline";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Active";
      case "expired": return "Expired";
      case "expiring_soon": return "Expiring Soon";
      default: return "Unknown";
    }
  };

  const filteredPrescriptions = prescriptions.filter(p =>
    p.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group prescriptions by patient name
  const groupedPrescriptions = filteredPrescriptions.reduce((acc, curr) => {
    (acc[curr.patientName] = acc[curr.patientName] || []).push(curr);
    return acc;
  }, {} as Record<string, typeof prescriptions>);

  const handleExplain = (prescription: any) => {
    setSelectedPrescription(prescription);
    setIsExplainOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-background p-3 sm:p-4 md:p-6 pb-20 sm:pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            <span className="gradient-text">My Prescriptions</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage family medications and prescriptions</p>
        </div>

        {/* Search */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by medication or patient name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10 sm:h-12 bg-background/50 backdrop-blur-sm"
          />
        </div>

        {/* Prescriptions List - Accordion Style */}
        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {Object.entries(groupedPrescriptions).length > 0 ? (
              Object.entries(groupedPrescriptions).map(([patientName, patientPrescriptions]) => (
                <AccordionItem
                  key={patientName}
                  value={patientName}
                  className="border border-border/50 rounded-xl bg-card/30 backdrop-blur-md overflow-hidden shadow-sm"
                >
                  <AccordionTrigger className="px-4 hover:no-underline bg-gradient-to-r from-primary/5 to-transparent">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-foreground">{patientName}</p>
                        <p className="text-xs text-muted-foreground">
                          {patientPrescriptions.length} Prescription{patientPrescriptions.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="pt-4 space-y-4">
                      {patientPrescriptions.map((prescription) => (
                        <MedicalCard key={prescription.id} variant="glass" className="bg-background/40 hover:bg-background/60 transition-colors">
                          <MedicalCardHeader className="pb-3">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-start space-x-3 flex-1">
                                <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0">
                                  <Pill className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <MedicalCardTitle className="text-base sm:text-lg mb-1 flex flex-col sm:flex-row sm:items-center gap-2">
                                    <span className="truncate">{prescription.medication}</span>
                                    <Badge
                                      variant={getStatusColor(prescription.status)}
                                      className="self-start sm:self-center text-[10px] px-2 py-0.5 h-5"
                                    >
                                      {getStatusText(prescription.status)}
                                    </Badge>
                                  </MedicalCardTitle>
                                  <p className="text-sm text-muted-foreground mb-1">
                                    For: {prescription.condition}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </MedicalCardHeader>
                          <MedicalCardContent className="pt-0">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-2 gap-x-4 text-sm mb-4">
                              <div>
                                <span className="text-xs text-muted-foreground block">Dosage</span>
                                <span className="font-medium">{prescription.dosage}</span>
                              </div>
                              <div>
                                <span className="text-xs text-muted-foreground block">Quantity</span>
                                <span className="font-medium">{prescription.quantity}</span>
                              </div>
                              <div>
                                <span className="text-xs text-muted-foreground block">Prescribed By</span>
                                <span className="font-medium">{prescription.doctor}</span>
                              </div>
                              <div>
                                <span className="text-xs text-muted-foreground block">Valid Until</span>
                                <span className="font-medium">{new Date(prescription.validUntil).toLocaleDateString()}</span>
                              </div>
                            </div>

                            <div className="bg-muted/30 rounded-lg p-3 mb-4 border border-border/50">
                              <p className="text-sm">
                                <span className="font-medium text-foreground">Instructions:</span> {prescription.instructions}
                              </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-2">
                              {/* New Explainer Button */}
                              <MedicalButton
                                variant="medical"
                                size="sm"
                                className="flex-1 sm:flex-none"
                                onClick={() => handleExplain(prescription)}
                              >
                                <Sparkles className="mr-2 h-4 w-4" />
                                Explain Med
                              </MedicalButton>

                              <MedicalButton variant="outline" size="sm" className="flex-1 sm:flex-none">
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </MedicalButton>
                              <MedicalButton variant="outline" size="sm" className="flex-1 sm:flex-none">
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                              </MedicalButton>
                              {prescription.status === "active" && prescription.refillsRemaining > 0 && (
                                <MedicalButton variant="secondary" size="sm" className="flex-1 sm:flex-none">
                                  <RefreshCw className="mr-2 h-4 w-4" />
                                  Refill
                                </MedicalButton>
                              )}
                            </div>
                          </MedicalCardContent>
                        </MedicalCard>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="bg-muted/30 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <Pill className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No prescriptions found</h3>
                <p className="text-muted-foreground">Try searching for a different medication or patient.</p>
              </div>
            )}
          </Accordion>
        </div>
      </div>

      <Dialog open={isExplainOpen} onOpenChange={setIsExplainOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Simplified Explanation
            </DialogTitle>
            <DialogDescription>
              AI-generated explanation for {selectedPrescription?.medication}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-primary/5 p-4 rounded-xl border border-primary/20">
              <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                What is this?
              </h4>
              <p className="text-sm leading-relaxed text-foreground/80">
                {selectedPrescription?.explanation}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider text-[10px]">Easy Instructions</h4>
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="h-6 w-6 rounded-full bg-green-500/20 text-green-600 flex items-center justify-center text-xs font-bold shrink-0">1</div>
                <p className="text-sm">{selectedPrescription?.instructions}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <MedicalButton onClick={() => setIsExplainOpen(false)}>
              Got it, thanks!
            </MedicalButton>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNavigation userRole="patient" />
    </div>
  );
};

export default Prescriptions;