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
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Tailored Solutions</span>
            <br />
            for Every Healthcare Role
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform provides specialized interfaces and tools designed for each stakeholder 
            in the healthcare ecosystem, powered by cutting-edge AI and real-time connectivity.
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {roles.map((role, index) => (
            <MedicalCard
              key={role.id}
              variant="glass"
              className={`group hover:scale-105 transition-all duration-500 ${role.gradient} animate-slide-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
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
                <div className="space-y-4">
                  {role.features.map((feature, featureIndex) => (
                    <div 
                      key={featureIndex} 
                      className="flex items-center space-x-3 group-hover:translate-x-2 transition-transform duration-300"
                      style={{ transitionDelay: `${featureIndex * 50}ms` }}
                    >
                      <div className="p-2 rounded-lg bg-primary/10">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-foreground font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
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
                    }}
                  >
                    {role.buttonText}
                  </MedicalButton>
                </div>
              </MedicalCardContent>
            </MedicalCard>
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
              <MedicalButton variant="medical" size="lg">
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