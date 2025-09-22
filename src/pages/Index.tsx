import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import RoleSection from "@/components/sections/RoleSection";

const Index = () => {
  return (
  <div className="min-h-screen px-2 sm:px-4 lg:px-8">
      <Header />
  <main>
        <HeroSection />
        <FeaturesSection />
        <RoleSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
