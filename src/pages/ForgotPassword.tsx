import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Shield, CheckCircle } from "lucide-react";
import { MedicalButton } from "@/components/ui/medical-button";
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - replace with actual password reset logic
      await new Promise(resolve => setTimeout(resolve, 2000));

      setIsEmailSent(true);
      toast({
        title: "Reset Email Sent",
        description: "Check your email for password reset instructions.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Email Resent",
        description: "Password reset email has been sent again.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
            <div className="flex items-center space-x-3 mb-2">
              <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <MedicalCardTitle className="text-2xl">
                {isEmailSent ? "Check Your Email" : "Forgot Password"}
              </MedicalCardTitle>
            </div>
            <p className="text-muted-foreground">
              {isEmailSent
                ? "We've sent password reset instructions to your email"
                : "Enter your email address and we'll send you a link to reset your password"
              }
            </p>
          </MedicalCardHeader>

          <MedicalCardContent>
            {!isEmailSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
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
                      disabled={isLoading}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    We'll send a reset link to this email address
                  </p>
                </div>

                <MedicalButton
                  type="submit"
                  variant="medical"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </MedicalButton>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-success/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>

                <div className="space-y-2">
                  <p className="font-medium">Reset email sent to:</p>
                  <p className="text-primary font-semibold">{email}</p>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                  <p>
                    If you don't see the email in your inbox, check your spam folder.
                    The link will expire in 24 hours.
                  </p>
                </div>

                <div className="space-y-3">
                  <MedicalButton
                    onClick={handleResendEmail}
                    variant="outline"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Resend Email"}
                  </MedicalButton>

                  <MedicalButton
                    asChild
                    variant="medical"
                    className="w-full"
                  >
                    <Link to="/login">Back to Sign In</Link>
                  </MedicalButton>
                </div>
              </div>
            )}

            {!isEmailSent && (
              <div className="mt-6 text-center">
                <p className="text-muted-foreground text-sm">
                  Remember your password?{" "}
                  <Link to="/login" className="text-primary hover:text-primary-glow font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            )}
          </MedicalCardContent>
        </MedicalCard>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            <Shield className="inline h-3 w-3 mr-1" />
            Password reset requests are securely processed and encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;