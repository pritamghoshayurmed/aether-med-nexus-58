import { ArrowRight, Play, Shield, Zap, Users } from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard } from "@/components/ui/medical-card";
import heroImage from "@/assets/telemedicine-hero.jpg";

const HeroSection = () => {
  const stats = [
    { icon: Users, label: "Active Users", value: "50K+" },
    { icon: Shield, label: "HIPAA Compliant", value: "100%" },
    { icon: Zap, label: "Uptime", value: "99.9%" },
  ];

  return (
  <section className="relative w-screen min-h-screen flex items-center justify-center overflow-hidden left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-background">
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-background/80" />
        <img
          src={heroImage}
          alt="Telemedicine Future"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-20 h-20 rounded-full bg-primary/20 blur-xl" />
      </div>
      <div className="absolute bottom-32 right-16 animate-float" style={{ animationDelay: "1s" }}>
        <div className="w-32 h-32 rounded-full bg-primary-glow/20 blur-xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Main Hero Content */}
          <div className="max-w-4xl mx-auto mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Next-Generation</span>
              <br />
              Telemedicine Platform
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Connecting patients, doctors, hospitals, and administrators with AI-powered 
              intelligence, real-time updates, and secure digital health workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <MedicalButton variant="medical" size="xl" className="group">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </MedicalButton>
              <MedicalButton variant="glass" size="xl" className="group">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </MedicalButton>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <MedicalCard
                key={stat.label}
                variant="glass"
                className="text-center animate-slide-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-3 rounded-lg bg-primary/20">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-muted-foreground font-medium">{stat.label}</p>
                  </div>
                </div>
              </MedicalCard>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;