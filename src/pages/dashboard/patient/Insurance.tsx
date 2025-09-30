import { useState } from "react";
import { 
  Shield, 
  Plus, 
  Edit, 
  Trash, 
  FileText, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Download,
  Upload,
  Building2,
  Phone,
  Mail,
  Clock,
  DollarSign
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const Insurance = () => {
  const [isAddingInsurance, setIsAddingInsurance] = useState(false);

  const insurancePolicies = [
    {
      id: 1,
      provider: "Apollo Munich Health Insurance",
      policyNumber: "AHI/2023/12345",
      type: "Family Floater",
      coverageAmount: "₹10,00,000",
      premium: "₹15,000/year",
      startDate: "2023-04-01",
      expiryDate: "2024-03-31",
      status: "active",
      members: ["Self", "Spouse", "2 Children"],
      features: [
        "Cashless hospitalization",
        "Pre and Post hospitalization",
        "Daycare procedures",
        "Maternity coverage"
      ]
    },
    {
      id: 2,
      provider: "Star Health Insurance",
      policyNumber: "SHI/2023/67890",
      type: "Individual",
      coverageAmount: "₹5,00,000",
      premium: "₹8,000/year",
      startDate: "2023-06-15",
      expiryDate: "2024-06-14",
      status: "active",
      members: ["Self"],
      features: [
        "Cashless hospitalization",
        "Health check-up",
        "Ambulance charges",
        "Domiciliary hospitalization"
      ]
    }
  ];

  const claims = [
    {
      id: 1,
      claimNumber: "CLM2024/001",
      policyProvider: "Apollo Munich Health Insurance",
      claimDate: "2024-01-15",
      claimAmount: "₹45,000",
      approvedAmount: "₹45,000",
      status: "approved",
      hospital: "City General Hospital",
      treatmentType: "Hospitalization",
      description: "Emergency appendectomy"
    },
    {
      id: 2,
      claimNumber: "CLM2024/002",
      policyProvider: "Star Health Insurance",
      claimDate: "2024-01-10",
      claimAmount: "₹12,000",
      approvedAmount: "₹10,500",
      status: "partially_approved",
      hospital: "Max Healthcare",
      treatmentType: "Outpatient",
      description: "Diagnostic tests and consultation"
    },
    {
      id: 3,
      claimNumber: "CLM2024/003",
      policyProvider: "Apollo Munich Health Insurance",
      claimDate: "2024-01-05",
      claimAmount: "₹8,000",
      approvedAmount: null,
      status: "pending",
      hospital: "Apollo Hospital",
      treatmentType: "Pharmacy",
      description: "Prescription medications"
    }
  ];

  const networkHospitals = [
    {
      id: 1,
      name: "City General Hospital",
      distance: "2.1 km",
      type: "Multi-specialty",
      cashless: true,
      rating: 4.8,
      policies: ["Apollo Munich", "Star Health"]
    },
    {
      id: 2,
      name: "Apollo Hospital",
      distance: "3.5 km",
      type: "Multi-specialty",
      cashless: true,
      rating: 4.9,
      policies: ["Apollo Munich"]
    },
    {
      id: 3,
      name: "Max Healthcare",
      distance: "4.2 km",
      type: "Multi-specialty",
      cashless: true,
      rating: 4.7,
      policies: ["Star Health", "Apollo Munich"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "approved":
        return "default";
      case "partially_approved":
        return "secondary";
      case "pending":
        return "secondary";
      case "rejected":
        return "destructive";
      case "expired":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
      case "approved":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "partially_approved":
      case "pending":
        return <Clock className="h-4 w-4 text-warning" />;
      case "rejected":
      case "expired":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background p-3 sm:p-4 md:p-6 pb-20 sm:pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              <span className="gradient-text">Health Insurance</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Manage your insurance policies and claims
            </p>
          </div>
          <Dialog open={isAddingInsurance} onOpenChange={setIsAddingInsurance}>
            <DialogTrigger asChild>
              <MedicalButton variant="medical" className="min-h-[44px]">
                <Plus className="mr-2 h-4 w-4" />
                Add Policy
              </MedicalButton>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add Insurance Policy</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="provider">Insurance Provider</Label>
                  <Input id="provider" placeholder="Enter provider name" className="mt-1.5 min-h-[44px]" />
                </div>
                <div>
                  <Label htmlFor="policyNumber">Policy Number</Label>
                  <Input id="policyNumber" placeholder="Enter policy number" className="mt-1.5 min-h-[44px]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="date" className="mt-1.5 min-h-[44px]" />
                  </div>
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input id="expiryDate" type="date" className="mt-1.5 min-h-[44px]" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="coverage">Coverage Amount</Label>
                  <Input id="coverage" placeholder="₹ 0" className="mt-1.5 min-h-[44px]" />
                </div>
                <MedicalButton className="w-full min-h-[44px]">
                  Add Policy
                </MedicalButton>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="policies" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="policies" className="text-xs sm:text-sm min-h-[44px]">
              My Policies
            </TabsTrigger>
            <TabsTrigger value="claims" className="text-xs sm:text-sm min-h-[44px]">
              Claims
            </TabsTrigger>
            <TabsTrigger value="network" className="text-xs sm:text-sm min-h-[44px]">
              Network Hospitals
            </TabsTrigger>
          </TabsList>

          {/* Policies Tab */}
          <TabsContent value="policies" className="space-y-4">
            {insurancePolicies.map((policy) => (
              <MedicalCard key={policy.id} variant="glass">
                <MedicalCardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Shield className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <MedicalCardTitle className="text-base sm:text-lg mb-2">
                          {policy.provider}
                        </MedicalCardTitle>
                        <p className="text-sm text-muted-foreground">
                          Policy: {policy.policyNumber}
                        </p>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(policy.status)}>
                      {policy.status.toUpperCase()}
                    </Badge>
                  </div>
                </MedicalCardHeader>
                <MedicalCardContent className="p-4 sm:p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Policy Type</p>
                      <p className="font-semibold">{policy.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Coverage</p>
                      <p className="font-semibold text-primary">{policy.coverageAmount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Premium</p>
                      <p className="font-semibold">{policy.premium}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Valid Until</p>
                      <p className="font-semibold">
                        {new Date(policy.expiryDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm font-semibold mb-2">Covered Members</p>
                    <div className="flex flex-wrap gap-2">
                      {policy.members.map((member, index) => (
                        <Badge key={index} variant="secondary">{member}</Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm font-semibold mb-2">Key Features</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {policy.features.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-4">
                    <MedicalButton variant="medical" size="sm" className="flex-1 sm:flex-initial min-h-[40px]">
                      <FileText className="mr-2 h-4 w-4" />
                      View Details
                    </MedicalButton>
                    <MedicalButton variant="outline" size="sm" className="flex-1 sm:flex-initial min-h-[40px]">
                      <Download className="mr-2 h-4 w-4" />
                      Download Card
                    </MedicalButton>
                    <MedicalButton variant="outline" size="sm" className="flex-1 sm:flex-initial min-h-[40px]">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </MedicalButton>
                  </div>
                </MedicalCardContent>
              </MedicalCard>
            ))}
          </TabsContent>

          {/* Claims Tab */}
          <TabsContent value="claims" className="space-y-4">
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center justify-between text-base sm:text-lg">
                  <span>Recent Claims</span>
                  <MedicalButton variant="medical" size="sm" className="min-h-[40px]">
                    <Plus className="mr-2 h-4 w-4" />
                    New Claim
                  </MedicalButton>
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent className="p-4 sm:p-6 space-y-4">
                {claims.map((claim) => (
                  <div key={claim.id} className="bg-background/50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-semibold text-sm sm:text-base">{claim.claimNumber}</p>
                          {getStatusIcon(claim.status)}
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {claim.policyProvider}
                        </p>
                      </div>
                      <Badge variant={getStatusColor(claim.status)} className="text-xs">
                        {claim.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Hospital:</span>
                        <span className="font-medium">{claim.hospital}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Treatment:</span>
                        <span className="font-medium">{claim.treatmentType}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Claim Date:</span>
                        <span className="font-medium">
                          {new Date(claim.claimDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Claimed Amount:</span>
                        <span className="font-semibold text-primary">{claim.claimAmount}</span>
                      </div>
                      {claim.approvedAmount && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Approved Amount:</span>
                          <span className="font-semibold text-success">{claim.approvedAmount}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">{claim.description}</p>

                    <div className="flex flex-wrap gap-2">
                      <MedicalButton variant="outline" size="sm" className="flex-1 sm:flex-initial min-h-[40px]">
                        <FileText className="mr-2 h-4 w-4" />
                        View Details
                      </MedicalButton>
                      <MedicalButton variant="outline" size="sm" className="flex-1 sm:flex-initial min-h-[40px]">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Documents
                      </MedicalButton>
                    </div>
                  </div>
                ))}
              </MedicalCardContent>
            </MedicalCard>
          </TabsContent>

          {/* Network Hospitals Tab */}
          <TabsContent value="network" className="space-y-4">
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="text-base sm:text-lg">
                  Network Hospitals Near You
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent className="p-4 sm:p-6 space-y-4">
                {networkHospitals.map((hospital) => (
                  <div key={hospital.id} className="bg-background/50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm sm:text-base mb-1">
                            {hospital.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {hospital.type} • {hospital.distance}
                          </p>
                        </div>
                      </div>
                      {hospital.cashless && (
                        <Badge variant="default" className="text-xs">
                          Cashless
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {hospital.policies.map((policy, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {policy}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <MedicalButton variant="outline" size="sm" className="flex-1 sm:flex-initial min-h-[40px]">
                        <Phone className="mr-2 h-4 w-4" />
                        Call
                      </MedicalButton>
                      <MedicalButton variant="outline" size="sm" className="flex-1 sm:flex-initial min-h-[40px]">
                        <FileText className="mr-2 h-4 w-4" />
                        View Details
                      </MedicalButton>
                    </div>
                  </div>
                ))}
              </MedicalCardContent>
            </MedicalCard>
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation userRole="patient" />
    </div>
  );
};

export default Insurance;
