import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import AboutUs from "./pages/AboutUs";
import Support from "./pages/Support";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndCondition from "./pages/TermsAndCondition";
import PatientDashboard from "./pages/dashboard/PatientDashboard";
import DoctorDashboard from "./pages/dashboard/DoctorDashboard";
import PatientAppointments from "./pages/dashboard/patient/Appointments";
import PatientVitals from "./pages/dashboard/patient/Vitals";
import PatientAIChat from "./pages/dashboard/patient/AIChat";
import PatientSettings from "./pages/dashboard/patient/Settings";
import HospitalBeds from "./pages/dashboard/patient/HospitalBeds";
import PatientDoctorChat from "./pages/dashboard/patient/DoctorChat";
import VideoCall from "./pages/dashboard/patient/VideoCall";
import MedicalRecords from "./pages/dashboard/patient/MedicalRecords";
import Prescriptions from "./pages/dashboard/patient/Prescriptions";
import EmergencyServices from "./pages/dashboard/patient/EmergencyServices";
import Profile from "./pages/dashboard/patient/Profile";
import LabResults from "./pages/dashboard/patient/LabResults";
import Insurance from "./pages/dashboard/patient/Insurance";
import FamilyMembers from "./pages/dashboard/patient/FamilyMembers";
import Billing from "./pages/dashboard/patient/Billing";
import Notifications from "./pages/dashboard/patient/Notifications";
import FindDoctors from "./pages/dashboard/patient/FindDoctors";
import PatientManagement from "./pages/dashboard/doctor/PatientManagement";
import DoctorSchedule from "./pages/dashboard/doctor/DoctorSchedule";
import DoctorChat from "./pages/dashboard/doctor/DoctorChat";
import AIAnalytics from "./pages/dashboard/doctor/AIAnalytics";
import PrescriptionGenerator from "./pages/dashboard/doctor/PrescriptionGenerator";
import RevenueTracking from "./pages/dashboard/doctor/RevenueTracking";
import NotFound from "./pages/NotFound";
import AppointmentBooking from "./pages/appointment/AppointmentBooking";
import DoctorProfile from "./pages/appointment/DoctorProfile";
import AppointmentSchedule from "./pages/appointment/AppointmentSchedule";
import AppointmentConfirmation from "./pages/appointment/AppointmentConfirmation";
import AppointmentSuccess from "./pages/appointment/AppointmentSuccess";
import AppointmentManagement from "./pages/appointment/AppointmentManagement";
import AppointmentReschedule from "./pages/appointment/AppointmentReschedule";
import VitalsMeasurement from "./pages/dashboard/VitalsMeasurement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/support" element={<Support />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-condition" element={<TermsAndCondition />} />

            {/* Protected Patient Routes */}
            <Route path="/dashboard/patient" element={<ProtectedRoute allowedRoles={['patient']}><PatientDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/patient/appointments" element={<ProtectedRoute allowedRoles={['patient']}><AppointmentManagement /></ProtectedRoute>} />
            <Route path="/dashboard/patient/vitals" element={<ProtectedRoute allowedRoles={['patient']}><PatientVitals /></ProtectedRoute>} />
            <Route path="/dashboard/patient/vitals/measure" element={<ProtectedRoute allowedRoles={['patient']}><VitalsMeasurement /></ProtectedRoute>} />
            <Route path="/dashboard/patient/ai-chat" element={<ProtectedRoute allowedRoles={['patient']}><PatientAIChat /></ProtectedRoute>} />
            <Route path="/dashboard/patient/settings" element={<ProtectedRoute allowedRoles={['patient']}><PatientSettings /></ProtectedRoute>} />
            <Route path="/dashboard/patient/hospital-beds" element={<ProtectedRoute allowedRoles={['patient']}><HospitalBeds /></ProtectedRoute>} />
            <Route path="/dashboard/patient/doctor-chat" element={<ProtectedRoute allowedRoles={['patient']}><PatientDoctorChat /></ProtectedRoute>} />
            <Route path="/dashboard/patient/video-call" element={<ProtectedRoute allowedRoles={['patient']}><VideoCall /></ProtectedRoute>} />
            <Route path="/dashboard/patient/medical-records" element={<ProtectedRoute allowedRoles={['patient']}><MedicalRecords /></ProtectedRoute>} />
            <Route path="/dashboard/patient/prescriptions" element={<ProtectedRoute allowedRoles={['patient']}><Prescriptions /></ProtectedRoute>} />
            <Route path="/dashboard/patient/emergency" element={<ProtectedRoute allowedRoles={['patient']}><EmergencyServices /></ProtectedRoute>} />
            <Route path="/dashboard/patient/profile" element={<ProtectedRoute allowedRoles={['patient']}><Profile /></ProtectedRoute>} />
            <Route path="/dashboard/patient/lab-results" element={<ProtectedRoute allowedRoles={['patient']}><LabResults /></ProtectedRoute>} />
            <Route path="/dashboard/patient/insurance" element={<ProtectedRoute allowedRoles={['patient']}><Insurance /></ProtectedRoute>} />
            <Route path="/dashboard/patient/family-members" element={<ProtectedRoute allowedRoles={['patient']}><FamilyMembers /></ProtectedRoute>} />
            <Route path="/dashboard/patient/billing" element={<ProtectedRoute allowedRoles={['patient']}><Billing /></ProtectedRoute>} />
            <Route path="/dashboard/patient/notifications" element={<ProtectedRoute allowedRoles={['patient']}><Notifications /></ProtectedRoute>} />
            <Route path="/dashboard/patient/find-doctors" element={<ProtectedRoute allowedRoles={['patient']}><FindDoctors /></ProtectedRoute>} />

            {/* Protected Doctor Routes */}
            <Route path="/dashboard/doctor" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/doctor/patients" element={<ProtectedRoute allowedRoles={['doctor']}><PatientManagement /></ProtectedRoute>} />
            <Route path="/dashboard/doctor/schedule" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorSchedule /></ProtectedRoute>} />
            <Route path="/dashboard/doctor/chat" element={<ProtectedRoute allowedRoles={['doctor']}><DoctorChat /></ProtectedRoute>} />
            <Route path="/dashboard/doctor/analytics" element={<ProtectedRoute allowedRoles={['doctor']}><AIAnalytics /></ProtectedRoute>} />
            <Route path="/dashboard/doctor/prescription" element={<ProtectedRoute allowedRoles={['doctor']}><PrescriptionGenerator /></ProtectedRoute>} />
            <Route path="/dashboard/doctor/revenue" element={<ProtectedRoute allowedRoles={['doctor']}><RevenueTracking /></ProtectedRoute>} />

            {/* Appointment Booking Routes */}
            <Route path="/appointment/booking" element={<AppointmentBooking />} />
            <Route path="/appointment/doctor/:doctorId" element={<DoctorProfile />} />
            <Route path="/appointment/doctor/:doctorId/schedule" element={<AppointmentSchedule />} />
            <Route path="/appointment/doctor/:doctorId/confirmation" element={<AppointmentConfirmation />} />
            <Route path="/appointment/success" element={<AppointmentSuccess />} />
            <Route path="/appointment/management" element={<AppointmentManagement />} />
            <Route path="/appointment/reschedule/:appointmentId" element={<AppointmentReschedule />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
