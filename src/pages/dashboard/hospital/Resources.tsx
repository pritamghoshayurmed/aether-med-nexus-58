import { useState } from "react";
import { 
  Bed, 
  Pill, 
  Package, 
  Plus,
  Minus,
  Edit,
  Save,
  X,
  AlertTriangle,
  CheckCircle,
  Activity
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const Resources = () => {
  const { toast } = useToast();
  const [editingBed, setEditingBed] = useState<string | null>(null);
  const [editingMedicine, setEditingMedicine] = useState<string | null>(null);

  const [departments, setDepartments] = useState([
    { id: "1", name: "Cardiology", totalBeds: 25, occupiedBeds: 15, availableBeds: 10 },
    { id: "2", name: "Neurology", totalBeds: 15, occupiedBeds: 8, availableBeds: 7 },
    { id: "3", name: "Orthopedics", totalBeds: 20, occupiedBeds: 12, availableBeds: 8 },
    { id: "4", name: "Pediatrics", totalBeds: 30, occupiedBeds: 18, availableBeds: 12 },
    { id: "5", name: "ICU", totalBeds: 10, occupiedBeds: 7, availableBeds: 3 },
  ]);

  const [medicines, setMedicines] = useState([
    { id: "1", name: "Paracetamol 500mg", currentStock: 150, minStock: 50, maxStock: 500, unit: "tablets" },
    { id: "2", name: "Amoxicillin 250mg", currentStock: 80, minStock: 30, maxStock: 200, unit: "capsules" },
    { id: "3", name: "Insulin Cartridges", currentStock: 25, minStock: 20, maxStock: 100, unit: "cartridges" },
    { id: "4", name: "Ibuprofen 400mg", currentStock: 200, minStock: 75, maxStock: 400, unit: "tablets" },
    { id: "5", name: "Aspirin 75mg", currentStock: 45, minStock: 50, maxStock: 300, unit: "tablets" },
  ]);

  const updateBedAvailability = (deptId: string, change: number, type: 'occupied' | 'total') => {
    setDepartments(prev => prev.map(dept => {
      if (dept.id === deptId) {
        if (type === 'occupied') {
          const newOccupied = Math.max(0, Math.min(dept.totalBeds, dept.occupiedBeds + change));
          return {
            ...dept,
            occupiedBeds: newOccupied,
            availableBeds: dept.totalBeds - newOccupied
          };
        } else {
          const newTotal = Math.max(dept.occupiedBeds, dept.totalBeds + change);
          return {
            ...dept,
            totalBeds: newTotal,
            availableBeds: newTotal - dept.occupiedBeds
          };
        }
      }
      return dept;
    }));

    toast({
      title: "Bed Status Updated",
      description: `${type === 'occupied' ? 'Occupied' : 'Total'} beds updated successfully.`,
    });
  };

  const updateMedicineStock = (medicineId: string, newStock: number) => {
    setMedicines(prev => prev.map(med => 
      med.id === medicineId ? { ...med, currentStock: Math.max(0, newStock) } : med
    ));
    
    toast({
      title: "Stock Updated",
      description: "Medicine stock updated successfully.",
    });
  };

  const getStockStatus = (medicine: typeof medicines[0]) => {
    if (medicine.currentStock <= medicine.minStock) return "critical";
    if (medicine.currentStock <= medicine.minStock * 1.5) return "low";
    return "good";
  };

  const getBedStatus = (dept: typeof departments[0]) => {
    const occupancyRate = (dept.occupiedBeds / dept.totalBeds) * 100;
    if (occupancyRate >= 90) return "critical";
    if (occupancyRate >= 70) return "warning";
    return "good";
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text">Resource Management</span>
          </h1>
          <p className="text-muted-foreground">Manage hospital beds and medicine inventory</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bed Management */}
          <div className="space-y-6">
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <Bed className="mr-2 h-5 w-5 text-primary" />
                  Bed Management
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  {departments.map((dept) => {
                    const status = getBedStatus(dept);
                    const isEditing = editingBed === dept.id;
                    
                    return (
                      <div key={dept.id} className="p-4 rounded-lg bg-muted/50 border">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">{dept.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {dept.occupiedBeds}/{dept.totalBeds} beds occupied
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={
                              status === "critical" ? "destructive" : 
                              status === "warning" ? "secondary" : "default"
                            }>
                              {Math.round((dept.occupiedBeds / dept.totalBeds) * 100)}% Full
                            </Badge>
                            <MedicalButton 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setEditingBed(isEditing ? null : dept.id)}
                            >
                              {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                            </MedicalButton>
                          </div>
                        </div>

                        {isEditing && (
                          <div className="space-y-3 p-3 bg-background/50 rounded-lg">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Occupied Beds:</span>
                              <div className="flex items-center space-x-2">
                                <MedicalButton 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => updateBedAvailability(dept.id, -1, 'occupied')}
                                >
                                  <Minus className="h-3 w-3" />
                                </MedicalButton>
                                <span className="w-8 text-center">{dept.occupiedBeds}</span>
                                <MedicalButton 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => updateBedAvailability(dept.id, 1, 'occupied')}
                                >
                                  <Plus className="h-3 w-3" />
                                </MedicalButton>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Total Beds:</span>
                              <div className="flex items-center space-x-2">
                                <MedicalButton 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => updateBedAvailability(dept.id, -1, 'total')}
                                >
                                  <Minus className="h-3 w-3" />
                                </MedicalButton>
                                <span className="w-8 text-center">{dept.totalBeds}</span>
                                <MedicalButton 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => updateBedAvailability(dept.id, 1, 'total')}
                                >
                                  <Plus className="h-3 w-3" />
                                </MedicalButton>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="mt-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all ${
                                status === "critical" ? "bg-red-500" : 
                                status === "warning" ? "bg-yellow-500" : "bg-green-500"
                              }`}
                              style={{ width: `${(dept.occupiedBeds / dept.totalBeds) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>

          {/* Medicine Stock Management */}
          <div className="space-y-6">
            <MedicalCard variant="glass">
              <MedicalCardHeader>
                <MedicalCardTitle className="flex items-center">
                  <Pill className="mr-2 h-5 w-5 text-primary" />
                  Medicine Stock
                </MedicalCardTitle>
              </MedicalCardHeader>
              <MedicalCardContent>
                <div className="space-y-4">
                  {medicines.map((medicine) => {
                    const status = getStockStatus(medicine);
                    const isEditing = editingMedicine === medicine.id;
                    
                    return (
                      <div key={medicine.id} className="p-4 rounded-lg bg-muted/50 border">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h3 className="font-semibold">{medicine.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {medicine.currentStock} {medicine.unit} available
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {status === "critical" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                            {status === "good" && <CheckCircle className="h-4 w-4 text-green-500" />}
                            <Badge variant={
                              status === "critical" ? "destructive" : 
                              status === "low" ? "secondary" : "default"
                            }>
                              {status}
                            </Badge>
                            <MedicalButton 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setEditingMedicine(isEditing ? null : medicine.id)}
                            >
                              {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                            </MedicalButton>
                          </div>
                        </div>

                        {isEditing && (
                          <div className="space-y-3 p-3 bg-background/50 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <MedicalButton 
                                variant="outline" 
                                size="sm"
                                onClick={() => updateMedicineStock(medicine.id, medicine.currentStock - 10)}
                              >
                                <Minus className="h-3 w-3" />
                              </MedicalButton>
                              <Input 
                                type="number" 
                                value={medicine.currentStock}
                                onChange={(e) => updateMedicineStock(medicine.id, parseInt(e.target.value) || 0)}
                                className="w-20 text-center"
                              />
                              <MedicalButton 
                                variant="outline" 
                                size="sm"
                                onClick={() => updateMedicineStock(medicine.id, medicine.currentStock + 10)}
                              >
                                <Plus className="h-3 w-3" />
                              </MedicalButton>
                              <span className="text-sm text-muted-foreground">{medicine.unit}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Min: {medicine.minStock} | Max: {medicine.maxStock} {medicine.unit}
                            </div>
                          </div>
                        )}

                        <div className="mt-3">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all ${
                                status === "critical" ? "bg-red-500" : 
                                status === "low" ? "bg-yellow-500" : "bg-green-500"
                              }`}
                              style={{ width: `${Math.min(100, (medicine.currentStock / medicine.maxStock) * 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </MedicalCardContent>
            </MedicalCard>
          </div>
        </div>
      </div>

      <BottomNavigation userRole="hospital" />
    </div>
  );
};

export default Resources;