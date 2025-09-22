import { Phone, Database, Package, PhoneCall } from "lucide-react";
import { MedicalCard } from "@/components/ui/medical-card";
import { MedicalButton } from "@/components/ui/medical-button";

const FeaturesSection = () => {
  const features = [
    {
      icon: Database,
      title: "Offline Digital Health Records",
      description: "Your health history linked to your mobile number",
      details: "Get complete health records via SMS from any phone"
    },
    {
      icon: Package,
      title: "Real-time Medicine Availability",
      description: "Find medicines instantly at nearby pharmacies",
      details: "Live inventory tracking with availability status"
    },
    {
      icon: Phone,
      title: "AI Symptom Checker",
      description: "Smart diagnosis through voice calls in 22+ languages",
      details: "Works on any phone, even basic keypad models"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Revolutionary Healthcare</span>
            <br />
            Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the future of healthcare with our innovative solutions designed 
            for everyone, everywhere - from smartphones to basic phones.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <MedicalCard
              key={feature.title}
              variant="glass"
              className="text-center group hover:scale-105 transition-all duration-300"
            >
              <div className="p-8">
                <div className="mb-6">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground font-medium mb-2">
                    {feature.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {feature.details}
                  </p>
                </div>
              </div>
            </MedicalCard>
          ))}
        </div>

        {/* Call-to-Action for AI Agent */}
        <div className="text-center">
          <MedicalCard variant="glass" className="max-w-2xl mx-auto">
            <div className="p-8">
              <div className="mb-6">
                <PhoneCall className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">
                  Try Our AI Health Assistant
                </h3>
                <p className="text-muted-foreground mb-6">
                  Experience intelligent healthcare guidance through a simple phone call. 
                  Available 24/7 in multiple Indian languages.
                </p>
              </div>
              <div className="space-y-4">
                <div className="text-3xl font-bold text-primary">
                  +91 98765 43210
                </div>
                <p className="text-sm text-muted-foreground">
                  Call now - Free consultation available
                </p>
                <MedicalButton variant="medical" size="lg" className="group">
                  <PhoneCall className="mr-2 h-5 w-5" />
                  Call AI Assistant
                </MedicalButton>
              </div>
            </div>
          </MedicalCard>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;