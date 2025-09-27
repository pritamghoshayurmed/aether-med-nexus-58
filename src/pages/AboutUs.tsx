import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-primary mb-8 mt-12">About Us</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-foreground mb-6">
            Welcome to kabirajaihealthtech, where healthcare meets innovation through the power of artificial intelligence.
            We are dedicated to revolutionizing the medical industry by providing cutting-edge AI-powered solutions
            that enhance patient care, streamline medical processes, and empower healthcare professionals.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
          <p className="text-foreground mb-6">
            Our mission is to bridge the gap between traditional healthcare practices and modern technology,
            creating a seamless ecosystem where AI assists in diagnosis, treatment planning, and patient management.
            We believe in making advanced healthcare accessible to everyone, regardless of location or resources.
          </p>

          <h2 className="text-2xl font-semibold text-foreground mb-4">What We Do</h2>
          <ul className="list-disc list-inside text-foreground mb-6 space-y-2">
            <li>AI-powered diagnostic assistance for healthcare professionals</li>
            <li>Intelligent patient management systems</li>
            <li>Telemedicine solutions with real-time AI support</li>
            <li>Data analytics for healthcare optimization</li>
            <li>Secure medical record management</li>
          </ul>

          <h2 className="text-2xl font-semibold text-foreground mb-4">Our Vision</h2>
          <p className="text-foreground mb-6">
            To create a future where AI and human expertise work hand-in-hand to deliver
            personalized, efficient, and compassionate healthcare to all.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;