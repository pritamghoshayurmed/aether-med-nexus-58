import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Video,
  Phone,
  Building,
  User,
  Mail,
  MessageSquare,
  CreditCard,
  Shield,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateAppointment } from "@/hooks/useDoctors";
import { usePatient } from "@/hooks/useDatabase";
import { useAuth } from "@/contexts/AuthContext";

const AppointmentConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { doctor, date, timeSlot, consultationType } = location.state || {};
  const { createAppointment, creating } = useCreateAppointment();
  const { patient } = usePatient();
  const { user } = useAuth();

  const [patientInfo, setPatientInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    symptoms: "",
    notes: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState({
    name: "",
    phone: "",
    relationship: ""
  });

  const handleInputChange = (field, value) => {
    setPatientInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmergencyContactChange = (field, value) => {
    setEmergencyContact(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isFormValid = () => {
    return (
      patientInfo.firstName &&
      patientInfo.lastName &&
      patientInfo.email &&
      patientInfo.phone &&
      patientInfo.dateOfBirth &&
      patientInfo.gender &&
      paymentMethod &&
      agreedToTerms
    );
  };

  const handleBookAppointment = async () => {
    if (!isFormValid() || !patient || !doctor) return;
    
    const formattedDate = date.toISOString().split('T')[0];
    
    // Convert time slot to 24-hour format for database
    const convertTo24Hour = (time12h: string) => {
      const [time, modifier] = time12h.split(' ');
      let [hours, minutes] = time.split(':');
      if (hours === '12') {
        hours = modifier === 'AM' ? '00' : '12';
      } else if (modifier === 'PM') {
        hours = String(parseInt(hours, 10) + 12);
      }
      return `${hours.padStart(2, '0')}:${minutes}:00`;
    };
    
    const result = await createAppointment({
      patient_id: patient.id,
      doctor_id: doctor.id,
      appointment_date: formattedDate,
      appointment_time: convertTo24Hour(timeSlot),
      appointment_type: consultationType as 'video' | 'in-person' | 'phone',
      reason: patientInfo.symptoms || undefined,
      consultation_fee: doctor.consultation_fee || 0,
    });
    
    if (result) {
      navigate("/appointment/success", {
        state: {
          appointmentDetails: {
            doctor,
            date: formattedDate,
            timeSlot,
            consultationType,
            patientInfo,
            paymentMethod,
            appointmentId: result.id
          }
        }
      });
    }
  };

  if (!doctor || !date || !timeSlot || !consultationType) {
    navigate("/appointment/booking");
    return null;
  }

  const doctorInitials = doctor.profiles?.full_name
    ?.split(' ')
    .map((n: string) => n[0])
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
                <h1 className="text-xl font-bold text-foreground">Confirm Appointment</h1>
                <p className="text-sm text-muted-foreground">Review details and provide information</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Appointment Summary */}
        <MedicalCard>
          <MedicalCardHeader>
            <MedicalCardTitle>Appointment Summary</MedicalCardTitle>
          </MedicalCardHeader>
          <MedicalCardContent>
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-primary text-white text-lg font-semibold">
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

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{formatDate(date)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{timeSlot}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {consultationType === "Video Call" && <Video className="h-5 w-5 text-primary" />}
                  {consultationType === "Phone Call" && <Phone className="h-5 w-5 text-primary" />}
                  {consultationType === "In-Person" && <Building className="h-5 w-5 text-primary" />}
                  <div>
                    <p className="text-sm text-muted-foreground">Consultation Type</p>
                    <Badge variant="secondary">{consultationType}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* Patient Information */}
        <MedicalCard>
          <MedicalCardHeader>
            <MedicalCardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Patient Information
            </MedicalCardTitle>
          </MedicalCardHeader>
          <MedicalCardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={patientInfo.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="Enter first name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={patientInfo.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Enter last name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={patientInfo.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter email address"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={patientInfo.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter phone number"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={patientInfo.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Gender *</Label>
                <Select onValueChange={(value) => handleInputChange("gender", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* Emergency Contact */}
        <MedicalCard>
          <MedicalCardHeader>
            <MedicalCardTitle>Emergency Contact</MedicalCardTitle>
          </MedicalCardHeader>
          <MedicalCardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="emergencyName">Contact Name</Label>
                <Input
                  id="emergencyName"
                  value={emergencyContact.name}
                  onChange={(e) => handleEmergencyContactChange("name", e.target.value)}
                  placeholder="Enter name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="emergencyPhone">Phone Number</Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  value={emergencyContact.phone}
                  onChange={(e) => handleEmergencyContactChange("phone", e.target.value)}
                  placeholder="Enter phone number"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="relationship">Relationship</Label>
                <Select onValueChange={(value) => handleEmergencyContactChange("relationship", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="sibling">Sibling</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* Medical Information */}
        <MedicalCard>
          <MedicalCardHeader>
            <MedicalCardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Medical Information
            </MedicalCardTitle>
          </MedicalCardHeader>
          <MedicalCardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="symptoms">Current Symptoms</Label>
                <Textarea
                  id="symptoms"
                  value={patientInfo.symptoms}
                  onChange={(e) => handleInputChange("symptoms", e.target.value)}
                  placeholder="Describe your current symptoms..."
                  className="mt-1 min-h-[100px]"
                />
              </div>
              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={patientInfo.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Any additional information you'd like the doctor to know..."
                  className="mt-1"
                />
              </div>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* Payment Method */}
        <MedicalCard>
          <MedicalCardHeader>
            <MedicalCardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Payment Method
            </MedicalCardTitle>
          </MedicalCardHeader>
          <MedicalCardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Credit/Debit Card</p>
                        <p className="text-sm text-muted-foreground">Pay securely with your card</p>
                      </div>
                      <CreditCard className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <RadioGroupItem value="insurance" id="insurance" />
                  <Label htmlFor="insurance" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Insurance</p>
                        <p className="text-sm text-muted-foreground">Use your health insurance</p>
                      </div>
                      <Shield className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 p-4 border rounded-lg">
                  <RadioGroupItem value="pay-later" id="pay-later" />
                  <Label htmlFor="pay-later" className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Pay at Clinic</p>
                        <p className="text-sm text-muted-foreground">Pay when you visit (In-person only)</p>
                      </div>
                      <Building className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </MedicalCardContent>
        </MedicalCard>

        {/* Terms and Total */}
        <MedicalCard>
          <MedicalCardContent>
            <div className="space-y-4">
              <Separator />
              
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">Total Amount:</span>
                <span className="text-2xl font-bold text-primary">${doctor.fee}</span>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="terms" 
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                  I agree to the{" "}
                  <a href="/terms-and-condition" className="text-primary underline">
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="/privacy-policy" className="text-primary underline">
                    Privacy Policy
                  </a>. I understand that this appointment is subject to the doctor's availability and may be rescheduled if necessary.
                </Label>
              </div>

              {!isFormValid() && (
                <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <p className="text-sm text-yellow-800">
                    Please fill in all required fields to continue.
                  </p>
                </div>
              )}
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* Book Appointment Button */}
        <div className="sticky bottom-4">
          <Button 
            className="w-full h-14 text-lg"
            onClick={handleBookAppointment}
            disabled={!isFormValid() || creating}
          >
            {creating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Booking...
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5 mr-2" />
                Book Appointment - ${doctor.consultation_fee || 0}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;