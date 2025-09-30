import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Stethoscope, Building2, Shield, FileText } from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

  // Role specific
  const [doctorRegNo, setDoctorRegNo] = useState("");
  const [hospitalRegNo, setHospitalRegNo] = useState("");
  const [clinicLicenseNo, setClinicLicenseNo] = useState("");

  const roles = [
    { id: "patient", label: "Patient", icon: User, color: "text-primary" },
    { id: "doctor", label: "Doctor", icon: Stethoscope, color: "text-success" },
    { id: "hospital", label: "Hospital", icon: Building2, color: "text-warning" },
    { id: "admin", label: "Admin", icon: Shield, color: "text-destructive" },
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
    if (selectedRole === "doctor" && !doctorRegNo.trim()) {
      newErrors.doctorRegNo = "Registration number is required for doctors";
    }
    if (selectedRole === "hospital" && !hospitalRegNo.trim()) {
      newErrors.hospitalRegNo = "Registration number is required for hospitals";
    }

    if (!acceptedTerms) {
      newErrors.terms = "You must accept the terms and conditions to continue";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    const { error } = await signUp(email.trim(), password, name.trim(), selectedRole);
    
    if (!error) {
      navigate('/login');
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
            <p className="text-center text-muted-foreground">Sign up as a patient, doctor, hospital or admin</p>
          </MedicalCardHeader>

          <MedicalCardContent>
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">Select Your Role</Label>
              <div className="grid grid-cols-2 gap-2">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={cn(
                      "flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200",
                      selectedRole === role.id
                        ? "bg-primary/20 border-primary text-primary"
                        : "bg-muted/50 border-border hover:bg-muted/80"
                    )}
                  >
                    <role.icon className={cn("h-4 w-4", selectedRole === role.id ? role.color : "text-muted-foreground")} />
                    <span className="text-sm font-medium">{role.label}</span>
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
                <div>
                  <Label htmlFor="doctorRegNo">Medical Council Registration No.</Label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="doctorRegNo"
                      type="text"
                      value={doctorRegNo}
                      onChange={(e) => setDoctorRegNo(e.target.value)}
                      className="pl-10"
                      placeholder="Enter national medical council registration number"
                      // will be validated on submit
                    />
                  </div>
                  {errors.doctorRegNo && <p className="text-xs text-destructive mt-1">{errors.doctorRegNo}</p>}
                </div>
              )}

              {selectedRole === "hospital" && (
                <div>
                  <Label htmlFor="hospitalRegNo">Hospital / Clinic Registration No.</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="hospitalRegNo"
                      type="text"
                      value={hospitalRegNo}
                      onChange={(e) => setHospitalRegNo(e.target.value)}
                      className="pl-10"
                      placeholder="Enter registration or license number"
                      // will be validated on submit
                    />
                  </div>
                  {errors.hospitalRegNo && <p className="text-xs text-destructive mt-1">{errors.hospitalRegNo}</p>}
                </div>
              )}

              {/* Example for clinics if treated separately */}
              {selectedRole === "clinic" && (
                <div>
                  <Label htmlFor="clinicLicenseNo">Clinic License No.</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="clinicLicenseNo"
                      type="text"
                      value={clinicLicenseNo}
                      onChange={(e) => setClinicLicenseNo(e.target.value)}
                      className="pl-10"
                      placeholder="Enter clinic license number"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="flex items-start space-x-3">
                <input
                  id="terms"
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground">
                  By creating your account you are accepting the terms and conditions of our services
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
