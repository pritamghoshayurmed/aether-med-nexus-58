import { Database, Package } from "lucide-react";
import { MedicalCard } from "@/components/ui/medical-card";


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

  ];

  return (
    // Add an id so the header link targets this section and add a scroll margin to account for fixed header
    <section id="features" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-background to-background/50 scroll-mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="gradient-text">Revolutionary Healthcare</span>
            <br />
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">Features</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2">
            Experience the future of healthcare with our innovative solutions designed
            for everyone, everywhere - from smartphones to basic phones.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16 max-w-5xl mx-auto">
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


      </div>
    </section>
  );
};

export default FeaturesSection;