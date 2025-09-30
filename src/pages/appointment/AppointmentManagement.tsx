import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, 
  Clock, 
  Video,
  Phone,
  Building,
  User,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  MessageCircle,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import { useAppointments } from "@/hooks/useDatabase";

// TypeScript interfaces for appointment data
interface TransformedAppointment {
  id: string;
  doctor: {
    name: string;
    specialty: string;
    hospital: string;
    avatar: string;
  };
  date: Date;
  time: string;
  type: string;
  status: string;
  fee: number;
  patientNotes: string;
  canReschedule: boolean;
  canCancel: boolean;
}

const AppointmentManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("upcoming");

  // Fetch appointments from Supabase
  const { appointments: dbAppointments, loading: appointmentsLoading, updateAppointment, refetch } = useAppointments();

  // Transform database appointments to component format
  const mockAppointments = dbAppointments.map((apt: any) => {
    const doctorName = apt.doctors?.profiles?.full_name || 'Unknown Doctor';
    const getInitials = (name: string) => {
      const parts = name.split(' ');
      return parts.length >= 2 
        ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
        : name.substring(0, 2).toUpperCase();
    };

    // Combine date and time for proper Date object
    const appointmentDateTime = new Date(`${apt.appointment_date}T${apt.appointment_time}`);
    
    // Map status: 'scheduled' -> 'confirmed'
    const mappedStatus = apt.status === 'scheduled' ? 'confirmed' : apt.status;
    
    // Map appointment type
    const typeMap: Record<string, string> = {
      'video': 'Video Call',
      'phone': 'Phone Call',
      'in-person': 'In-Person'
    };

    return {
      id: apt.id,
      doctor: {
        name: doctorName,
        specialty: apt.doctors?.specialty || 'General',
        hospital: 'Medical Center', // You may want to add hospital info to the doctors table
        avatar: getInitials(doctorName)
      },
      date: appointmentDateTime,
      time: new Date(`2000-01-01T${apt.appointment_time}`).toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      type: typeMap[apt.appointment_type] || 'In-Person',
      status: mappedStatus,
      fee: apt.consultation_fee || 0,
      patientNotes: apt.reason || apt.notes || '',
      canReschedule: apt.status === 'scheduled',
      canCancel: apt.status === 'scheduled'
    };
  });

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-muted/50 text-muted-foreground";
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isUpcoming = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const filterAppointments = (appointments: TransformedAppointment[], tab: string): TransformedAppointment[] => {
    let filtered = appointments;

    // Filter by tab
    if (tab === "upcoming") {
      filtered = filtered.filter(apt => isUpcoming(apt.date) && apt.status !== "cancelled");
    } else if (tab === "past") {
      filtered = filtered.filter(apt => !isUpcoming(apt.date) || apt.status === "completed");
    } else if (tab === "cancelled") {
      filtered = filtered.filter(apt => apt.status === "cancelled");
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(apt => 
        apt.doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.id.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter(apt => apt.status === filterStatus);
    }

    return filtered;
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      await updateAppointment(appointmentId, { status: 'cancelled' });
      await refetch(); // Refresh the appointments list
    } catch (error) {
      console.error('Error cancelling appointment:', error);
    }
  };

  const handleRescheduleAppointment = (appointmentId: string): void => {
    // Navigate to reschedule page
    navigate(`/appointment/reschedule/${appointmentId}`);
  };

  const handleBookNewAppointment = (): void => {
    navigate("/appointment/booking");
  };

  const filteredAppointments = filterAppointments(mockAppointments, activeTab);

  return (
    <div className="min-h-screen bg-gradient-background pb-20">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-md shadow-sm border-b border-border sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate(-1)}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">My Appointments</h1>
                <p className="text-sm text-white">Manage your healthcare appointments</p>
              </div>
            </div>
            <Button onClick={handleBookNewAppointment}>
              <Plus className="h-4 w-4 mr-2" />
              Book New
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white h-5 w-5" />
              <Input
                placeholder="Search appointments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4 mt-6">
            {appointmentsLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-white">Loading appointments...</p>
              </div>
            ) : filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <MedicalCard key={appointment.id} className="hover:shadow-md transition-shadow">
                  <MedicalCardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Doctor Info */}
                      <div className="flex gap-4 flex-1">
                        <Avatar className="w-16 h-16">
                          <AvatarFallback className="bg-primary text-white text-lg font-semibold">
                            {appointment.doctor.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-1">
                            {appointment.doctor.name}
                          </h3>
                          <p className="text-primary font-medium mb-2">
                            {appointment.doctor.specialty}
                          </p>
                          <p className="text-sm text-white mb-2">
                            {appointment.doctor.hospital}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-white">
                            <span>ID: {appointment.id}</span>
                            <Badge className={getStatusColor(appointment.status)}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Appointment Details */}
                      <div className="lg:w-64 space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-white" />
                          <span>{formatDate(appointment.date)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-white" />
                          <span>{appointment.time}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          {appointment.type === "Video Call" && <Video className="h-4 w-4 text-white" />}
                          {appointment.type === "Phone Call" && <Phone className="h-4 w-4 text-white" />}
                          {appointment.type === "In-Person" && <Building className="h-4 w-4 text-white" />}
                          <span>{appointment.type}</span>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">${appointment.fee}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="lg:w-32 flex lg:flex-col justify-end gap-2">
                        {appointment.status === "confirmed" && (
                          <>
                            <Button size="sm" className="w-full lg:w-auto">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Chat
                            </Button>
                            
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="w-auto">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {appointment.canReschedule && (
                                  <DropdownMenuItem 
                                    onClick={() => handleRescheduleAppointment(appointment.id)}
                                  >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Reschedule
                                  </DropdownMenuItem>
                                )}
                                {appointment.canCancel && (
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Cancel
                                      </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to cancel this appointment with {appointment.doctor.name}? 
                                          This action cannot be undone.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Keep Appointment</AlertDialogCancel>
                                        <AlertDialogAction 
                                          onClick={() => handleCancelAppointment(appointment.id)}
                                          className="bg-red-600 hover:bg-red-700"
                                        >
                                          Cancel Appointment
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </>
                        )}
                        
                        {appointment.status === "completed" && (
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Patient Notes */}
                    {appointment.patientNotes && (
                      <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm text-white">
                          <span className="font-medium">Notes: </span>
                          {appointment.patientNotes}
                        </p>
                      </div>
                    )}
                  </MedicalCardContent>
                </MedicalCard>
              ))
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 text-white mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  No {activeTab} appointments
                </h3>
                <p className="text-white mb-6">
                  {activeTab === "upcoming" 
                    ? "You don't have any upcoming appointments scheduled."
                    : activeTab === "past"
                    ? "You don't have any past appointments."
                    : "You don't have any cancelled appointments."
                  }
                </p>
                {activeTab === "upcoming" && (
                  <Button onClick={handleBookNewAppointment}>
                    <Plus className="h-4 w-4 mr-2" />
                    Book Your First Appointment
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation userRole="patient" />
    </div>
  );
};

export default AppointmentManagement;