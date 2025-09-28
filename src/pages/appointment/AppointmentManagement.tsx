import { useState } from "react";
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

const AppointmentManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("upcoming");

  const mockAppointments = [
    {
      id: "APT-001",
      doctor: {
        name: "Dr. Sarah Johnson",
        specialty: "Cardiology",
        hospital: "City General Hospital",
        avatar: "SJ"
      },
      date: new Date("2024-12-29"),
      time: "2:30 PM",
      type: "Video Call",
      status: "confirmed",
      fee: 150,
      patientNotes: "Regular checkup for heart condition",
      canReschedule: true,
      canCancel: true
    },
    {
      id: "APT-002", 
      doctor: {
        name: "Dr. Michael Chen",
        specialty: "General Medicine",
        hospital: "Metropolitan Medical Center",
        avatar: "MC"
      },
      date: new Date("2025-01-02"),
      time: "10:00 AM",
      type: "In-Person",
      status: "confirmed",
      fee: 120,
      patientNotes: "Annual physical examination",
      canReschedule: true,
      canCancel: true
    },
    {
      id: "APT-003",
      doctor: {
        name: "Dr. Emily Rodriguez",
        specialty: "Dermatology", 
        hospital: "Skin Health Clinic",
        avatar: "ER"
      },
      date: new Date("2024-12-15"),
      time: "3:00 PM",
      type: "In-Person",
      status: "completed",
      fee: 180,
      patientNotes: "Skin examination and mole check",
      canReschedule: false,
      canCancel: false
    },
    {
      id: "APT-004",
      doctor: {
        name: "Dr. James Wilson",
        specialty: "Orthopedics",
        hospital: "Sports Medicine Institute", 
        avatar: "JW"
      },
      date: new Date("2024-11-20"),
      time: "9:00 AM",
      type: "In-Person",
      status: "cancelled",
      fee: 200,
      patientNotes: "Knee pain consultation",
      canReschedule: false,
      canCancel: false
    }
  ];

  const getStatusColor = (status) => {
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

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isUpcoming = (date) => {
    return date >= new Date().setHours(0, 0, 0, 0);
  };

  const filterAppointments = (appointments, tab) => {
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

  const handleCancelAppointment = (appointmentId) => {
    // In real app, this would make API call
    console.log("Cancelling appointment:", appointmentId);
  };

  const handleRescheduleAppointment = (appointmentId) => {
    // Navigate to reschedule page
    navigate(`/appointment/reschedule/${appointmentId}`);
  };

  const handleBookNewAppointment = () => {
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
                <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
                <p className="text-sm text-gray-600">Manage your healthcare appointments</p>
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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
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
            {filteredAppointments.length > 0 ? (
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
                          <h3 className="text-lg font-bold text-gray-900 mb-1">
                            {appointment.doctor.name}
                          </h3>
                          <p className="text-primary font-medium mb-2">
                            {appointment.doctor.specialty}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            {appointment.doctor.hospital}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
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
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>{formatDate(appointment.date)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{appointment.time}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          {appointment.type === "Video Call" && <Video className="h-4 w-4 text-gray-500" />}
                          {appointment.type === "Phone Call" && <Phone className="h-4 w-4 text-gray-500" />}
                          {appointment.type === "In-Person" && <Building className="h-4 w-4 text-gray-500" />}
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
                        <p className="text-sm text-gray-700">
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
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No {activeTab} appointments
                </h3>
                <p className="text-gray-600 mb-6">
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