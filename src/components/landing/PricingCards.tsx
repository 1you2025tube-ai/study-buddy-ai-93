import { Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { pricingPlans } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface PricingCardsProps {
  onSelectPlan?: (planId: string) => void;
  showActions?: boolean;
  currentPlan?: string;
}

export function PricingCards({ onSelectPlan, showActions = true, currentPlan = 'starter' }: PricingCardsProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-3xl font-bold">
          Simple, transparent pricing
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
          Choose the plan that fits your study schedule. Upgrade or downgrade anytime.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={cn(
                "relative transition-shadow hover:shadow-lg",
                plan.popular && "border-primary shadow-md"
              )}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    €{plan.price}
                  </span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="mb-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-success" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                {showActions && (
                  <Button 
                    className="w-full" 
                    variant={plan.id === currentPlan ? 'secondary' : plan.popular ? 'default' : 'outline'}
                    disabled={plan.id === currentPlan}
                    onClick={() => onSelectPlan?.(plan.id)}
                  >
                    {plan.id === currentPlan ? 'Current plan' : 'Get started'}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
