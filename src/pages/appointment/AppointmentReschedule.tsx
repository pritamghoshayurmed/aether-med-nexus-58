import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Video,
  Phone,
  Building,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const AppointmentReschedule = () => {
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  const { toast } = useToast();
  const [appointment, setAppointment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());

  // Mock appointment data
  const mockAppointment = {
    id: "APT-001",
    doctor: {
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      hospital: "City General Hospital",
      avatar: "SJ"
    },
    currentDate: new Date("2024-12-29"),
    currentTime: "2:30 PM",
    type: "Video Call",
    fee: 150
  };

  useEffect(() => {
    // In real app, fetch appointment data based on appointmentId
    setAppointment(mockAppointment);
  }, [appointmentId]);

  // Generate dates for the current week
  const getWeekDates = (startDate) => {
    const dates = [];
    const start = new Date(startDate);
    start.setDate(start.getDate() - start.getDay()); // Start from Sunday
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates(currentWeekStart);

  // Mock time slots for each day
  const getTimeSlots = (date) => {
    const day = date.getDay();
    if (day === 0) return []; // Sunday - closed
    
    const morning = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"];
    const afternoon = ["2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"];
    const evening = ["5:00 PM", "5:30 PM"];
    
    // Mock availability - some slots are booked
    const bookedSlots = ["9:30 AM", "11:00 AM", "3:00 PM"];
    
    const allSlots = [...morning, ...afternoon, ...(day < 6 ? evening : [])];
    
    return allSlots.map(slot => ({
      time: slot,
      available: !bookedSlots.includes(slot)
    }));
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatFullDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameDate = (date1, date2) => {
    return date1?.toDateString() === date2?.toDateString();
  };

  const navigateWeek = (direction) => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(newStart.getDate() + (direction * 7));
    setCurrentWeekStart(newStart);
    setSelectedDate(null); // Reset selected date
    setSelectedTimeSlot(""); // Reset selected time
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(""); // Reset time slot when date changes
  };

  const handleReschedule = () => {
    if (!selectedDate || !selectedTimeSlot) {
      toast({
        title: "Missing Information",
        description: "Please select both date and time to reschedule.",
        variant: "destructive",
      });
      return;
    }

    // In real app, this would make API call to reschedule
    toast({
      title: "Appointment Rescheduled",
      description: `Your appointment has been rescheduled to ${formatFullDate(selectedDate)} at ${selectedTimeSlot}.`,
    });

    // Navigate back to appointments page
    setTimeout(() => {
      navigate("/appointment/management");
    }, 2000);
  };

  if (!appointment) {
    return <div>Loading...</div>;
  }

  const timeSlots = selectedDate ? getTimeSlots(selectedDate) : [];
  const canReschedule = selectedDate && selectedTimeSlot;

  return (
    <div className="min-h-screen bg-gradient-background pb-20">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-md shadow-sm border-b border-border sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
                <h1 className="text-xl font-bold text-gray-900">Reschedule Appointment</h1>
                <p className="text-sm text-gray-600">Select new date and time</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Current Appointment Info */}
        <MedicalCard className="border-l-4 border-l-orange-500">
          <MedicalCardHeader>
            <MedicalCardTitle>Current Appointment</MedicalCardTitle>
          </MedicalCardHeader>
          <MedicalCardContent>
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-primary text-white text-lg font-semibold">
                  {appointment.doctor.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">{appointment.doctor.name}</h3>
                <p className="text-primary font-medium">{appointment.doctor.specialty}</p>
                <p className="text-sm text-gray-600">{appointment.doctor.hospital}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">${appointment.fee}</p>
                <p className="text-xs text-gray-600">Consultation fee</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm text-orange-700">Current Date</p>
                  <p className="font-medium">{formatFullDate(appointment.currentDate)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm text-orange-700">Current Time</p>
                  <p className="font-medium">{appointment.currentTime}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {appointment.type === "Video Call" && <Video className="h-5 w-5 text-orange-600" />}
                {appointment.type === "Phone Call" && <Phone className="h-5 w-5 text-orange-600" />}
                {appointment.type === "In-Person" && <Building className="h-5 w-5 text-orange-600" />}
                <div>
                  <p className="text-sm text-orange-700">Type</p>
                  <Badge variant="secondary">{appointment.type}</Badge>
                </div>
              </div>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* Reschedule Reason */}
        <MedicalCard>
          <MedicalCardHeader>
            <MedicalCardTitle>Reason for Rescheduling (Optional)</MedicalCardTitle>
          </MedicalCardHeader>
          <MedicalCardContent>
            <Textarea
              placeholder="Please let us know why you need to reschedule..."
              value={rescheduleReason}
              onChange={(e) => setRescheduleReason(e.target.value)}
              className="min-h-[100px]"
            />
          </MedicalCardContent>
        </MedicalCard>

        {/* New Date Selection */}
        <MedicalCard>
          <MedicalCardHeader>
            <div className="flex items-center justify-between">
              <MedicalCardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Select New Date
              </MedicalCardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => navigateWeek(-1)}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigateWeek(1)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </MedicalCardHeader>
          <MedicalCardContent>
            <div className="grid grid-cols-7 gap-2">
              {weekDates.map((date, index) => (
                <button
                  key={index}
                  onClick={() => handleDateSelect(date)}
                  disabled={date < new Date().setHours(0,0,0,0) && !isToday(date)}
                  className={cn(
                    "p-3 rounded-lg text-center transition-colors",
                    "hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed",
                    isSameDate(date, selectedDate) 
                      ? "bg-primary text-white" 
                      : "bg-card border border-border",
                    isToday(date) && !isSameDate(date, selectedDate) && "border-primary",
                    isSameDate(date, appointment.currentDate) && "border-orange-500 bg-orange-50"
                  )}
                >
                  <div className="text-xs text-gray-600">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="font-semibold">
                    {date.getDate()}
                  </div>
                  <div className="text-xs">
                    {date.toLocaleDateString('en-US', { month: 'short' })}
                  </div>
                  {isSameDate(date, appointment.currentDate) && (
                    <div className="text-xs text-orange-600 font-medium mt-1">Current</div>
                  )}
                </button>
              ))}
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* New Time Selection */}
        {selectedDate && (
          <MedicalCard>
            <MedicalCardHeader>
              <MedicalCardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Available Time Slots - {formatDate(selectedDate)}
              </MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              {timeSlots.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && setSelectedTimeSlot(slot.time)}
                      disabled={!slot.available}
                      className={cn(
                        "p-3 rounded-lg border text-sm font-medium transition-colors",
                        slot.available 
                          ? "hover:bg-primary hover:text-white border-border" 
                          : "opacity-50 cursor-not-allowed bg-muted/30 border-border",
                        selectedTimeSlot === slot.time 
                          ? "bg-primary text-white border-primary" 
                          : "bg-card",
                        slot.time === appointment.currentTime && isSameDate(selectedDate, appointment.currentDate)
                          ? "border-orange-500 bg-orange-50"
                          : ""
                      )}
                    >
                      <div className="flex items-center justify-center gap-1">
                        {slot.available ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <AlertCircle className="h-3 w-3" />
                        )}
                        {slot.time}
                      </div>
                      <div className="text-xs mt-1">
                        {slot.available ? "Available" : "Booked"}
                      </div>
                      {slot.time === appointment.currentTime && isSameDate(selectedDate, appointment.currentDate) && (
                        <div className="text-xs text-orange-600 font-medium">Current</div>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No slots available</h3>
                  <p className="text-gray-600">The doctor is not available on this day. Please select another date.</p>
                </div>
              )}
            </MedicalCardContent>
          </MedicalCard>
        )}

        {/* Summary and Reschedule Button */}
        {canReschedule && (
          <MedicalCard className="border-l-4 border-l-green-500">
            <MedicalCardHeader>
              <MedicalCardTitle>New Appointment Summary</MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Doctor:</span>
                  <span className="font-medium">{appointment.doctor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">New Date:</span>
                  <span className="font-medium">{formatFullDate(selectedDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">New Time:</span>
                  <span className="font-medium">{selectedTimeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Consultation Type:</span>
                  <Badge variant="secondary">{appointment.type}</Badge>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-gray-600">Consultation Fee:</span>
                  <span className="text-xl font-bold text-primary">${appointment.fee}</span>
                </div>
              </div>
            </MedicalCardContent>
          </MedicalCard>
        )}

        {/* Reschedule Button */}
        <div className="sticky bottom-4">
          <Button 
            className="w-full h-14 text-lg"
            onClick={handleReschedule}
            disabled={!canReschedule}
          >
            Reschedule Appointment
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentReschedule;