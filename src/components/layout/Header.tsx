import { useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Features", href: "#features" },
    { name: "For Patients", href: "#patients" },
    { name: "For Doctors", href: "#doctors" },
    { name: "For Hospitals", href: "#hospitals" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 glass-card border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="medical-glow p-2 rounded-lg">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">MediConnect</h1>
              <p className="text-xs text-muted-foreground">Next-Gen Telemedicine</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <MedicalButton variant="ghost" size="sm">
              Sign In
            </MedicalButton>
            <MedicalButton variant="medical" size="sm">
              Get Started
            </MedicalButton>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <MedicalButton
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </MedicalButton>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="py-4 space-y-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-foreground hover:text-primary transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 space-y-2">
              <MedicalButton variant="ghost" className="w-full">
                Sign In
              </MedicalButton>
              <MedicalButton variant="medical" className="w-full">
                Get Started
              </MedicalButton>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;