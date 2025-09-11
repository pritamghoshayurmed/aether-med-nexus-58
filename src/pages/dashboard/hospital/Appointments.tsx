import { useState } from "react";
import { 
  Calendar, 
  Clock, 
  User, 
  Stethoscope,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Phone,
  Mail
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const Appointments = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const [appointments, setAppointments] = useState([
    {
      id: "1",
      patient: "John Doe",
      doctor: "Dr. Smith",
      department: "Cardiology",
      date: "2024-01-15",
      time: "10:30 AM",
      status: "confirmed",
      phone: "+1 234-567-8901",
      email: "john.doe@email.com",
      reason: "Regular checkup"
    },
    {
      id: "2",
      patient: "Jane Smith",
      doctor: "Dr. Johnson",
      department: "Neurology",
      date: "2024-01-15",
      time: "11:15 AM",
      status: "pending",
      phone: "+1 234-567-8902",
      email: "jane.smith@email.com",
      reason: "Headache consultation"
    },
    {
      id: "3",
      patient: "Mike Davis",
      doctor: "Dr. Brown",
      department: "Orthopedics",
      date: "2024-01-15",
      time: "2:00 PM",
      status: "confirmed",
      phone: "+1 234-567-8903",
      email: "mike.davis@email.com",
      reason: "Knee pain"
    },
    {
      id: "4",
      patient: "Sarah Wilson",
      doctor: "Dr. Lee",
      department: "Pediatrics",
      date: "2024-01-15",
      time: "3:30 PM",
      status: "cancelled",
      phone: "+1 234-567-8904",
      email: "sarah.wilson@email.com",
      reason: "Child vaccination"
    },
    {
      id: "5",
      patient: "Robert Chen",
      doctor: "Dr. Garcia",
      department: "Cardiology",
      date: "2024-01-16",
      time: "9:00 AM",
      status: "pending",
      phone: "+1 234-567-8905",
      email: "robert.chen@email.com",
      reason: "Heart monitoring"
    }
  ]);

  const updateAppointmentStatus = (appointmentId: string, newStatus: string) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    ));

    toast({
      title: "Appointment Updated",
      description: `Appointment status changed to ${newStatus}.`,
    });
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = 
      apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
    const matchesDepartment = departmentFilter === "all" || apt.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending": return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "cancelled": return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "confirmed": return "default";
      case "pending": return "secondary";
      case "cancelled": return "destructive";
      default: return "outline";
    }
  };

  const departments = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "ICU"];
  const statuses = ["confirmed", "pending", "cancelled"];

  const appointmentStats = {
    total: appointments.length,
    confirmed: appointments.filter(apt => apt.status === "confirmed").length,
    pending: appointments.filter(apt => apt.status === "pending").length,
    cancelled: appointments.filter(apt => apt.status === "cancelled").length,
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text">Appointment Management</span>
          </h1>
          <p className="text-muted-foreground">View and manage hospital appointments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold text-primary">{appointmentStats.total}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </MedicalCardContent>
          </MedicalCard>
          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <p className="text-2xl font-bold text-green-500">{appointmentStats.confirmed}</p>
              <p className="text-sm text-muted-foreground">Confirmed</p>
            </MedicalCardContent>
          </MedicalCard>
          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4 text-center">
              <AlertCircle className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <p className="text-2xl font-bold text-yellow-500">{appointmentStats.pending}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </MedicalCardContent>
          </MedicalCard>
          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4 text-center">
              <XCircle className="h-8 w-8 mx-auto mb-2 text-red-500" />
              <p className="text-2xl font-bold text-red-500">{appointmentStats.cancelled}</p>
              <p className="text-sm text-muted-foreground">Cancelled</p>
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
                    placeholder="Search by patient, doctor, or department..."
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
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* Appointments List */}
        <MedicalCard variant="glass">
          <MedicalCardHeader>
            <MedicalCardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              Appointments ({filteredAppointments.length})
            </MedicalCardTitle>
          </MedicalCardHeader>
          <MedicalCardContent>
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="p-4 rounded-lg bg-muted/50 border">
                  <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{appointment.patient}</h3>
                          {getStatusIcon(appointment.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          <Stethoscope className="inline h-3 w-3 mr-1" />
                          {appointment.doctor} • {appointment.department}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>
                            <Calendar className="inline h-3 w-3 mr-1" />
                            {appointment.date}
                          </span>
                          <span>
                            <Clock className="inline h-3 w-3 mr-1" />
                            {appointment.time}
                          </span>
                        </div>
                        <p className="text-sm mt-1">{appointment.reason}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span>
                            <Phone className="inline h-3 w-3 mr-1" />
                            {appointment.phone}
                          </span>
                          <span>
                            <Mail className="inline h-3 w-3 mr-1" />
                            {appointment.email}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 md:items-end">
                      <Badge variant={getStatusVariant(appointment.status)}>
                        {appointment.status}
                      </Badge>
                      
                      <div className="flex space-x-2">
                        {appointment.status === "pending" && (
                          <>
                            <MedicalButton 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateAppointmentStatus(appointment.id, "confirmed")}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Confirm
                            </MedicalButton>
                            <MedicalButton 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateAppointmentStatus(appointment.id, "cancelled")}
                            >
                              <XCircle className="h-3 w-3 mr-1" />
                              Cancel
                            </MedicalButton>
                          </>
                        )}
                        
                        {appointment.status === "confirmed" && (
                          <MedicalButton 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateAppointmentStatus(appointment.id, "cancelled")}
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            Cancel
                          </MedicalButton>
                        )}
                        
                        {appointment.status === "cancelled" && (
                          <MedicalButton 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateAppointmentStatus(appointment.id, "pending")}
                          >
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Reschedule
                          </MedicalButton>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredAppointments.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No appointments found matching your filters.</p>
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

export default Appointments;