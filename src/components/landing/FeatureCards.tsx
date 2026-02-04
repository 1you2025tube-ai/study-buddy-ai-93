import { Brain, Globe, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Brain,
    title: 'Adaptive Engine',
    description: 'Our spaced repetition algorithm adapts to your performance. Never waste time on concepts you already know.',
  },
  {
    icon: Globe,
    title: 'Global Exam Styles',
    description: 'Prepare for USMLE, Physikum, PLAB, and more. Switch between exam formats with a single click.',
  },
  {
    icon: Zap,
    title: 'Instant Feedback',
    description: 'Understand why each answer is correct or incorrect with detailed explanations from our AI professor.',
  },
];

export function FeatureCards() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Everything you need to pass
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-0 bg-card shadow-md transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
