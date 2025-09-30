import { useState } from "react";
import { 
  CreditCard, 
  Download, 
  Eye, 
  Search, 
  Filter,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  DollarSign,
  Wallet
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const Billing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const bills = [
    {
      id: 1,
      billNumber: "INV/2024/001",
      date: "2024-01-20",
      hospital: "City General Hospital",
      doctor: "Dr. Sarah Johnson",
      service: "Consultation & Tests",
      amount: 2500,
      paidAmount: 2500,
      status: "paid",
      paymentMethod: "Credit Card",
      insuranceCovered: 0,
      dueDate: null
    },
    {
      id: 2,
      billNumber: "INV/2024/002",
      date: "2024-01-18",
      hospital: "Apollo Hospital",
      doctor: "Dr. Michael Chen",
      service: "Surgery - Appendectomy",
      amount: 45000,
      paidAmount: 0,
      status: "pending",
      paymentMethod: null,
      insuranceCovered: 45000,
      dueDate: "2024-02-18"
    },
    {
      id: 3,
      billNumber: "INV/2024/003",
      date: "2024-01-15",
      hospital: "Max Healthcare",
      doctor: "Dr. Priya Sharma",
      service: "Diagnostic Tests",
      amount: 3500,
      paidAmount: 3500,
      status: "paid",
      paymentMethod: "UPI",
      insuranceCovered: 0,
      dueDate: null
    },
    {
      id: 4,
      billNumber: "INV/2024/004",
      date: "2024-01-10",
      hospital: "HealthCare Labs",
      doctor: "Dr. Sarah Johnson",
      service: "Laboratory Tests",
      amount: 1200,
      paidAmount: 0,
      status: "overdue",
      paymentMethod: null,
      insuranceCovered: 0,
      dueDate: "2024-01-25"
    },
    {
      id: 5,
      billNumber: "INV/2024/005",
      date: "2024-01-05",
      hospital: "City General Hospital",
      doctor: "Dr. Michael Chen",
      service: "Follow-up Consultation",
      amount: 800,
      paidAmount: 800,
      status: "paid",
      paymentMethod: "Debit Card",
      insuranceCovered: 0,
      dueDate: null
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: "Credit Card",
      last4: "4242",
      expiry: "12/25",
      isPrimary: true
    },
    {
      id: 2,
      type: "UPI",
      upiId: "sarah@okaxis",
      isPrimary: false
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "pending":
        return <Clock className="h-4 w-4 text-warning" />;
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "default";
      case "pending":
        return "secondary";
      case "overdue":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || bill.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const totalPending = bills
    .filter(b => b.status === "pending" || b.status === "overdue")
    .reduce((sum, b) => sum + (b.amount - b.paidAmount), 0);

  const totalPaid = bills
    .filter(b => b.status === "paid")
    .reduce((sum, b) => sum + b.paidAmount, 0);

  return (
    <div className="min-h-screen bg-gradient-background p-3 sm:p-4 md:p-6 pb-20 sm:pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            <span className="gradient-text">Billing & Payments</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage your medical bills and payment methods
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Paid</p>
                  <p className="text-2xl sm:text-3xl font-bold text-success">
                    ₹{totalPaid.toLocaleString()}
                  </p>
                </div>
                <div className="bg-success/10 p-3 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
              </div>
            </MedicalCardContent>
          </MedicalCard>

          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pending</p>
                  <p className="text-2xl sm:text-3xl font-bold text-warning">
                    ₹{totalPending.toLocaleString()}
                  </p>
                </div>
                <div className="bg-warning/10 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
              </div>
            </MedicalCardContent>
          </MedicalCard>

          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Bills</p>
                  <p className="text-2xl sm:text-3xl font-bold">{bills.length}</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </div>

        <Tabs defaultValue="bills" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="bills" className="text-xs sm:text-sm min-h-[44px]">
              Bills & Invoices
            </TabsTrigger>
            <TabsTrigger value="payment-methods" className="text-xs sm:text-sm min-h-[44px]">
              Payment Methods
            </TabsTrigger>
          </TabsList>

          {/* Bills Tab */}
          <TabsContent value="bills" className="space-y-4">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search bills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 min-h-[44px]"
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-[180px] min-h-[44px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bills List */}
            <div className="space-y-4">
              {filteredBills.map((bill) => (
                <MedicalCard key={bill.id} variant="glass">
                  <MedicalCardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-base sm:text-lg">
                            {bill.billNumber}
                          </h3>
                          {getStatusIcon(bill.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{bill.hospital}</p>
                      </div>
                      <Badge variant={getStatusColor(bill.status)} className="text-xs">
                        {bill.status.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Service:</span>
                        <span className="font-medium">{bill.service}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Doctor:</span>
                        <span className="font-medium">{bill.doctor}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium">
                          {new Date(bill.date).toLocaleDateString()}
                        </span>
                      </div>
                      {bill.dueDate && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Due Date:</span>
                          <span className={`font-medium ${bill.status === 'overdue' ? 'text-destructive' : ''}`}>
                            {new Date(bill.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-semibold text-lg">₹{bill.amount.toLocaleString()}</span>
                      </div>
                      {bill.insuranceCovered > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Insurance Coverage:</span>
                          <span className="font-medium text-success">
                            -₹{bill.insuranceCovered.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {bill.status === "paid" && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Payment Method:</span>
                          <span className="font-medium">{bill.paymentMethod}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <MedicalButton variant="outline" size="sm" className="flex-1 sm:flex-initial min-h-[40px]">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </MedicalButton>
                      <MedicalButton variant="outline" size="sm" className="flex-1 sm:flex-initial min-h-[40px]">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </MedicalButton>
                      {(bill.status === "pending" || bill.status === "overdue") && (
                        <MedicalButton variant="medical" size="sm" className="flex-1 sm:flex-initial min-h-[40px]">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Pay Now
                        </MedicalButton>
                      )}
                    </div>
                  </MedicalCardContent>
                </MedicalCard>
              ))}
            </div>
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="payment-methods" className="space-y-4">
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center justify-between text-base sm:text-lg">
                  <span>Saved Payment Methods</span>
                  <MedicalButton variant="medical" size="sm" className="min-h-[40px]">
                    Add New
                  </MedicalButton>
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent className="p-4 sm:p-6 space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="bg-background/50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          {method.type === "Credit Card" ? (
                            <CreditCard className="h-6 w-6 text-primary" />
                          ) : (
                            <Wallet className="h-6 w-6 text-primary" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-base mb-1">{method.type}</h3>
                          {method.type === "Credit Card" ? (
                            <p className="text-sm text-muted-foreground">
                              •••• •••• •••• {method.last4} • Exp: {method.expiry}
                            </p>
                          ) : (
                            <p className="text-sm text-muted-foreground">{method.upiId}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {method.isPrimary && (
                          <Badge variant="default" className="text-xs">Primary</Badge>
                        )}
                        <MedicalButton variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </MedicalButton>
                      </div>
                    </div>
                  </div>
                ))}
              </MedicalCardContent>
            </MedicalCard>

            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="text-base sm:text-lg">
                  Payment History
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent className="p-4 sm:p-6 space-y-3">
                {bills.filter(b => b.status === "paid").slice(0, 5).map((bill) => (
                  <div key={bill.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-sm">{bill.hospital}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(bill.date).toLocaleDateString()} • {bill.paymentMethod}
                      </p>
                    </div>
                    <p className="font-semibold text-success">₹{bill.amount.toLocaleString()}</p>
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

export default Billing;
