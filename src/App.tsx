import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import HospitalDashboard from "./pages/dashboard/HospitalDashboard";
import SuperAdminDashboard from "./pages/dashboard/SuperAdminDashboard";
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
import PatientManagement from "./pages/dashboard/doctor/PatientManagement";
import DoctorSchedule from "./pages/dashboard/doctor/DoctorSchedule";
import DoctorChat from "./pages/dashboard/doctor/DoctorChat";
import AIAnalytics from "./pages/dashboard/doctor/AIAnalytics";
import PrescriptionGenerator from "./pages/dashboard/doctor/PrescriptionGenerator";
import RevenueTracking from "./pages/dashboard/doctor/RevenueTracking";
import Resources from "./pages/dashboard/hospital/Resources";
import HospitalAppointments from "./pages/dashboard/hospital/Appointments";
import Staff from "./pages/dashboard/hospital/Staff";
import Reports from "./pages/dashboard/hospital/Reports";
import SupplyChain from "./pages/dashboard/hospital/SupplyChain";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
            <Route path="/dashboard/patient" element={<PatientDashboard />} />
            <Route path="/dashboard/patient/appointments" element={<PatientAppointments />} />
            <Route path="/dashboard/patient/vitals" element={<PatientVitals />} />
            <Route path="/dashboard/patient/ai-chat" element={<PatientAIChat />} />
            <Route path="/dashboard/patient/settings" element={<PatientSettings />} />
            <Route path="/dashboard/patient/hospital-beds" element={<HospitalBeds />} />
            <Route path="/dashboard/patient/doctor-chat" element={<PatientDoctorChat />} />
            <Route path="/dashboard/patient/video-call" element={<VideoCall />} />
            <Route path="/dashboard/patient/medical-records" element={<MedicalRecords />} />
            <Route path="/dashboard/patient/prescriptions" element={<Prescriptions />} />
            <Route path="/dashboard/patient/emergency" element={<EmergencyServices />} />
            <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
            <Route path="/dashboard/doctor/patients" element={<PatientManagement />} />
            <Route path="/dashboard/doctor/schedule" element={<DoctorSchedule />} />
            <Route path="/dashboard/doctor/chat" element={<DoctorChat />} />
            <Route path="/dashboard/doctor/analytics" element={<AIAnalytics />} />
            <Route path="/dashboard/doctor/prescription" element={<PrescriptionGenerator />} />
            <Route path="/dashboard/doctor/revenue" element={<RevenueTracking />} />
            <Route path="/dashboard/hospital" element={<HospitalDashboard />} />
            <Route path="/dashboard/hospital/resources" element={<Resources />} />
            <Route path="/dashboard/hospital/appointments" element={<HospitalAppointments />} />
            <Route path="/dashboard/hospital/staff" element={<Staff />} />
            <Route path="/dashboard/hospital/reports" element={<Reports />} />
            <Route path="/dashboard/hospital/supply-chain" element={<SupplyChain />} />
            <Route path="/dashboard/admin" element={<SuperAdminDashboard />} />
            <Route path="/dashboard/admin/analytics" element={<SuperAdminDashboard />} />
            <Route path="/dashboard/admin/compliance" element={<SuperAdminDashboard />} />
            <Route path="/dashboard/admin/supply-chain" element={<SuperAdminDashboard />} />
            <Route path="/dashboard/admin/complaints" element={<SuperAdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
