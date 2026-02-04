import { Hero } from '@/components/landing/Hero';
import { AuthCard } from '@/components/landing/AuthCard';
import { FeatureCards } from '@/components/landing/FeatureCards';
import { PricingCards } from '@/components/landing/PricingCards';
import { Footer } from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Landing = () => {
  const { toast } = useToast();

  const handleSelectPlan = (planId: string) => {
    if (planId === 'starter') {
      toast({
        title: 'Already on Starter',
        description: 'You are already on the free plan.',
      });
    } else {
      toast({
        title: 'Sign up required',
        description: 'Please create an account to upgrade your plan.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      {/* Auth Section */}
      <section className="py-12">
        <div className="container mx-auto flex justify-center px-4">
          <AuthCard />
        </div>
      </section>
      
      {/* SEO Block */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-2xl font-semibold">
            The Smart Way to Study Medicine
          </h2>
          <p className="mx-auto max-w-3xl text-muted-foreground">
            MedPrep AI combines cutting-edge artificial intelligence with proven spaced 
            repetition techniques to help medical students master complex anatomy concepts. 
            Our adaptive quiz engine generates personalized questions based on your 
            performance, ensuring you focus on areas that need the most attention.
          </p>
        </div>
      </section>
      
      <FeatureCards />
      
      <div className="bg-muted/30">
        <PricingCards onSelectPlan={handleSelectPlan} />
      </div>
      
      <Footer />
    </div>
  );
};

export default Landing;
