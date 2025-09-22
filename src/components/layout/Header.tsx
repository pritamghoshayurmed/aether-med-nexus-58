import { useState } from "react";
import { Menu, X } from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Features", href: "/#features" },
  { name: "For Patients", href: "/#patients" },
  { name: "For Doctors", href: "/#doctors" },
  { name: "For Administrators", href: "/#administrators" },
  { name: "For Hospitals", href: "/#hospitals" },
  { name: "Contact", href: "/#contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
  <header className="bg-background/90 backdrop-blur-lg shadow fixed top-0 left-0 w-full z-50 h-16 flex items-center">
      <div className="container mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex flex-wrap justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="Kabiraj AI Logo"
              className="mr-2 w-10 h-10 sm:w-14 sm:h-14 lg:w-14 lg:h-14"
            />
            <div className="flex flex-col">
              <h1 className="text-base sm:text-xl font-bold gradient-text leading-tight">KABIRAJ AI</h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">Next-Gen Telemedicine</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 sm:space-x-8 justify-center flex-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white text-base sm:text-lg font-semibold hover:text-primary transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
            <MedicalButton variant="ghost" size="sm" onClick={() => navigate('/login')}>
              Sign In
            </MedicalButton>
            <MedicalButton variant="medical" size="sm" onClick={() => navigate('/login')}>
              Get Started
            </MedicalButton>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
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
            "md:hidden overflow-hidden transition-all duration-300 w-full bg-background/90 backdrop-blur-lg absolute left-0 top-16 z-40",
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="py-4 space-y-2 px-4 flex flex-col">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-white text-base font-semibold hover:text-primary transition-colors duration-200 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <MedicalButton variant="ghost" className="w-full" onClick={() => { setIsMenuOpen(false); navigate('/login'); }}>
                Sign In
              </MedicalButton>
              <MedicalButton variant="medical" className="w-full" onClick={() => { setIsMenuOpen(false); navigate('/login'); }}>
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