import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Stethoscope, Shield, FileText, Mic, Globe, CreditCard } from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("patient");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  // Common fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Role specific fields
  const [doctorLicenseNo, setDoctorLicenseNo] = useState("");
  const [doctorSpecialty, setDoctorSpecialty] = useState("");

  const roles = [
    {
      id: "patient",
      label: "Patient",
      icon: User,
      color: "text-primary",
      description: "Access healthcare services",
      features: ["Voice-first search", "Family profiles", "Video consultations", "Digital prescriptions"]
    },
    {
      id: "doctor",
      label: "Doctor",
      icon: Stethoscope,
      color: "text-success",
      description: "Provide telemedicine care",
      features: ["AI-powered notes", "Smart prescriptions", "Revenue tracking", "Slot management"]
    },
  ];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Validation
    if (!name.trim()) newErrors.name = "Full name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Enter a valid email";
    }

    if (!password) newErrors.password = "Password is required";
    if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!confirmPassword) newErrors.confirmPassword = "Confirm your password";
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Role specific validation
    if (selectedRole === "doctor" && !doctorLicenseNo.trim()) {
      newErrors.doctorLicenseNo = "License number is required for doctors";
    }
    if (selectedRole === "doctor" && !doctorSpecialty.trim()) {
      newErrors.doctorSpecialty = "Specialty is required for doctors";
    }

    if (!acceptedTerms) {
      newErrors.terms = "You must accept the terms and conditions to continue";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    const { error, role } = await signUp({
      email: email.trim(),
      password,
      fullName: name.trim(),
      role: selectedRole,
      // Doctor specific
      licenseNumber: selectedRole === "doctor" ? doctorLicenseNo.trim() : undefined,
      specialty: selectedRole === "doctor" ? doctorSpecialty.trim() : undefined,
    });

    if (!error && role) {
      // Redirect to appropriate dashboard based on role
      switch (role) {
        case 'patient':
          navigate('/dashboard/patient');
          break;
        case 'doctor':
          navigate('/dashboard/doctor');
          break;
        default:
          navigate('/');
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-background">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="medical-glow p-3 rounded-xl">
              <img src="/logo.png" alt="Kabiraj AI" className="h-20 w-20 object-contain" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold gradient-text">Kabiraj AI</h1>
              <p className="text-sm text-muted-foreground">Create an account to access your healthcare dashboard</p>
            </div>
          </div>
        </div>

        <MedicalCard variant="glass" className="animate-slide-in">
          <MedicalCardHeader>
            <MedicalCardTitle className="text-center text-2xl">Create Account</MedicalCardTitle>
            <p className="text-center text-muted-foreground">Join as a patient or healthcare provider</p>
          </MedicalCardHeader>

          <MedicalCardContent>
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">Select Your Role</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={cn(
                      "flex flex-col items-start p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] text-left",
                      selectedRole === role.id
                        ? "bg-gradient-to-br from-primary/20 to-primary/10 border-primary shadow-lg shadow-primary/20"
                        : "bg-muted/30 border-border/50 hover:border-primary/50 hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={cn(
                        "p-2 rounded-lg transition-all",
                        selectedRole === role.id ? "bg-primary/20" : "bg-muted/50"
                      )}>
                        <role.icon className={cn("h-5 w-5", selectedRole === role.id ? role.color : "text-muted-foreground")} />
                      </div>
                      <div>
                        <span className="text-base font-semibold block">{role.label}</span>
                        <span className="text-xs text-muted-foreground">{role.description}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {role.features.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    placeholder="Your full name"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
                {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>}
              </div>

              {/* Role specific fields */}
              {selectedRole === "doctor" && (
                <>
                  <div>
                    <Label htmlFor="doctorSpecialty">Medical Specialty</Label>
                    <div className="relative">
                      <Stethoscope className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="doctorSpecialty"
                        type="text"
                        value={doctorSpecialty}
                        onChange={(e) => setDoctorSpecialty(e.target.value)}
                        className="pl-10"
                        placeholder="e.g., Cardiology, General Practitioner"
                        required
                      />
                    </div>
                    {errors.doctorSpecialty && <p className="text-xs text-destructive mt-1">{errors.doctorSpecialty}</p>}
                  </div>
                  <div>
                    <Label htmlFor="doctorLicenseNo">Medical Council Registration No.</Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="doctorLicenseNo"
                        type="text"
                        value={doctorLicenseNo}
                        onChange={(e) => setDoctorLicenseNo(e.target.value)}
                        className="pl-10"
                        placeholder="Enter medical council registration number"
                        required
                      />
                    </div>
                    {errors.doctorLicenseNo && <p className="text-xs text-destructive mt-1">{errors.doctorLicenseNo}</p>}
                  </div>
                </>
              )}


              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                  By creating your account you are accepting the{" "}
                  <Link to="/terms-and-conditions" className="text-primary hover:text-primary-glow">
                    terms and conditions
                  </Link>{" "}
                  of our services
                </label>
              </div>
              {errors.terms && <p className="text-xs text-destructive mt-1">{errors.terms}</p>}

              <MedicalButton
                type="submit"
                variant="medical"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Creating account...' : `Create account as ${roles.find(r => r.id === selectedRole)?.label}`}
              </MedicalButton>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Already have an account? {" "}
                <Link to="/login" className="text-primary hover:text-primary-glow font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            <Shield className="inline h-3 w-3 mr-1" />
            Your data is protected with enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
