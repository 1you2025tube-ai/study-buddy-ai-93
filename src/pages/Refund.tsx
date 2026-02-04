import { Link } from 'react-router-dom';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Refund = () => {
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
          <h1 className="text-xl font-semibold">Refund Policy</h1>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-2 text-3xl font-bold">Refund Policy</h1>
          <p className="mb-8 text-sm text-muted-foreground">Last updated: January 2024</p>

          <div className="prose prose-gray max-w-none space-y-6">
            <section>
              <h2 className="mb-3 text-xl font-semibold">Overview</h2>
              <p className="text-muted-foreground">
                At MedPrep AI, we want you to be completely satisfied with your purchase. 
                This policy outlines the circumstances under which refunds may be issued.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">Subscription Refunds</h2>
              <p className="text-muted-foreground mb-2">
                <strong>7-Day Money-Back Guarantee:</strong> New subscribers can request a full 
                refund within 7 days of their initial purchase if they are unsatisfied with our 
                service for any reason.
              </p>
              <p className="text-muted-foreground">
                <strong>After 7 Days:</strong> Subscription fees are non-refundable after the 
                7-day period. You may cancel at any time, and your access will continue until 
                the end of your current billing period.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">Token Pack Refunds</h2>
              <p className="text-muted-foreground">
                One-time token pack purchases are non-refundable once tokens have been credited 
                to your account. Unused token packs may be refunded within 24 hours of purchase 
                if no tokens have been used.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">How to Request a Refund</h2>
              <p className="text-muted-foreground mb-2">
                To request a refund, please:
              </p>
              <ol className="list-decimal pl-6 text-muted-foreground space-y-1">
                <li>Email billing@medprep.ai with your account email</li>
                <li>Include your reason for requesting a refund</li>
                <li>Provide your transaction ID or order confirmation</li>
              </ol>
              <p className="text-muted-foreground mt-2">
                We aim to process all refund requests within 5-7 business days. Refunds will be 
                credited to the original payment method.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">Exceptions</h2>
              <p className="text-muted-foreground">
                Refunds may not be available in cases of:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                <li>Account termination due to Terms of Service violations</li>
                <li>Fraudulent or suspicious activity</li>
                <li>Multiple refund requests from the same user</li>
                <li>Promotional or discounted subscriptions (unless otherwise stated)</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">Cancellation vs. Refund</h2>
              <p className="text-muted-foreground">
                <strong>Cancellation:</strong> Stops future billing. You retain access until your 
                current period ends.<br />
                <strong>Refund:</strong> Returns payment for unused service. Access may be 
                terminated immediately upon refund approval.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">Chargebacks</h2>
              <p className="text-muted-foreground">
                If you dispute a charge with your bank before contacting us, we may not be able 
                to offer a direct refund. We encourage you to reach out to our support team first 
                to resolve any billing issues.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold">Contact Us</h2>
              <p className="text-muted-foreground">
                For questions about refunds or billing, contact our support team at 
                billing@medprep.ai. We typically respond within 24 hours on business days.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Refund;
