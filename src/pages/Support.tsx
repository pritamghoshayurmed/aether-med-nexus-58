import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Support = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-primary mb-8 mt-12">Support</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-foreground mb-6">
            We're here to help you make the most of kabirajaihealthtech. Our support team is dedicated
            to providing you with the assistance you need to navigate our platform effectively.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mb-4">How Can We Help?</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-3">Technical Support</h3>
              <p className="text-muted-foreground mb-4">
                Having trouble with our platform? Our technical support team can help you resolve
                any issues you're experiencing.
              </p>
              <a href="mailto:support@kabirajaihealthtech.com" className="text-primary hover:text-primary/80">
                support@kabirajaihealthtech.com
              </a>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-3">Account Assistance</h3>
              <p className="text-muted-foreground mb-4">
                Need help with your account setup, password reset, or profile management?
                We're here to guide you through it.
              </p>
              <a href="mailto:accounts@kabirajaihealthtech.com" className="text-primary hover:text-primary/80">
                accounts@kabirajaihealthtech.com
              </a>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-3">Feature Requests</h3>
              <p className="text-muted-foreground mb-4">
                Have ideas for new features or improvements? We'd love to hear from you
                and consider your suggestions for future updates.
              </p>
              <a href="mailto:feedback@kabirajaihealthtech.com" className="text-primary hover:text-primary/80">
                feedback@kabirajaihealthtech.com
              </a>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h3 className="text-xl font-semibold text-foreground mb-3">Documentation</h3>
              <p className="text-muted-foreground mb-4">
                Access our comprehensive documentation, tutorials, and FAQs to get the most
                out of kabirajaihealthtech.
              </p>
              <a href="/docs" className="text-primary hover:text-primary/80">
                View Documentation
              </a>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
            <p className="text-foreground mb-2">
              <strong>Email:</strong> support@kabirajaihealthtech.com
            </p>
            <p className="text-foreground mb-2">
              <strong>Phone:</strong> +1 (555) 123-4567
            </p>
            <p className="text-foreground">
              <strong>Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM EST
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Support;