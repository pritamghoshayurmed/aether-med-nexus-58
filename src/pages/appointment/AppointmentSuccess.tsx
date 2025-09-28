import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  CheckCircle, 
  Calendar, 
  Clock, 
  Video,
  Phone,
  Building,
  User,
  Download,
  Share2,
  MessageCircle,
  Home,
  Copy,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const AppointmentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { appointmentDetails } = location.state || {};
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!appointmentDetails) {
      navigate("/appointment/booking");
    }
  }, [appointmentDetails, navigate]);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleCopyAppointmentId = () => {
    navigator.clipboard.writeText(appointmentDetails.appointmentId);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Appointment ID copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadConfirmation = () => {
    // In real app, this would generate and download a PDF confirmation
    toast({
      title: "Download Started",
      description: "Your appointment confirmation is being downloaded",
    });
  };

  const handleShareAppointment = () => {
    // In real app, this would open share dialog
    toast({
      title: "Share Options",
      description: "Share functionality would open here",
    });
  };

  if (!appointmentDetails) {
    return null;
  }

  const { doctor, date, timeSlot, consultationType, patientInfo, appointmentId } = appointmentDetails;

  return (
    <div className="min-h-screen bg-gradient-background pb-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Appointment Confirmed!</h1>
          <p className="text-lg text-muted-foreground">
            Your appointment has been successfully booked with {doctor.name}
          </p>
        </div>

        {/* Appointment Details Card */}
        <MedicalCard className="mb-6">
          <MedicalCardHeader>
            <div className="flex justify-between items-start">
              <MedicalCardTitle>Appointment Details</MedicalCardTitle>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Confirmed
              </Badge>
            </div>
          </MedicalCardHeader>
          <MedicalCardContent>
            <div className="space-y-6">
              {/* Appointment ID */}
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Appointment ID</p>
                  <p className="font-mono font-semibold text-lg">{appointmentId}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyAppointmentId}
                  className="flex items-center gap-2"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>

              {/* Doctor Info */}
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-primary text-white text-lg font-semibold">
                    {doctor.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground">{doctor.name}</h3>
                  <p className="text-primary font-medium">{doctor.specialty}</p>
                  <p className="text-sm text-muted-foreground">{doctor.hospital}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">${doctor.fee}</p>
                  <p className="text-xs text-muted-foreground">Consultation fee</p>
                </div>
              </div>

              <Separator />

              {/* Appointment Schedule */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-semibold">{formatDate(date)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-semibold">{timeSlot}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {consultationType === "Video Call" && <Video className="h-6 w-6 text-primary" />}
                  {consultationType === "Phone Call" && <Phone className="h-6 w-6 text-primary" />}
                  {consultationType === "In-Person" && <Building className="h-6 w-6 text-primary" />}
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <Badge variant="secondary">{consultationType}</Badge>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Patient Info */}
              <div className="flex items-center gap-3">
                <User className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Patient</p>
                  <p className="font-semibold">
                    {patientInfo.firstName} {patientInfo.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">{patientInfo.email}</p>
                </div>
              </div>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* Important Information */}
        <MedicalCard className="mb-6">
          <MedicalCardHeader>
            <MedicalCardTitle>Important Information</MedicalCardTitle>
          </MedicalCardHeader>
          <MedicalCardContent>
            <div className="space-y-4">
              {consultationType === "Video Call" && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Video Call Instructions</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• You will receive a video call link via email 15 minutes before your appointment</li>
                    <li>• Ensure you have a stable internet connection</li>
                    <li>• Test your camera and microphone beforehand</li>
                    <li>• Find a quiet, well-lit space for the consultation</li>
                  </ul>
                </div>
              )}

              {consultationType === "Phone Call" && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Phone Call Instructions</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• The doctor will call you at {patientInfo.phone} at the scheduled time</li>
                    <li>• Please ensure your phone is available and charged</li>
                    <li>• Find a quiet location for the consultation</li>
                    <li>• Have your medical records ready if needed</li>
                  </ul>
                </div>
              )}

              {consultationType === "In-Person" && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-900 mb-2">In-Person Visit Instructions</h4>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• Arrive 15 minutes early for check-in</li>
                    <li>• Bring a valid ID and insurance card</li>
                    <li>• Bring your medical records and current medications list</li>
                    <li>• Follow hospital safety protocols</li>
                  </ul>
                </div>
              )}

              <div className="p-4 bg-muted/30 border border-border rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Cancellation Policy</h4>
                <p className="text-sm text-muted-foreground">
                  You can cancel or reschedule your appointment up to 24 hours before the scheduled time without any charges. 
                  For cancellations within 24 hours, a cancellation fee may apply.
                </p>
              </div>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Button variant="outline" onClick={handleDownloadConfirmation}>
            <Download className="h-4 w-4 mr-2" />
            Download Confirmation
          </Button>
          
          <Button variant="outline" onClick={handleShareAppointment}>
            <Share2 className="h-4 w-4 mr-2" />
            Share Appointment
          </Button>
          
          <Button variant="outline" onClick={() => navigate("/dashboard/patient/doctor-chat")}>
            <MessageCircle className="h-4 w-4 mr-2" />
            Message Doctor
          </Button>
        </div>

        {/* Next Steps */}
        <MedicalCard className="mb-8">
          <MedicalCardHeader>
            <MedicalCardTitle>What's Next?</MedicalCardTitle>
          </MedicalCardHeader>
          <MedicalCardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Before Your Appointment</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    Prepare a list of your symptoms and questions
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    Gather your medical history and current medications
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    Set a reminder 30 minutes before your appointment
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-3">Need Help?</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    Contact our support team at support@aether-med.com
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    Call our helpline: +1 (555) 123-4567
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    Visit our FAQ section for common questions
                  </li>
                </ul>
              </div>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            className="flex-1"
            onClick={() => navigate("/dashboard/patient")}
          >
            <Home className="h-4 w-4 mr-2" />
            Go to Dashboard
          </Button>
          
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => navigate("/dashboard/patient/appointments")}
          >
            <Calendar className="h-4 w-4 mr-2" />
            View My Appointments
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSuccess;