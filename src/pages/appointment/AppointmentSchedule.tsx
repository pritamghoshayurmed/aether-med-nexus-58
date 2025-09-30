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
import { cn } from "@/lib/utils";
import { useDoctor, useDoctorAppointments } from "@/hooks/useDoctors";

const AppointmentSchedule = () => {
  const navigate = useNavigate();
  const { doctorId } = useParams();
  const { doctor, loading } = useDoctor(doctorId);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedConsultationType, setSelectedConsultationType] = useState("");
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  
  const formattedDate = selectedDate.toISOString().split('T')[0];
  const { bookedSlots, loading: slotsLoading } = useDoctorAppointments(doctorId, formattedDate);

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

  // Generate available time slots for a given date based on doctor's schedule
  const getTimeSlots = (date: Date) => {
    if (!doctor || !doctor.available_time_slots) return [];
    
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const daySlots = doctor.available_time_slots[dayName] || [];
    
    if (!Array.isArray(daySlots)) return [];
    
    return daySlots.map(slot => ({
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

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameDate = (date1, date2) => {
    return date1.toDateString() === date2.toDateString();
  };

  const navigateWeek = (direction) => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(newStart.getDate() + (direction * 7));
    setCurrentWeekStart(newStart);
    
    // If selected date is no longer in view, reset selection
    const newWeekDates = getWeekDates(newStart);
    if (!newWeekDates.some(date => isSameDate(date, selectedDate))) {
      setSelectedDate(newWeekDates[1]); // Select Monday by default
      setSelectedTimeSlot("");
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(""); // Reset time slot when date changes
  };

  const handleContinue = () => {
    if (!selectedDate || !selectedTimeSlot || !selectedConsultationType) {
      return;
    }

    navigate(`/appointment/doctor/${doctorId}/confirmation`, {
      state: {
        doctor,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        consultationType: selectedConsultationType
      }
    });
  };

  const weekDates = getWeekDates(currentWeekStart);
  const timeSlots = getTimeSlots(selectedDate);
  const canContinue = selectedDate && selectedTimeSlot && selectedConsultationType;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading doctor information...</p>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-4">Doctor not found</p>
          <Button onClick={() => navigate('/appointment/booking')}>
            Back to Doctors
          </Button>
        </div>
      </div>
    );
  }

  const doctorInitials = doctor.profiles?.full_name
    ?.split(' ')
    .map(n => n[0])
    .join('') || 'DR';

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
                <h1 className="text-xl font-bold text-foreground">Schedule Appointment</h1>
                <p className="text-sm text-muted-foreground">Select date, time & consultation type</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Doctor Info */}
        <MedicalCard>
          <MedicalCardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="text-xl font-semibold bg-primary text-primary-foreground">
                  {doctorInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground">{doctor.profiles?.full_name || 'Doctor'}</h3>
                <p className="text-primary font-medium">{doctor.specialty}</p>
                <p className="text-sm text-muted-foreground">{doctor.qualification}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">${doctor.consultation_fee || 0}</p>
                <p className="text-xs text-muted-foreground">Consultation fee</p>
              </div>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* Consultation Type Selection */}
        <MedicalCard>
          <MedicalCardHeader>
            <MedicalCardTitle>Select Consultation Type</MedicalCardTitle>
          </MedicalCardHeader>
          <MedicalCardContent className="space-y-4">
            <RadioGroup value={selectedConsultationType} onValueChange={setSelectedConsultationType}>
              {['video', 'in-person', 'phone'].map((type) => (
                <div key={type} className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value={type} id={type} />
                  <Label htmlFor={type} className="flex items-center space-x-3 cursor-pointer flex-1">
                    <div className="flex items-center space-x-3">
                      {type === "video" && <Video className="h-5 w-5 text-primary" />}
                      {type === "phone" && <Phone className="h-5 w-5 text-primary" />}
                      {type === "in-person" && <Building className="h-5 w-5 text-primary" />}
                      <div>
                        <p className="font-medium capitalize">{type.replace('-', ' ')}</p>
                        <p className="text-sm text-muted-foreground">
                          {type === "video" && "Connect via secure video call from anywhere"}
                          {type === "phone" && "Audio consultation over the phone"}
                          {type === "in-person" && "Visit the doctor's clinic in person"}
                        </p>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </MedicalCardContent>
        </MedicalCard>

        {/* Date Selection */}
        <MedicalCard>
          <MedicalCardHeader>
            <div className="flex items-center justify-between">
              <MedicalCardTitle>Select Date</MedicalCardTitle>
              <div className="flex items-center space-x-2">
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
                <div
                  key={index}
                  onClick={() => handleDateSelect(date)}
                  className={cn(
                    "p-3 text-center rounded-lg cursor-pointer transition-colors",
                    "hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed",
                    isSameDate(date, selectedDate) 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-card border border-border",
                    isToday(date) && "ring-2 ring-primary ring-opacity-50"
                  )}
                >
                  <div className="text-xs text-muted-foreground">
                    {formatDate(date).split(' ')[0]}
                  </div>
                  <div className="text-lg font-semibold">
                    {date.getDate()}
                  </div>
                </div>
              ))}
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* Time Slot Selection */}
        <MedicalCard>
          <MedicalCardHeader>
            <MedicalCardTitle>Select Time Slot</MedicalCardTitle>
          </MedicalCardHeader>
          <MedicalCardContent>
            {timeSlots.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot.time}
                    variant={selectedTimeSlot === slot.time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTimeSlot(slot.time)}
                    disabled={!slot.available}
                    className={cn(
                      "p-3",
                      slot.available 
                        ? selectedTimeSlot === slot.time 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-primary hover:text-white border-border" 
                        : "opacity-50 cursor-not-allowed bg-muted/30 border-border",
                    )}
                  >
                    {slot.time}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No slots available</h3>
                <p className="text-muted-foreground">The doctor is not available on this day. Please select another date.</p>
              </div>
            )}
          </MedicalCardContent>
        </MedicalCard>

        {/* Summary & Continue */}
        {canContinue && (
          <MedicalCard>
            <MedicalCardHeader>
              <MedicalCardTitle>Appointment Summary</MedicalCardTitle>
            </MedicalCardHeader>
            <MedicalCardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Doctor:</span>
                <span className="font-medium">{doctor.profiles?.full_name || 'Doctor'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Consultation Type:</span>
                <span className="font-medium capitalize">{selectedConsultationType.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">{selectedDate.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time:</span>
                <span className="font-medium">{selectedTimeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Consultation Fee:</span>
                <span className="font-medium text-primary">${doctor.consultation_fee || 0}</span>
              </div>
            </MedicalCardContent>
          </MedicalCard>
        )}

        {/* Continue Button */}
        <div className="sticky bottom-4">
          <Button 
            onClick={handleContinue}
            disabled={!canContinue}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3"
            size="lg"
          >
            {!selectedDate && "Select Date"}
            {selectedDate && !selectedTimeSlot && "Select Time Slot"}
            {selectedDate && selectedTimeSlot && !selectedConsultationType && "Select Consultation Type"}
            {canContinue && "Continue to Confirmation"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSchedule;