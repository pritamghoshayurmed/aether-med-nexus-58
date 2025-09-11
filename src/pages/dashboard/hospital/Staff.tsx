import { useState } from "react";
import { 
  Users, 
  User, 
  Stethoscope,
  Clock,
  Calendar,
  Phone,
  Mail,
  Badge as BadgeIcon,
  Activity,
  UserPlus,
  Edit,
  Search,
  Filter
} from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/navigation/BottomNavigation";

const Staff = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  const [staff, setStaff] = useState([
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      role: "Doctor",
      department: "Cardiology",
      shift: "Morning",
      status: "on-duty",
      phone: "+1 234-567-8901",
      email: "s.johnson@hospital.com",
      specialization: "Cardiologist",
      experience: "8 years",
      schedule: "Mon-Fri 8:00-16:00"
    },
    {
      id: "2",
      name: "Nurse Emily Davis",
      role: "Nurse",
      department: "ICU",
      shift: "Night",
      status: "on-duty",
      phone: "+1 234-567-8902",
      email: "e.davis@hospital.com",
      specialization: "Critical Care",
      experience: "5 years",
      schedule: "Mon-Wed 20:00-08:00"
    },
    {
      id: "3",
      name: "Dr. Michael Chen",
      role: "Doctor",
      department: "Neurology",
      shift: "Morning",
      status: "off-duty",
      phone: "+1 234-567-8903",
      email: "m.chen@hospital.com",
      specialization: "Neurologist",
      experience: "12 years",
      schedule: "Tue-Sat 9:00-17:00"
    },
    {
      id: "4",
      name: "Nurse Robert Wilson",
      role: "Nurse",
      department: "Pediatrics",
      shift: "Evening",
      status: "on-duty",
      phone: "+1 234-567-8904",
      email: "r.wilson@hospital.com",
      specialization: "Pediatric Care",
      experience: "6 years",
      schedule: "Thu-Mon 14:00-22:00"
    },
    {
      id: "5",
      name: "Dr. Lisa Garcia",
      role: "Doctor",
      department: "Orthopedics",
      shift: "Morning",
      status: "on-leave",
      phone: "+1 234-567-8905",
      email: "l.garcia@hospital.com",
      specialization: "Orthopedic Surgeon",
      experience: "10 years",
      schedule: "Mon-Fri 7:00-15:00"
    }
  ]);

  const updateStaffStatus = (staffId: string, newStatus: string) => {
    setStaff(prev => prev.map(member => 
      member.id === staffId ? { ...member, status: newStatus } : member
    ));

    toast({
      title: "Staff Status Updated",
      description: `Staff member status changed to ${newStatus}.`,
    });
  };

  const filteredStaff = staff.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === "all" || member.department === departmentFilter;
    const matchesRole = roleFilter === "all" || member.role === roleFilter;

    return matchesSearch && matchesDepartment && matchesRole;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-duty": return "text-green-500";
      case "off-duty": return "text-gray-500";
      case "on-leave": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "on-duty": return "default";
      case "off-duty": return "secondary";
      case "on-leave": return "destructive";
      default: return "outline";
    }
  };

  const departments = ["Cardiology", "Neurology", "Orthopedics", "Pediatrics", "ICU"];
  const roles = ["Doctor", "Nurse", "Technician", "Administrator"];
  const statuses = ["on-duty", "off-duty", "on-leave"];

  const staffStats = {
    total: staff.length,
    onDuty: staff.filter(member => member.status === "on-duty").length,
    offDuty: staff.filter(member => member.status === "off-duty").length,
    onLeave: staff.filter(member => member.status === "on-leave").length,
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4 pb-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="gradient-text">Staff Management</span>
          </h1>
          <p className="text-muted-foreground">Manage hospital staff and schedules</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold text-primary">{staffStats.total}</p>
              <p className="text-sm text-muted-foreground">Total Staff</p>
            </MedicalCardContent>
          </MedicalCard>
          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4 text-center">
              <Activity className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <p className="text-2xl font-bold text-green-500">{staffStats.onDuty}</p>
              <p className="text-sm text-muted-foreground">On Duty</p>
            </MedicalCardContent>
          </MedicalCard>
          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-gray-500" />
              <p className="text-2xl font-bold text-gray-500">{staffStats.offDuty}</p>
              <p className="text-sm text-muted-foreground">Off Duty</p>
            </MedicalCardContent>
          </MedicalCard>
          <MedicalCard variant="glass">
            <MedicalCardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-red-500" />
              <p className="text-2xl font-bold text-red-500">{staffStats.onLeave}</p>
              <p className="text-sm text-muted-foreground">On Leave</p>
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
                    placeholder="Search by name, department, or specialization..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {roles.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
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
              <MedicalButton variant="medical">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Staff
              </MedicalButton>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* Staff List */}
        <MedicalCard variant="glass">
          <MedicalCardHeader>
            <MedicalCardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Staff Members ({filteredStaff.length})
            </MedicalCardTitle>
          </MedicalCardHeader>
          <MedicalCardContent>
            <div className="space-y-4">
              {filteredStaff.map((member) => (
                <div key={member.id} className="p-4 rounded-lg bg-muted/50 border">
                  <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        {member.role === "Doctor" ? 
                          <Stethoscope className="h-6 w-6 text-primary" /> : 
                          <User className="h-6 w-6 text-primary" />
                        }
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{member.name}</h3>
                          <BadgeIcon className={`h-4 w-4 ${getStatusColor(member.status)}`} />
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {member.role} • {member.department}
                        </p>
                        <p className="text-sm text-primary mb-1">{member.specialization}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>
                            <Clock className="inline h-3 w-3 mr-1" />
                            {member.shift} Shift
                          </span>
                          <span>
                            <Calendar className="inline h-3 w-3 mr-1" />
                            {member.schedule}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                          <span>
                            <Phone className="inline h-3 w-3 mr-1" />
                            {member.phone}
                          </span>
                          <span>
                            <Mail className="inline h-3 w-3 mr-1" />
                            {member.email}
                          </span>
                          <span>Experience: {member.experience}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 md:items-end">
                      <Badge variant={getStatusVariant(member.status)}>
                        {member.status}
                      </Badge>
                      
                      <div className="flex space-x-2">
                        <Select 
                          value={member.status} 
                          onValueChange={(value) => updateStaffStatus(member.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {statuses.map(status => (
                              <SelectItem key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        <MedicalButton variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </MedicalButton>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredStaff.length === 0 && (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No staff members found matching your filters.</p>
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

export default Staff;