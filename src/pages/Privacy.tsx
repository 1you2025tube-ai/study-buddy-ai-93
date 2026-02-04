import { Link } from 'react-router-dom';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center gap-4 px-4 py-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="text-xl font-semibold">Privacy Policy</h1>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-2 text-3xl font-bold">Privacy Policy</h1>
          <p className="mb-8 text-sm text-muted-foreground">Last updated: January 2024</p>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="mb-3 text-xl font-semibold">1. Introduction</h2>
              <p className="text-muted-foreground">
                MedPrep AI ("we", "our", "us") is committed to protecting your privacy. This Privacy 
                Policy explains how we collect, use, disclose, and safeguard your information when 
                you use our medical exam preparation platform.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">2. Information We Collect</h2>
              <p className="text-muted-foreground mb-2">
                We collect information you provide directly:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Account information (email, name, password)</li>
                <li>Profile information (university, study preferences)</li>
                <li>Quiz responses and performance data</li>
                <li>Payment information (processed by Stripe)</li>
                <li>Communications with our support team</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Provide and improve our services</li>
                <li>Personalize your learning experience</li>
                <li>Process payments and manage subscriptions</li>
                <li>Send service updates and promotional communications</li>
                <li>Analyze usage patterns to improve our platform</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">4. AI and Your Data</h2>
              <p className="text-muted-foreground">
                Our AI systems process your quiz responses to generate personalized content and 
                adaptive learning recommendations. Your data is used to improve the accuracy of 
                our quiz generation but is never shared with third-party AI providers in a way 
                that identifies you personally.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">5. Information Sharing</h2>
              <p className="text-muted-foreground">
                We do not sell your personal information. We may share data with:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Service providers (hosting, payment processing, analytics)</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners in aggregate, non-identifiable form</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">6. Data Security</h2>
              <p className="text-muted-foreground">
                We implement industry-standard security measures including encryption in transit 
                and at rest, secure authentication, regular security audits, and access controls. 
                However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">7. Data Retention</h2>
              <p className="text-muted-foreground">
                We retain your personal data for as long as your account is active or as needed 
                to provide services. After account deletion, we may retain certain data for up 
                to 90 days for backup purposes and to comply with legal obligations.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">8. Your Rights (GDPR)</h2>
              <p className="text-muted-foreground mb-2">
                Under GDPR, you have the right to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Access your personal data</li>
                <li>Rectify inaccurate data</li>
                <li>Request erasure of your data</li>
                <li>Restrict processing of your data</li>
                <li>Data portability</li>
                <li>Object to processing</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">9. Cookies</h2>
              <p className="text-muted-foreground">
                We use essential cookies to maintain your session and preferences. Analytics 
                cookies help us understand how users interact with our platform. You can manage 
                cookie preferences in your browser settings.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">10. Contact Us</h2>
              <p className="text-muted-foreground">
                For privacy-related inquiries or to exercise your rights, contact our Data 
                Protection Officer at privacy@medprep.ai or write to: MedPrep AI, Data Protection, 
                Munich, Germany.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
