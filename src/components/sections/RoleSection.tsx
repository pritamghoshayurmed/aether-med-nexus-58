import {
  User,
  Stethoscope,
  Calendar,
  MessageSquare,
  BarChart3,
  Brain,
  Heart,
  FileText,
  Users,
  Activity,
  Mic,
  Video,
  Wallet,
  Globe,
  Clock,
  Volume2,
  Zap,
  Shield,
  Smartphone
} from "lucide-react";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { MedicalButton } from "@/components/ui/medical-button";
import { useNavigate } from "react-router-dom";

const RoleSection = () => {
  const navigate = useNavigate();
  const roles = [
    {
      id: "patient",
      title: "For Patients",
      subtitle: "The Seeker",
      icon: User,
      description: "Comprehensive healthcare at your fingertips with low-tech accessibility",
      features: [
        { icon: Mic, text: "Voice-First Search in local languages", highlight: true },
        { icon: Users, text: "Family Profiles (The Vault) - Up to 6 members" },
        { icon: Video, text: "HD Video with Adaptive Lite Mode" },
        { icon: Clock, text: "Live Token & Wait Time Tracking" },
        { icon: Heart, text: "PPG Vital Scan via Camera" },
        { icon: Wallet, text: "Kabiraj Wallet & UPI Payments" },
        { icon: Volume2, text: "Audio Prescriptions in your language" },
        { icon: Smartphone, text: "Offline Health Records Access" },
      ],
      gradient: "bg-gradient-to-br from-primary/20 via-primary-glow/10 to-transparent",
      buttonText: "Patient Portal",
      badge: "For Low-Tech Users"
    },
    {
      id: "doctor",
      title: "For Doctors",
      subtitle: "The Healer",
      icon: Stethoscope,
      description: "Efficiency-focused tools for time-constrained medical professionals",
      features: [
        { icon: Brain, text: "AI Scribe - Auto-generates clinical notes", highlight: true },
        { icon: Calendar, text: "Smart Slot Management & Availability" },
        { icon: Globe, text: "Bhasha Setu - Real-time Translation" },
        { icon: Activity, text: "Live Vitals Overlay during calls" },
        { icon: FileText, text: "One-Tap Rx Templates" },
        { icon: Zap, text: "Remote Camera Control for Diagnosis" },
        { icon: BarChart3, text: "Revenue Tracking & Escrow System" },
        { icon: Shield, text: "Medical Council Verified Profile" },
      ],
      gradient: "bg-gradient-to-br from-success/20 via-primary/10 to-transparent",
      buttonText: "Doctor Dashboard",
      badge: "Fast & Efficient"
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-success/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Two Portals, One Mission
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Tailored Solutions</span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground/80">for Patients & Doctors</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Whether you're seeking care or providing it, our AI-powered platform adapts to your needs
            with voice-first accessibility and efficiency-focused design.
          </p>
        </div>

        {/* Role Cards Grid - 2 cards side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 max-w-6xl mx-auto">
          {roles.map((role) => (
            <div key={role.id} id={role.id} className="role-card-anchor">
              <MedicalCard
                variant="glass"
                className="role-card group h-full hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
              >
                <MedicalCardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`p-4 rounded-2xl ${role.gradient} group-hover:scale-110 transition-transform duration-300`}>
                        <role.icon className="h-10 w-10 text-primary" />
                      </div>
                      <div>
                        <MedicalCardTitle className="text-2xl sm:text-3xl group-hover:text-primary transition-colors">
                          {role.title}
                        </MedicalCardTitle>
                        <p className="text-sm text-primary/80 font-medium">{role.subtitle}</p>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium whitespace-nowrap">
                      {role.badge}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm sm:text-base">{role.description}</p>
                </MedicalCardHeader>

                <MedicalCardContent className="pt-0">
                  <ul className="space-y-3 mb-8">
                    {role.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className={`flex items-center space-x-3 ${feature.highlight ? 'bg-primary/5 -mx-2 px-2 py-2 rounded-lg' : ''}`}
                      >
                        <div className={`p-2 rounded-lg ${feature.highlight ? 'bg-primary/20' : 'bg-primary/10'}`}>
                          <feature.icon className={`h-4 w-4 ${feature.highlight ? 'text-primary' : 'text-primary/80'}`} />
                        </div>
                        <span className={`text-sm ${feature.highlight ? 'font-semibold text-foreground' : 'text-foreground/90'}`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <MedicalButton
                    variant="medical"
                    className="w-full group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300 text-base py-6"
                    onClick={() => {
                      if (role.id === "patient") {
                        navigate("/dashboard/patient");
                      } else if (role.id === "doctor") {
                        navigate("/dashboard/doctor");
                      }
                      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                    }}
                  >
                    {role.buttonText}
                  </MedicalButton>
                </MedicalCardContent>
              </MedicalCard>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 sm:mt-20">
          <MedicalCard variant="glass" className="max-w-2xl mx-auto border-primary/20">
            <MedicalCardContent className="text-center py-10">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-success/20 flex items-center justify-center">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 gradient-text">
                Ready to Transform Healthcare?
              </h3>
              <p className="text-muted-foreground mb-8 text-lg">
                Join thousands of patients and doctors already using Kabiraj AI
                to deliver better healthcare outcomes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MedicalButton variant="medical" size="lg" onClick={() => navigate('/register')}>
                  Get Started Free
                </MedicalButton>
                <MedicalButton variant="outline" size="lg" onClick={() => navigate('/login')}>
                  Sign In
                </MedicalButton>
              </div>
            </MedicalCardContent>
          </MedicalCard>
        </div>
      </div>
    </section>
  );
};

export default RoleSection;
