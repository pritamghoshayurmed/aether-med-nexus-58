import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const TermsAndCondition = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-primary mb-8 mt-12">Terms and Conditions</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-foreground mb-6">
            <strong>Last updated:</strong> September 27, 2025
          </p>

          <p className="text-foreground mb-6">
            Welcome to kabirajaihealthtech. These Terms and Conditions ("Terms") govern your use of our
            healthcare platform and services. By accessing or using our platform, you agree to be bound
            by these Terms. If you do not agree to these Terms, please do not use our services.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mb-4">Acceptance of Terms</h2>
          <p className="text-foreground mb-6">
            By creating an account or using kabirajaihealthtech, you acknowledge that you have read,
            understood, and agree to be bound by these Terms and our Privacy Policy. These Terms
            constitute a legally binding agreement between you and kabirajaihealthtech.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mb-4">Description of Service</h2>
          <p className="text-foreground mb-6">
            kabirajaihealthtech provides an AI-powered healthcare platform that connects patients,
            healthcare providers, and administrators. Our services include telemedicine, AI-assisted
            diagnostics, patient management, and healthcare analytics tools.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mb-4">User Eligibility</h2>
          <p className="text-foreground mb-4">To use our services, you must:</p>
          <ul className="list-disc list-inside text-foreground mb-6 space-y-1">
            <li>Be at least 18 years old or have parental consent</li>
            <li>Be a licensed healthcare professional (for provider accounts)</li>
            <li>Provide accurate and complete registration information</li>
            <li>Maintain the confidentiality of your account credentials</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mb-4">User Responsibilities</h2>
          <p className="text-foreground mb-4">As a user of our platform, you agree to:</p>
          <ul className="list-disc list-inside text-foreground mb-6 space-y-1">
            <li>Use the platform only for lawful purposes</li>
            <li>Provide accurate and truthful information</li>
            <li>Respect the privacy and rights of other users</li>
            <li>Not attempt to circumvent security measures</li>
            <li>Report any suspected security incidents</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mb-4">Medical Disclaimer</h2>
          <div className="bg-warning/10 border-l-4 border-warning p-4 mb-6">
            <p className="text-foreground">
              <strong>Important:</strong> kabirajaihealthtech is not a substitute for professional medical
              advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers
              for medical concerns. AI recommendations should be reviewed by licensed medical professionals.
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mb-4">Privacy and Data Protection</h2>
          <p className="text-foreground mb-6">
            Your privacy is important to us. Our collection and use of personal information is governed
            by our Privacy Policy, which is incorporated into these Terms by reference. By using our
            services, you consent to the collection and use of your information as outlined in our Privacy Policy.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mb-4">Intellectual Property</h2>
          <p className="text-foreground mb-6">
            All content, features, and functionality of kabirajaihealthtech, including but not limited to
            text, graphics, logos, and software, are owned by kabirajaihealthtech and are protected by
            copyright, trademark, and other intellectual property laws.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
          <p className="text-foreground mb-6">
            To the maximum extent permitted by law, kabirajaihealthtech shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages arising out of or related
            to your use of our services.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mb-4">Termination</h2>
          <p className="text-foreground mb-6">
            We reserve the right to terminate or suspend your account and access to our services
            at our discretion, with or without cause, and with or without notice.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mb-4">Governing Law</h2>
          <p className="text-foreground mb-6">
            These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction],
            without regard to its conflict of law provisions.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to Terms</h2>
          <p className="text-foreground mb-6">
            We reserve the right to modify these Terms at any time. We will notify users of material
            changes via email or through our platform. Continued use of our services after such
            modifications constitutes acceptance of the updated Terms.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
          <p className="text-foreground mb-6">
            If you have any questions about these Terms, please contact us at:
          </p>
          <div className="bg-card p-4 rounded-lg border">
            <p className="text-foreground">
              <strong>Email:</strong> legal@kabirajaihealthtech.com<br />
              <strong>Address:</strong> kabirajaihealthtech Legal Team, [Company Address]
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsAndCondition;