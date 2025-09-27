import { 
  User, 
  Stethoscope, 
  Building2, 
  Shield, 
  Calendar,
  MessageSquare,
  BarChart3,
  Brain,
  Heart,
  FileText,
  Users,
  Activity
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
      icon: User,
      description: "Comprehensive healthcare at your fingertips",
      features: [
        { icon: Calendar, text: "Easy doctor appointment booking" },
        { icon: MessageSquare, text: "HD video consultations" },
        { icon: Brain, text: "AI-powered symptom analysis" },
        { icon: Heart, text: "Vital signs monitoring" },
        { icon: Activity, text: "Real-time hospital resources" },
      ],
      gradient: "bg-gradient-to-br from-primary/20 to-primary-glow/20",
      buttonText: "Patient Portal"
    },
    {
      id: "doctor",
      title: "For Doctors",
      icon: Stethoscope,
      description: "Advanced tools for modern medical practice",
      features: [
        { icon: Users, text: "Complete patient management" },
        { icon: BarChart3, text: "Revenue tracking dashboard" },
        { icon: Brain, text: "AI-powered medical analysis" },
        { icon: MessageSquare, text: "Secure doctor collaboration" },
        { icon: FileText, text: "Digital prescriptions" },
      ],
      gradient: "bg-gradient-to-br from-success/20 to-primary/20",
      buttonText: "Doctor Dashboard"
    },
    {
      id: "hospital",
      title: "For Hospitals",
      icon: Building2,
      description: "Streamlined hospital operations and management",
      features: [
        { icon: Activity, text: "Resource management system" },
        { icon: Calendar, text: "Appointment coordination" },
        { icon: BarChart3, text: "Operational analytics" },
        { icon: Users, text: "Staff management tools" },
        { icon: FileText, text: "Supply chain tracking" },
      ],
      gradient: "bg-gradient-to-br from-warning/20 to-success/20",
      buttonText: "Hospital Portal"
    },
    {
      id: "admin",
      title: "For Administrators",
      icon: Shield,
      description: "Comprehensive system oversight and compliance",
      features: [
        { icon: BarChart3, text: "Advanced system analytics" },
        { icon: Shield, text: "Compliance monitoring" },
        { icon: Activity, text: "Supply chain oversight" },
        { icon: MessageSquare, text: "Feedback management" },
        { icon: FileText, text: "Audit trail system" },
      ],
      gradient: "bg-gradient-to-br from-destructive/20 to-warning/20",
      buttonText: "Admin Console"
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="gradient-text">Tailored Solutions</span>
            <br />
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">for Every Healthcare Role</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
            Our platform provides specialized interfaces and tools designed for each stakeholder 
            in the healthcare ecosystem, powered by cutting-edge AI and real-time connectivity.
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {roles.map((role) => (
            <div key={role.id} id={role.id} className="role-card-anchor">
              <MedicalCard
                variant="glass"
                className="role-card group"
              >
              <MedicalCardHeader>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/20 group-hover:bg-primary/30 transition-colors">
                    <role.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <MedicalCardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {role.title}
                    </MedicalCardTitle>
                    <p className="text-muted-foreground mt-1">{role.description}</p>
                  </div>
                </div>
              </MedicalCardHeader>

              <MedicalCardContent>
                <ul className="space-y-4 mb-8">
                  {role.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex} 
                      className="flex items-center space-x-3"
                    >
                      <div className="p-2 rounded-lg bg-primary/10">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-foreground font-medium">{feature.text}</span>
                    </li>
                  ))}
                </ul>

                <MedicalButton
                  variant="medical"
                  className="w-full group-hover:shadow-lg transition-all duration-300"
                  onClick={() => {
                    if (role.id === "patient") {
                      navigate("/dashboard/patient");
                    } else if (role.id === "doctor") {
                      navigate("/dashboard/doctor");
                    } else if (role.id === "hospital") {
                      navigate("/dashboard/hospital");
                    } else if (role.id === "admin") {
                      navigate("/dashboard/admin");
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
        <div className="text-center mt-16">
          <MedicalCard variant="glass" className="max-w-2xl mx-auto">
            <MedicalCardContent className="text-center">
              <h3 className="text-2xl font-bold mb-4 gradient-text">
                Ready to Transform Healthcare?
              </h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of healthcare professionals already using our platform 
                to deliver better patient care.
              </p>
              <MedicalButton variant="medical" size="lg" onClick={() => navigate('/register')}>
                Start Free Trial
              </MedicalButton>
            </MedicalCardContent>
          </MedicalCard>
        </div>
      </div>
    </section>
  );
};

export default RoleSection;