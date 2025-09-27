import { useState } from "react";
import { Menu, X } from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Features", href: "/#features" },
  { name: "For Patients", href: "/#patient" },
  { name: "For Doctors", href: "/#doctor" },
  { name: "For Administrators", href: "/#admin" },
  { name: "For Hospitals", href: "/#hospital" },
  { name: "Contact", href: "/#contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // If it's an in-page anchor like '/#patients' or '#patients', smooth scroll to it
    e.preventDefault();
    const anchor = href.startsWith("/#") ? href.replace("/#", "") : href.replace("#", "");
    const el = document.getElementById(anchor);
    if (el) {
      // Close mobile menu if open
      setIsMenuOpen(false);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // If element not found, navigate to the path (useful when on other routes)
    setIsMenuOpen(false);
    navigate(href);
  };
  return (
  <header className="bg-background/95 backdrop-blur-lg shadow-md fixed top-0 left-0 w-full z-50 min-h-[64px] flex items-center">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center min-h-[64px]">
          {/* Logo */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <img
              src="/logo.png"
              alt="Kabiraj AI Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
            />
            <div className="flex flex-col">
              <h1 className="text-sm sm:text-base md:text-lg font-bold gradient-text leading-tight">KABIRAJ AI</h1>
              <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground leading-tight hidden sm:block">The Digital Sage for Modern Problems</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 sm:space-x-8 justify-center flex-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-white text-base sm:text-lg font-semibold hover:text-primary transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <MedicalButton variant="ghost" size="sm" className="px-4 py-2" onClick={() => navigate('/login')}>
              Sign In
            </MedicalButton>
            <MedicalButton variant="medical" size="sm" className="px-4 py-2" onClick={() => navigate('/register')}>
              Get Started
            </MedicalButton>
          </div>

          {/* Mobile Actions & Menu */}
          <div className="flex items-center space-x-2 lg:hidden">
            <MedicalButton variant="ghost" size="sm" className="text-xs px-2 py-1" onClick={() => navigate('/login')}>
              Sign In
            </MedicalButton>
            <MedicalButton
              variant="medical"
              size="sm"
              className="text-xs px-2 py-1"
              onClick={() => navigate('/register')}
            >
              Start
            </MedicalButton>
            <MedicalButton
              variant="ghost"
              size="icon"
              className="ml-2 min-w-[44px] min-h-[44px]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </MedicalButton>
          </div>
        </div>

  {/* Mobile Navigation */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 w-full bg-background/95 backdrop-blur-lg absolute left-0 top-16 z-40 border-t border-border/50",
            isMenuOpen ? "max-h-[400px] opacity-100 shadow-lg" : "max-h-0 opacity-0"
          )}
        >
          <div className="py-4 space-y-1 px-4 max-h-[350px] overflow-y-auto">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-white text-base font-medium hover:text-primary transition-colors duration-200 py-3 px-2 rounded-lg hover:bg-primary/10 min-h-[44px] flex items-center"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 mt-4 border-t border-border/50 space-y-3">
              <MedicalButton variant="ghost" className="w-full min-h-[44px] justify-center" onClick={() => { setIsMenuOpen(false); navigate('/login'); }}>
                Sign In
              </MedicalButton>
              <MedicalButton variant="medical" className="w-full min-h-[44px] justify-center" onClick={() => { setIsMenuOpen(false); navigate('/register'); }}>
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