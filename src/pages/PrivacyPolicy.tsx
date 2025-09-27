import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-primary mb-8 mt-12">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-foreground mb-6">
            <strong>Last updated:</strong> September 27, 2025
          </p>

          <p className="text-foreground mb-6">
            At kabirajaihealthtech, we are committed to protecting your privacy and ensuring the security
            of your personal information. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use our platform.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>

          <h3 className="text-xl font-semibold text-foreground mb-3">Personal Information</h3>
          <p className="text-foreground mb-4">
            We may collect personal information that you provide directly to us, including:
          </p>
          <ul className="list-disc list-inside text-foreground mb-6 space-y-1">
            <li>Name, email address, and contact information</li>
            <li>Medical history and health-related data (with your explicit consent)</li>
            <li>Account credentials and profile information</li>
            <li>Communication preferences</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground mb-3">Usage Information</h3>
          <p className="text-foreground mb-6">
            We automatically collect certain information about your use of our platform, including:
          </p>
          <ul className="list-disc list-inside text-foreground mb-6 space-y-1">
            <li>Device information and browser type</li>
            <li>IP address and location data</li>
            <li>Usage patterns and feature interactions</li>
            <li>Performance and diagnostic data</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
          <p className="text-foreground mb-4">We use the collected information to:</p>
          <ul className="list-disc list-inside text-foreground mb-6 space-y-1">
            <li>Provide and maintain our healthcare platform</li>
            <li>Personalize your experience and improve our services</li>
            <li>Ensure platform security and prevent fraud</li>
            <li>Comply with legal and regulatory requirements</li>
            <li>Communicate with you about updates and support</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mb-4">Information Sharing and Disclosure</h2>
          <p className="text-foreground mb-6">
            We do not sell, trade, or otherwise transfer your personal information to third parties
            without your consent, except as described in this policy. We may share your information:
          </p>
          <ul className="list-disc list-inside text-foreground mb-6 space-y-1">
            <li>With healthcare providers involved in your care (with your consent)</li>
            <li>With service providers who assist in our operations</li>
            <li>When required by law or to protect our rights</li>
            <li>In connection with a business transfer or merger</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mb-4">Data Security</h2>
          <p className="text-foreground mb-6">
            We implement appropriate technical and organizational measures to protect your personal
            information against unauthorized access, alteration, disclosure, or destruction. This
            includes encryption, secure servers, and regular security assessments.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights</h2>
          <p className="text-foreground mb-4">You have the right to:</p>
          <ul className="list-disc list-inside text-foreground mb-6 space-y-1">
            <li>Access and review your personal information</li>
            <li>Correct inaccurate or incomplete data</li>
            <li>Request deletion of your personal information</li>
            <li>Opt out of certain data processing activities</li>
            <li>Data portability</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
          <p className="text-foreground mb-6">
            If you have any questions about this Privacy Policy or our data practices, please contact us at:
          </p>
          <div className="bg-card p-4 rounded-lg border">
            <p className="text-foreground">
              <strong>Email:</strong> privacy@kabirajaihealthtech.in<br />
              <strong>Address:</strong> kabirajaihealthtech Privacy Team, [Company Address]
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;