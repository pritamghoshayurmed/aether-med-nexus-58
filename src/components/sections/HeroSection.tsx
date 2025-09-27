import { ArrowRight, Play, Shield, Zap, Users } from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { MedicalCard } from "@/components/ui/medical-card";
import heroImage from "@/assets/telemedicine-hero.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  const stats = [
    { icon: Users, label: "Active Users", value: "50+" },
    { icon: Shield, label: "HIPAA Compliant", value: "100%" },
    { icon: Zap, label: "Uptime", value: "99.9%" },
  ];

  return (
  <section className="relative w-screen min-h-screen flex items-center justify-center overflow-hidden left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] pt-16 sm:pt-20 pb-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-background">
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/90" />
        <img
          src={heroImage}
          alt="Telemedicine Future"
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
      </div>

      {/* Floating Elements - Optimized for mobile */}
      <div className="absolute top-16 left-4 sm:top-20 sm:left-10">
        <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-primary/20 blur-xl" />
      </div>
      <div className="absolute bottom-24 right-4 sm:bottom-32 sm:right-16">
        <div className="w-16 h-16 sm:w-32 sm:h-32 rounded-full bg-primary-glow/20 blur-xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center">
          {/* Main Hero Content */}
          <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
              <span className="gradient-text">Next-Generation</span>
              <br />
              <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl">Telemedicine Platform</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed px-2">
              Connecting patients, doctors, hospitals, and administrators with AI-powered 
              intelligence, real-time updates, and secure digital health workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
              <MedicalButton variant="medical" size="xl" className="group" onClick={() => navigate('/register')}>
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </MedicalButton>
              {/* Dialog-based responsive video modal */}
              <Dialog>
                <DialogTrigger asChild>
                  <MedicalButton variant="glass" size="xl" className="group">
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo
                  </MedicalButton>
                </DialogTrigger>
                <DialogContent className="max-w-5xl w-full p-0 bg-transparent shadow-none">
                  <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                    <iframe
                      src="https://www.youtube.com/embed/UzmBWWDQZIk?autoplay=1"
                      title="Demo Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute left-0 top-0 w-full h-full rounded-lg"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Stats Cards - Mobile-First */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4 sm:px-0">
            {stats.map((stat, index) => (
              <MedicalCard
                key={stat.label}
                variant="glass"
                className="text-center p-4 sm:p-6"
              >
                <div className="flex flex-col items-center space-y-3 sm:space-y-4">
                  <div className="p-2 sm:p-3 rounded-lg bg-primary/20">
                    <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-sm sm:text-base text-muted-foreground font-medium">{stat.label}</p>
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