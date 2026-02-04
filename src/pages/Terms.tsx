import { Link } from 'react-router-dom';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Terms = () => {
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
          <h1 className="text-xl font-semibold">Terms of Service</h1>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-2 text-3xl font-bold">Terms of Service</h1>
          <p className="mb-8 text-sm text-muted-foreground">Last updated: January 2024</p>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="mb-3 text-xl font-semibold">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing or using MedPrep AI, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">2. Description of Service</h2>
              <p className="text-muted-foreground">
                MedPrep AI provides an AI-powered medical exam preparation platform featuring 
                adaptive quizzes, spaced repetition flashcards, and performance analytics 
                designed to help medical students prepare for various licensing examinations.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">3. User Accounts</h2>
              <p className="text-muted-foreground">
                You are responsible for maintaining the confidentiality of your account credentials 
                and for all activities that occur under your account. You must notify us immediately 
                of any unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">4. Payments and Subscriptions</h2>
              <p className="text-muted-foreground">
                Paid subscriptions are billed in advance on a monthly or yearly basis. All payments 
                are non-refundable except as expressly stated in our Refund Policy. We reserve the 
                right to change our pricing with 30 days notice.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">5. Intellectual Property</h2>
              <p className="text-muted-foreground">
                All content, features, and functionality of MedPrep AI are owned by us and are 
                protected by international copyright, trademark, and other intellectual property laws. 
                You may not reproduce, distribute, or create derivative works without our permission.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">6. Prohibited Uses</h2>
              <p className="text-muted-foreground">
                You may not use MedPrep AI for any unlawful purpose, to harass others, to distribute 
                malware, to attempt to gain unauthorized access, or to interfere with the service's 
                proper functioning.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">7. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground">
                MedPrep AI is provided "as is" without warranties of any kind. We do not guarantee 
                that our content will help you pass any particular examination. Our service is 
                intended as a study aid and should not replace formal medical education.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">8. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                In no event shall MedPrep AI be liable for any indirect, incidental, special, 
                consequential, or punitive damages arising from your use of the service.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">9. Termination</h2>
              <p className="text-muted-foreground">
                We may terminate or suspend your account at any time for any reason without prior 
                notice. Upon termination, your right to use the service will immediately cease.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">10. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. We will notify users of 
                significant changes via email or through the service. Continued use after changes 
                constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">11. Governing Law</h2>
              <p className="text-muted-foreground">
                These terms shall be governed by the laws of the European Union. Any disputes 
                shall be resolved in the courts of Germany.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">12. Contact</h2>
              <p className="text-muted-foreground">
                For questions about these Terms of Service, please contact us at legal@medprep.ai
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
