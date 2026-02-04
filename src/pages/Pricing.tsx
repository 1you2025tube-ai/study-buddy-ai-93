import { Link } from 'react-router-dom';
import { Footer } from '@/components/Footer';
import { PricingCards } from '@/components/landing/PricingCards';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const faqs = [
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. Payment processing is handled securely through Stripe.',
  },
  {
    question: 'Do unused tokens roll over?',
    answer: 'Monthly tokens do not roll over to the next billing period. However, Annual plan tokens are available for the entire year.',
  },
  {
    question: 'Is there a student discount?',
    answer: 'Yes! Students with a valid .edu email address receive an additional 20% off any paid plan. Contact support to apply the discount.',
  },
  {
    question: 'What is your refund policy?',
    answer: 'We offer a 7-day money-back guarantee on all paid plans. If you\'re not satisfied, contact us within 7 days for a full refund.',
  },
];

const Pricing = () => {
  const { toast } = useToast();

  const handleSelectPlan = (planId: string) => {
    toast({
      title: 'Sign in required',
      description: 'Please sign in to subscribe to a plan.',
    });
  };

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
          <h1 className="text-xl font-semibold">Pricing</h1>
        </div>
      </header>

      {/* Pricing Hero */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 text-4xl font-bold">Pricing</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Simple, transparent pricing for medical students. Choose the plan that fits your study goals.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <PricingCards onSelectPlan={handleSelectPlan} />

      {/* How Tokens Work */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-center text-2xl font-bold">How tokens work</h2>
          <div className="mx-auto max-w-2xl text-center text-muted-foreground">
            <p className="mb-4">
              Tokens are the currency of MedPrep AI. Each quiz generation costs 1 token. 
              The more tokens you have, the more quizzes you can generate.
            </p>
            <p>
              Free users receive 50 tokens daily. Pro users get a monthly or yearly allocation 
              with unlimited flashcard reviews and advanced analytics.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold">Frequently Asked Questions</h2>
          <div className="mx-auto max-w-2xl">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Enterprise */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold">University & Enterprise</h2>
          <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
            Looking for custom plans for your institution? We offer bulk licensing and LMS integration.
          </p>
          <Button variant="outline">Contact Sales</Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
