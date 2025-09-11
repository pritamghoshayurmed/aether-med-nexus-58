import { useState } from "react";
import { 
  Package, 
  Truck,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Send,
  Calendar,
  DollarSign,
  Building,
  Filter,
  Search
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const SupplyChain = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showNewRequestDialog, setShowNewRequestDialog] = useState(false);

  const [supplyRequests, setSupplyRequests] = useState([
    {
      id: "1",
      medicine: "Paracetamol 500mg",
      quantity: 500,
      unit: "tablets",
      urgency: "high",
      status: "pending",
      supplier: "MedSupply Co",
      requestedBy: "Dr. Sarah Johnson",
      requestDate: "2024-01-15",
      expectedDelivery: "2024-01-17",
      cost: "₹10,000",
      notes: "Running critically low"
    },
    {
      id: "2",
      medicine: "Amoxicillin 250mg",
      quantity: 200,
      unit: "capsules",
      urgency: "medium",
      status: "approved",
      supplier: "PharmaDistrib",
      requestedBy: "Nurse Emily Davis",
      requestDate: "2024-01-14",
      expectedDelivery: "2024-01-18",
      cost: "₹9,000",
      notes: "Regular monthly stock"
    },
    {
      id: "3",
      medicine: "Insulin Cartridges",
      quantity: 100,
      unit: "cartridges",
      urgency: "high",
      status: "shipped",
      supplier: "DiabetesCare",
      requestedBy: "Dr. Michael Chen",
      requestDate: "2024-01-13",
      expectedDelivery: "2024-01-16",
      cost: "₹30,000",
      notes: "Emergency supply needed"
    },
    {
      id: "4",
      medicine: "Surgical Gloves",
      quantity: 1000,
      unit: "pairs",
      urgency: "low",
      status: "delivered",
      supplier: "MedEquip Ltd",
      requestedBy: "Hospital Admin",
      requestDate: "2024-01-10",
      expectedDelivery: "2024-01-15",
      cost: "₹5,000",
      notes: "Monthly supply replenishment"
    }
  ]);

  const [newRequest, setNewRequest] = useState({
    medicine: "",
    quantity: "",
    unit: "tablets",
    urgency: "medium",
    supplier: "",
    notes: ""
  });

  const updateRequestStatus = (requestId: string, newStatus: string) => {
    setSupplyRequests(prev => prev.map(request => 
      request.id === requestId ? { ...request, status: newStatus } : request
    ));

    toast({
      title: "Request Updated",
      description: `Supply request status changed to ${newStatus}.`,
    });
  };

  const createNewRequest = () => {
    if (!newRequest.medicine || !newRequest.quantity || !newRequest.supplier) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const request = {
      id: String(Date.now()),
      medicine: newRequest.medicine,
      quantity: parseInt(newRequest.quantity),
      unit: newRequest.unit,
      urgency: newRequest.urgency,
      status: "pending",
      supplier: newRequest.supplier,
      requestedBy: "Current User",
      requestDate: new Date().toISOString().split('T')[0],
      expectedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      cost: "₹0",
      notes: newRequest.notes
    };

    setSupplyRequests(prev => [request, ...prev]);
    setNewRequest({
      medicine: "",
      quantity: "",
      unit: "tablets",
      urgency: "medium",
      supplier: "",
      notes: ""
    });
    setShowNewRequestDialog(false);

    toast({
      title: "Request Created",
      description: "New supply request has been submitted successfully.",
    });
  };

  const filteredRequests = supplyRequests.filter(request => {
    const matchesSearch = 
      request.medicine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "approved": return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case "shipped": return <Truck className="h-4 w-4 text-purple-500" />;
      case "delivered": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "pending": return "secondary";
      case "approved": return "default";
      case "shipped": return "outline";
      case "delivered": return "default";
      case "rejected": return "destructive";
      default: return "outline";
    }
  };

  const getUrgencyVariant = (urgency: string) => {
    switch (urgency) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  const suppliers = ["MedSupply Co", "PharmaDistrib", "DiabetesCare", "MedEquip Ltd", "HealthCorp"];
  const statuses = ["pending", "approved", "shipped", "delivered", "rejected"];
  const urgencyLevels = ["low", "medium", "high"];
  const units = ["tablets", "capsules", "cartridges", "vials", "pairs", "bottles"];

  const requestStats = {
    total: supplyRequests.length,
    pending: supplyRequests.filter(req => req.status === "pending").length,
    approved: supplyRequests.filter(req => req.status === "approved").length,
    shipped: supplyRequests.filter(req => req.status === "shipped").length,
    delivered: supplyRequests.filter(req => req.status === "delivered").length,
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="gradient-text">Supply Chain Management</span>
            </h1>
            <p className="text-muted-foreground">Manage medicine and equipment supply requests</p>
          </div>
          <Dialog open={showNewRequestDialog} onOpenChange={setShowNewRequestDialog}>
            <DialogTrigger asChild>
              <MedicalButton variant="medical">
                <Plus className="mr-2 h-4 w-4" />
                New Request
              </MedicalButton>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Supply Request</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Medicine/Item Name *</label>
                  <Input
                    value={newRequest.medicine}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, medicine: e.target.value }))}
                    placeholder="Enter medicine name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Quantity *</label>
                    <Input
                      type="number"
                      value={newRequest.quantity}
                      onChange={(e) => setNewRequest(prev => ({ ...prev, quantity: e.target.value }))}
                      placeholder="Enter quantity"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Unit</label>
                    <Select value={newRequest.unit} onValueChange={(value) => setNewRequest(prev => ({ ...prev, unit: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {units.map(unit => (
                          <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Urgency</label>
                    <Select value={newRequest.urgency} onValueChange={(value) => setNewRequest(prev => ({ ...prev, urgency: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {urgencyLevels.map(level => (
                          <SelectItem key={level} value={level}>
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Supplier *</label>
                    <Select value={newRequest.supplier} onValueChange={(value) => setNewRequest(prev => ({ ...prev, supplier: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        {suppliers.map(supplier => (
                          <SelectItem key={supplier} value={supplier}>{supplier}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Notes</label>
                  <Textarea
                    value={newRequest.notes}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Additional notes or special requirements"
                    rows={3}
                  />
                </div>
                <div className="flex space-x-2">
                  <MedicalButton variant="medical" onClick={createNewRequest} className="flex-1">
                    <Send className="mr-2 h-4 w-4" />
                    Submit Request
                  </MedicalButton>
                  <MedicalButton variant="outline" onClick={() => setShowNewRequestDialog(false)}>
                    Cancel
                  </MedicalButton>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4 text-center">
              <Package className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold text-primary">{requestStats.total}</p>
              <p className="text-sm text-muted-foreground">Total Requests</p>
            </MedicalCardContent>
          </MedicalCard>
          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <p className="text-2xl font-bold text-yellow-500">{requestStats.pending}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </MedicalCardContent>
          </MedicalCard>
          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <p className="text-2xl font-bold text-blue-500">{requestStats.approved}</p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </MedicalCardContent>
          </MedicalCard>
          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4 text-center">
              <Truck className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <p className="text-2xl font-bold text-purple-500">{requestStats.shipped}</p>
              <p className="text-sm text-muted-foreground">Shipped</p>
            </MedicalCardContent>
          </MedicalCard>
          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <p className="text-2xl font-bold text-green-500">{requestStats.delivered}</p>
              <p className="text-sm text-muted-foreground">Delivered</p>
            </MedicalCardContent>
          </MedicalCard>
        </div>

        {/* Filters */}
        <MedicalCard variant="glass" className="mb-6">
          <MedicalCardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by medicine, supplier, or requestor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {statuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* Supply Requests List */}
        <MedicalCard variant="glass">
          <MedicalCardHeader>
            <MedicalCardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5 text-primary" />
              Supply Requests ({filteredRequests.length})
            </MedicalCardTitle>
          </MedicalCardHeader>
          <MedicalCardContent>
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <div key={request.id} className="p-4 rounded-lg bg-muted/50 border">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <Package className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{request.medicine}</h3>
                          {getStatusIcon(request.status)}
                          <Badge variant={getUrgencyVariant(request.urgency)}>
                            {request.urgency} priority
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          <Building className="inline h-3 w-3 mr-1" />
                          {request.supplier}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
                          <span>Quantity: {request.quantity} {request.unit}</span>
                          <span>
                            <Calendar className="inline h-3 w-3 mr-1" />
                            Requested: {request.requestDate}
                          </span>
                          <span>
                            <Truck className="inline h-3 w-3 mr-1" />
                            Expected: {request.expectedDelivery}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Requested by: {request.requestedBy}</span>
                          <span>
                            <DollarSign className="inline h-3 w-3 mr-1" />
                            Cost: {request.cost}
                          </span>
                        </div>
                        {request.notes && (
                          <p className="text-sm mt-2 p-2 bg-background/50 rounded">{request.notes}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 lg:items-end">
                      <Badge variant={getStatusVariant(request.status)}>
                        {request.status}
                      </Badge>
                      
                      <div className="flex space-x-2">
                        {request.status === "pending" && (
                          <>
                            <MedicalButton 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateRequestStatus(request.id, "approved")}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </MedicalButton>
                            <MedicalButton 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateRequestStatus(request.id, "rejected")}
                            >
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              Reject
                            </MedicalButton>
                          </>
                        )}
                        
                        {request.status === "approved" && (
                          <MedicalButton 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateRequestStatus(request.id, "shipped")}
                          >
                            <Truck className="h-3 w-3 mr-1" />
                            Mark Shipped
                          </MedicalButton>
                        )}
                        
                        {request.status === "shipped" && (
                          <MedicalButton 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateRequestStatus(request.id, "delivered")}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Mark Delivered
                          </MedicalButton>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredRequests.length === 0 && (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No supply requests found matching your filters.</p>
                </div>
              )}
            </div>
          </MedicalCardContent>
        </MedicalCard>
      </div>

      <BottomNavigation userRole="hospital" />
    </div>
  );
};

export default SupplyChain;