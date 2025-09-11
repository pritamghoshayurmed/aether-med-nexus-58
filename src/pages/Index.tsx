import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import RoleSection from "@/components/sections/RoleSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <RoleSection />
      </main>
    </div>
  );
};

export default Index;
