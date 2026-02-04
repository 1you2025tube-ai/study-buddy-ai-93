import { GraduationCap } from 'lucide-react';

export function Hero() {
  return (
    <section className="gradient-hero py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">Medical Exam Preparation</span>
          </div>
        </div>
        <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Master Anatomy with{' '}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI-Powered
          </span>{' '}
          Learning
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Prepare for USMLE, Physikum, PLAB and more with adaptive quizzes, 
          instant feedback, and intelligent spaced repetition.
        </p>
      </div>
    </section>
  );
}
