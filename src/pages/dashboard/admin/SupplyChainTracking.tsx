import { useState } from "react";
import { 
  Truck, 
  Package, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Building2,
  Pill,
  Activity,
  TrendingUp,
  Search
} from "lucide-react";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { MedicalButton } from "@/components/ui/medical-button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SupplyChainTracking = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const supplyMetrics = [
    { label: "Active Requests", value: "342", change: "+12", icon: Package, trend: "up" },
    { label: "Critical Shortages", value: "8", change: "-3", icon: AlertTriangle, trend: "down" },
    { label: "In Transit", value: "156", change: "+23", icon: Truck, trend: "up" },
    { label: "Fulfilled Today", value: "89", change: "+15", icon: CheckCircle, trend: "up" },
  ];

  const criticalAlerts = [
    { 
      id: "CA001",
      hospital: "City General Hospital", 
      item: "Ventilators", 
      status: "critical", 
      currentStock: 2,
      requestedQty: 5,
      urgency: "high",
      estimatedDelivery: "2h",
      supplier: "MedTech Solutions"
    },
    { 
      id: "CA002",
      hospital: "Metro Medical Center", 
      item: "Blood Units (O+)", 
      status: "low", 
      currentStock: 15,
      requestedQty: 50,
      urgency: "medium",
      estimatedDelivery: "6h",
      supplier: "Blood Bank Central"
    },
    { 
      id: "CA003",
      hospital: "Care Plus Hospital", 
      item: "ICU Beds", 
      status: "full", 
      currentStock: 0,
      requestedQty: 3,
      urgency: "high",
      estimatedDelivery: "24h",
      supplier: "Hospital Equipment Ltd"
    },
    { 
      id: "CA004",
      hospital: "Health First Clinic", 
      item: "Insulin Pens", 
      status: "critical", 
      currentStock: 8,
      requestedQty: 100,
      urgency: "high",
      estimatedDelivery: "4h",
      supplier: "Pharma Direct"
    },
  ];

  const inventoryRequests = [
    {
      id: "IR001",
      hospital: "City General Hospital",
      items: [
        { name: "Paracetamol 500mg", qty: 1000, unit: "tablets" },
        { name: "Surgical Masks", qty: 500, unit: "pieces" },
      ],
      status: "pending",
      priority: "medium",
      requestDate: "2024-01-15",
      estimatedCost: "₹15,000"
    },
    {
      id: "IR002", 
      hospital: "Metro Medical Center",
      items: [
        { name: "MRI Scanner Parts", qty: 1, unit: "set" },
        { name: "Contrast Dye", qty: 10, unit: "bottles" },
      ],
      status: "approved",
      priority: "high",
      requestDate: "2024-01-14",
      estimatedCost: "₹2,50,000"
    },
    {
      id: "IR003",
      hospital: "Care Plus Hospital", 
      items: [
        { name: "ECG Electrodes", qty: 200, unit: "pieces" },
        { name: "Oxygen Cylinders", qty: 20, unit: "cylinders" },
      ],
      status: "in-transit",
      priority: "medium",
      requestDate: "2024-01-13",
      estimatedCost: "₹45,000"
    },
  ];

  const distributionStats = [
    { region: "North Delhi", hospitals: 25, activeRequests: 42, fulfilled: 156, percentage: 78 },
    { region: "South Delhi", hospitals: 18, activeRequests: 31, fulfilled: 134, percentage: 82 },
    { region: "East Delhi", hospitals: 22, activeRequests: 38, fulfilled: 145, percentage: 79 },
    { region: "West Delhi", hospitals: 20, activeRequests: 29, fulfilled: 128, percentage: 81 },
    { region: "Central Delhi", hospitals: 15, activeRequests: 22, fulfilled: 98, percentage: 77 },
  ];

  const medicineUsageTrends = [
    { medicine: "Paracetamol", thisMonth: 15420, lastMonth: 14230, trend: "+8.4%" },
    { medicine: "Amoxicillin", thisMonth: 8960, lastMonth: 9450, trend: "-5.2%" },
    { medicine: "Insulin", thisMonth: 5670, lastMonth: 5234, trend: "+8.3%" },
    { medicine: "Aspirin", thisMonth: 12340, lastMonth: 11890, trend: "+3.8%" },
    { medicine: "Omeprazole", thisMonth: 7650, lastMonth: 8120, trend: "-5.8%" },
  ];

  const supplierPerformance = [
    { name: "MedTech Solutions", deliveryRate: 96, avgDeliveryTime: "4.2h", rating: 4.8, activeOrders: 23 },
    { name: "Pharma Direct", deliveryRate: 94, avgDeliveryTime: "3.8h", rating: 4.6, activeOrders: 31 },
    { name: "Medical Supplies Pro", deliveryRate: 91, avgDeliveryTime: "5.1h", rating: 4.4, activeOrders: 18 },
    { name: "Hospital Equipment Ltd", deliveryRate: 89, avgDeliveryTime: "6.3h", rating: 4.2, activeOrders: 14 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Supply Chain <span className="gradient-text">Tracking</span>
          </h1>
          <p className="text-muted-foreground">Medicine & supply inventory management and distribution oversight</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <MedicalButton variant="outline">
            <Activity className="mr-2 h-4 w-4" />
            Real-time View
          </MedicalButton>
          <MedicalButton variant="medical">
            <Package className="mr-2 h-4 w-4" />
            New Request
          </MedicalButton>
        </div>
      </div>

      {/* Supply Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {supplyMetrics.map((metric) => (
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

      {/* Main Content */}
      <Tabs defaultValue="alerts" className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="alerts">Critical Alerts</TabsTrigger>
          <TabsTrigger value="requests">Inventory Requests</TabsTrigger>
          <TabsTrigger value="distribution">Distribution Stats</TabsTrigger>
          <TabsTrigger value="trends">Usage Trends</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          <MedicalCard variant="glass">
            <MedicalCardHeader>
              <MedicalCardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-primary" />
                Critical Supply Chain Alerts
              </MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="space-y-4">
                {criticalAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 rounded-lg bg-muted/50 border-l-4 border-l-primary">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant={
                            alert.status === "critical" ? "destructive" :
                            alert.status === "low" ? "secondary" : "outline"
                          }>
                            {alert.status}
                          </Badge>
                          <Badge variant={alert.urgency === "high" ? "destructive" : "secondary"} className="text-xs">
                            {alert.urgency} priority
                          </Badge>
                        </div>
                        <h3 className="font-semibold mb-1">{alert.hospital}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{alert.item}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">Stock: </span>
                            <span className="text-primary">{alert.currentStock}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Requested: </span>
                            <span className="text-primary">{alert.requestedQty}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">ETA: </span>
                            <span className="text-primary">{alert.estimatedDelivery}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Supplier: </span>
                            <span className="text-primary">{alert.supplier}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <MedicalButton variant="medical" size="sm">
                          Expedite
                        </MedicalButton>
                        <MedicalButton variant="outline" size="sm">
                          Track
                        </MedicalButton>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <MedicalCard variant="glass">
            <MedicalCardHeader>
              <div className="flex items-center justify-between">
                <MedicalCardTitle className="flex items-center">
                  <Package className="mr-2 h-5 w-5 text-primary" />
                  Inventory Requests
                </MedicalCardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search requests..." 
                      className="pl-10 w-48"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="in-transit">In Transit</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="space-y-4">
                {inventoryRequests.map((request) => (
                  <div key={request.id} className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold">{request.hospital}</h3>
                          <Badge variant={
                            request.status === "approved" ? "default" :
                            request.status === "pending" ? "secondary" :
                            request.status === "in-transit" ? "outline" : "default"
                          }>
                            {request.status}
                          </Badge>
                          <Badge variant={request.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                            {request.priority}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                          {request.items.map((item, index) => (
                            <div key={index} className="text-sm">
                              <span className="text-primary">{item.name}</span>
                              <span className="text-muted-foreground"> - {item.qty} {item.unit}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{request.requestDate}</span>
                          </div>
                          <div>
                            <span>Cost: </span>
                            <span className="text-primary">{request.estimatedCost}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <MedicalButton variant="outline" size="sm">
                          View Details
                        </MedicalButton>
                        {request.status === "pending" && (
                          <MedicalButton variant="medical" size="sm">
                            Approve
                          </MedicalButton>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <MedicalCard variant="glass">
            <MedicalCardHeader>
              <MedicalCardTitle className="flex items-center">
                <Building2 className="mr-2 h-5 w-5 text-primary" />
                Regional Distribution Statistics
              </MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="space-y-4">
                {distributionStats.map((region) => (
                  <div key={region.region} className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{region.region}</h3>
                      <Badge variant="outline" className="text-xs">
                        {region.percentage}% Fulfilled
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Hospitals</p>
                        <p className="text-lg font-bold text-primary">{region.hospitals}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Active Requests</p>
                        <p className="text-lg font-bold text-primary">{region.activeRequests}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Fulfilled</p>
                        <p className="text-lg font-bold text-primary">{region.fulfilled}</p>
                      </div>
                      <div className="flex items-center">
                        <div className="w-full bg-muted rounded-full h-2 mr-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${region.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-primary">{region.percentage}%</span>
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
              <MedicalCardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                Medicine Usage Trends
              </MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="space-y-4">
                {medicineUsageTrends.map((medicine) => (
                  <div key={medicine.medicine} className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold mb-1">{medicine.medicine}</h3>
                        <div className="flex items-center space-x-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">This Month: </span>
                            <span className="text-primary">{medicine.thisMonth.toLocaleString()} units</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Last Month: </span>
                            <span>{medicine.lastMonth.toLocaleString()} units</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={medicine.trend.startsWith('+') ? "default" : "secondary"} className="text-lg">
                          {medicine.trend}
                        </Badge>
                        {medicine.trend.startsWith('+') ? 
                          <TrendingUp className="h-4 w-4 text-green-500 inline-block ml-2" /> :
                          <TrendingUp className="h-4 w-4 text-red-500 inline-block ml-2 transform rotate-180" />
                        }
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-4">
          <MedicalCard variant="glass">
            <MedicalCardHeader>
              <MedicalCardTitle className="flex items-center">
                <Truck className="mr-2 h-5 w-5 text-primary" />
                Supplier Performance
              </MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="space-y-4">
                {supplierPerformance.map((supplier) => (
                  <div key={supplier.name} className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">{supplier.name}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Delivery Rate</p>
                            <p className="text-primary font-bold">{supplier.deliveryRate}%</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Avg Delivery Time</p>
                            <p className="text-primary font-bold">{supplier.avgDeliveryTime}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Rating</p>
                            <div className="flex items-center space-x-1">
                              <span className="text-yellow-500">★</span>
                              <span className="text-primary font-bold">{supplier.rating}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Active Orders</p>
                            <p className="text-primary font-bold">{supplier.activeOrders}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <MedicalButton variant="outline" size="sm">
                          Contact
                        </MedicalButton>
                        <MedicalButton variant="medical" size="sm">
                          New Order
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
  );
};

export default SupplyChainTracking;