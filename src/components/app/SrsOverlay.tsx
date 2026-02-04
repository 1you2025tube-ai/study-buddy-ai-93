import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useApp } from '@/contexts/AppContext';
import { FlashCard } from '@/lib/mock-data';
import { X, RotateCcw, Check, Brain, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SrsOverlay() {
  const { setIsSrsActive, getDueFlashcards, updateFlashcardReview } = useApp();
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState<FlashCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      const dueCards = getDueFlashcards();
      setCards(dueCards);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const currentCard = cards[currentIndex];
  const progress = cards.length > 0 ? ((completed) / cards.length) * 100 : 0;

  const handleDifficulty = (difficulty: 'again' | 'hard' | 'good' | 'easy') => {
    if (currentCard) {
      updateFlashcardReview(currentCard.id, difficulty);
      setCompleted(prev => prev + 1);
      
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setShowAnswer(false);
      } else {
        // All cards reviewed
        setCards([]);
      }
    }
  };

  const handleExit = () => {
    setIsSrsActive(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-full flex-col p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Brain className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">Smart Review Session (SRS)</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={handleExit}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 text-lg text-muted-foreground">Reviewing Memories…</p>
            </div>
          </div>
        )}

        {/* No Cards Due */}
        {!isLoading && cards.length === 0 && (
          <div className="flex flex-1 items-center justify-center">
            <Card className="max-w-md text-center">
              <CardContent className="pt-8 pb-6">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                    <Check className="h-8 w-8 text-success" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">All caught up!</h2>
                <p className="text-muted-foreground mb-6">
                  No cards due for review. Great job keeping up with your studies!
                </p>
                <Button onClick={handleExit}>Return to Dashboard</Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Card Review */}
        {!isLoading && cards.length > 0 && currentCard && (
          <div className="flex flex-1 flex-col">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>Progress</span>
                <span>{completed}/{cards.length} cards</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Topic */}
            <div className="mb-4">
              <Badge variant="outline">Topic: {currentCard.topic}</Badge>
            </div>

            {/* Flashcard */}
            <div className="flex-1 flex items-center justify-center">
              <Card className="w-full max-w-2xl min-h-[300px]">
                <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
                  {/* Front */}
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-2">Question</p>
                    <p className="text-lg">{currentCard.front}</p>
                  </div>

                  {/* Divider / Show Answer */}
                  {!showAnswer ? (
                    <Button onClick={() => setShowAnswer(true)} className="mt-4">
                      Show Answer
                    </Button>
                  ) : (
                    <>
                      <div className="w-full border-t my-6" />
                      
                      {/* Back */}
                      <div className="mb-6">
                        <p className="text-sm text-muted-foreground mb-2">Answer</p>
                        <p className="text-lg font-medium whitespace-pre-line">{currentCard.back}</p>
                      </div>

                      {/* Difficulty Buttons */}
                      <div className="mt-6">
                        <p className="text-sm text-muted-foreground mb-3">How easy was this?</p>
                        <div className="flex flex-wrap justify-center gap-2">
                          <Button 
                            variant="outline" 
                            className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => handleDifficulty('again')}
                          >
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Again (&lt; 1d)
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => handleDifficulty('hard')}
                          >
                            Hard (3d)
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => handleDifficulty('good')}
                          >
                            Good (7d)
                          </Button>
                          <Button 
                            variant="outline" 
                            className="border-success text-success hover:bg-success hover:text-success-foreground"
                            onClick={() => handleDifficulty('easy')}
                          >
                            Easy (14d)
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Exit Button */}
            <div className="flex justify-center mt-6">
              <Button variant="ghost" onClick={handleExit}>
                Exit Review
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
