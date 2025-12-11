import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Heart, Mail, Lock, User, Stethoscope, Shield } from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const navigate = useNavigate();
  const { signIn, user, checkRememberedSession } = useAuth();

  const roles = [
    { id: "patient", label: "Patient", icon: User, color: "text-primary", description: "Book appointments & manage health" },
    { id: "doctor", label: "Doctor", icon: Stethoscope, color: "text-success", description: "Manage patients & consultations" },
  ];

  // Check for remembered session on mount
  useEffect(() => {
    const checkSession = async () => {
      if (user) {
        // User already logged in, redirect to appropriate dashboard
        const role = localStorage.getItem('userRole') || 'patient';
        redirectToDashboard(role);
        return;
      }

      const hasValidSession = await checkRememberedSession();
      if (hasValidSession) {
        // Auto-login with remembered session
        const role = localStorage.getItem('userRole') || 'patient';
        // Wait a bit for auth state to update
        setTimeout(() => {
          redirectToDashboard(role);
        }, 1000);
      }
      setCheckingSession(false);
    };

    checkSession();
  }, [user, checkRememberedSession]);

  const redirectToDashboard = (role: string) => {
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
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(email, password, selectedRole, rememberMe);

    if (!error) {
      redirectToDashboard(selectedRole);
    }

    setLoading(false);
  };

  // Show loading while checking session
  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-background">
        <div className="text-center">
          <div className="medical-glow p-3 rounded-xl inline-block mb-4">
            <img src="/logo.png" alt="Kabiraj AI" className="h-20 w-20 object-contain animate-pulse" />
          </div>
          <p className="text-muted-foreground">Checking session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-background">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="medical-glow p-3 rounded-xl">
              <img src="/logo.png" alt="Kabiraj AI" className="h-20 w-20 object-contain" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold gradient-text">Kabiraj AI</h1>
              <p className="text-sm text-muted-foreground">The Digital Sage for Modern Problems</p>
            </div>
          </div>
        </div>

        <MedicalCard variant="glass" className="animate-slide-in">
          <MedicalCardHeader>
            <MedicalCardTitle className="text-center text-2xl">Welcome Back</MedicalCardTitle>
            <p className="text-center text-muted-foreground">
              Sign in to access your healthcare dashboard
            </p>
          </MedicalCardHeader>

          <MedicalCardContent>
            {/* Role Selection */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">Select Your Role</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={cn(
                      "flex flex-col items-start p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02]",
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
                      <span className="text-base font-semibold">{role.label}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{role.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
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
                    placeholder="Enter your email"
                    required
                  />
                </div>
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
                    placeholder="Enter your password"
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
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-primary hover:text-primary-glow">
                  Forgot password?
                </Link>
              </div>

              <MedicalButton
                type="submit"
                variant="medical"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Signing in...' : `Sign In as ${roles.find(r => r.id === selectedRole)?.label}`}
              </MedicalButton>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:text-primary-glow font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
          </MedicalCardContent>
        </MedicalCard>

        {/* Security Notice */}
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

export default Login;