import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { mockQuizQuestions, anatomyTopics, QuizQuestion } from '@/lib/mock-data';
import { Shuffle, Loader2, ChevronDown, Check, X, BookOpen, AlertTriangle, Flag, Plus, PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils';

type QuizState = 'topic-selection' | 'loading' | 'taking-quiz' | 'results';

export function QuizTab() {
  const { tokens, useToken, quizSettings, addFlashcard, addQuizResult, addTransaction } = useApp();
  const { toast } = useToast();
  
  const [quizState, setQuizState] = useState<QuizState>('topic-selection');
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: string }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showFeedback, setShowFeedback] = useState<{ [questionId: string]: boolean }>({});
  const [expandedResults, setExpandedResults] = useState<{ [questionId: string]: boolean }>({});

  const handleSurpriseMe = () => {
    const randomTopic = anatomyTopics[Math.floor(Math.random() * anatomyTopics.length)];
    setTopic(randomTopic);
    toast({
      title: 'Topic selected!',
      description: `Let's study: ${randomTopic}`,
    });
  };

  const handleGenerateQuiz = async () => {
    if (!topic.trim()) {
      toast({
        title: 'Please enter a topic',
        description: 'Type a topic or click "Surprise Me"',
        variant: 'destructive',
      });
      return;
    }

    if (tokens <= 0) {
      toast({
        title: 'Insufficient Tokens',
        description: 'Please top up in the Wallet tab.',
        variant: 'destructive',
      });
      return;
    }

    // Use token
    useToken();
    addTransaction({
      date: new Date().toISOString().split('T')[0],
      activity: 'Quiz Generated',
      model: 'GPT-4',
      tokensUsed: 1,
      systemCost: '$0.03',
    });

    // Show loading
    setQuizState('loading');

    // Simulate quiz generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Get random questions
    const shuffled = [...mockQuizQuestions].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, Math.min(quizSettings.questionCount, shuffled.length));
    
    setQuestions(selectedQuestions);
    setUserAnswers({});
    setShowFeedback({});
    setCurrentQuestionIndex(0);
    setQuizState('taking-quiz');
  };

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
    
    if (quizSettings.mode === 'tutor') {
      setShowFeedback(prev => ({ ...prev, [questionId]: true }));
    }
  };

  const handleSubmitExam = () => {
    // Calculate score
    const score = questions.reduce((acc, q) => {
      const userAnswer = userAnswers[q.id];
      const correctOption = q.options.find(o => o.isCorrect);
      return acc + (userAnswer === correctOption?.letter ? 1 : 0);
    }, 0);

    // Save result
    addQuizResult({
      id: `r${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      topic,
      score,
      total: questions.length,
      mode: quizSettings.mode,
      questions,
      userAnswers,
    });

    setQuizState('results');
  };

  const handleAddToSmartReview = (question: QuizQuestion) => {
    const correctOption = question.options.find(o => o.isCorrect);
    addFlashcard({
      front: question.text,
      back: `${correctOption?.letter}. ${correctOption?.text}\n\n${question.professorsLogic}`,
      topic: question.topic,
    });
    toast({
      title: 'Added to Memory Deck',
      description: 'This question will appear in your Smart Review sessions.',
    });
  };

  const handleReportError = () => {
    toast({
      title: 'Thanks!',
      description: 'We will review this question.',
    });
  };

  const handleStartNewQuiz = () => {
    setQuizState('topic-selection');
    setTopic('');
    setQuestions([]);
    setUserAnswers({});
    setShowFeedback({});
    setExpandedResults({});
  };

  const calculateScore = () => {
    return questions.reduce((acc, q) => {
      const userAnswer = userAnswers[q.id];
      const correctOption = q.options.find(o => o.isCorrect);
      return acc + (userAnswer === correctOption?.letter ? 1 : 0);
    }, 0);
  };

  // Topic Selection
  if (quizState === 'topic-selection') {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Anatomy Professor AI</h1>
          <p className="text-muted-foreground">Prepare for your Exam</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select a Topic</CardTitle>
            <CardDescription>Enter an anatomy topic or let us pick one for you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Type a topic... (e.g., Brachial Plexus, Thoracic Wall)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="flex-1"
              />
              <Button variant="outline" onClick={handleSurpriseMe}>
                <Shuffle className="mr-2 h-4 w-4" />
                Surprise Me
              </Button>
            </div>

            <Button 
              className="w-full" 
              size="lg" 
              onClick={handleGenerateQuiz}
              disabled={tokens <= 0}
            >
              Generate Quiz (Cost: 1 Token)
            </Button>

            {tokens <= 0 && (
              <p className="text-center text-sm text-destructive">
                Insufficient Tokens. Please top up in the Wallet tab.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Loading
  if (quizState === 'loading') {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-lg text-muted-foreground">Generating your personalized quiz...</p>
          <p className="mt-2 text-sm text-muted-foreground">Our AI is crafting questions for: {topic}</p>
        </div>
      </div>
    );
  }

  // Taking Quiz
  if (quizState === 'taking-quiz') {
    const score = calculateScore();
    const answeredCount = Object.keys(userAnswers).length;

    return (
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Topic: {topic}</h2>
            <p className="text-sm text-muted-foreground">
              {quizSettings.mode === 'exam' ? 'Exam Mode' : 'Tutor Mode'} • {answeredCount}/{questions.length} answered
            </p>
          </div>
          {quizSettings.mode === 'exam' && (
            <Badge variant="secondary">Answers hidden until submission</Badge>
          )}
        </div>

        <div className="space-y-6">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[question.id];
            const correctOption = question.options.find(o => o.isCorrect);
            const isCorrect = userAnswer === correctOption?.letter;
            const shouldShowFeedback = quizSettings.mode === 'tutor' && showFeedback[question.id];

            return (
              <Card key={question.id}>
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="shrink-0">Q{index + 1}</Badge>
                    <CardTitle className="text-base font-normal leading-relaxed">
                      {question.text}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup
                    value={userAnswer}
                    onValueChange={(value) => handleAnswerSelect(question.id, value)}
                    disabled={shouldShowFeedback}
                  >
                    {question.options.map((option) => {
                      const isSelected = userAnswer === option.letter;
                      const isCorrectOption = option.isCorrect;
                      
                      let optionClass = '';
                      if (shouldShowFeedback) {
                        if (isCorrectOption) {
                          optionClass = 'border-success bg-success/10';
                        } else if (isSelected && !isCorrectOption) {
                          optionClass = 'border-destructive bg-destructive/10';
                        }
                      }

                      return (
                        <div 
                          key={option.letter}
                          className={cn(
                            "flex items-center space-x-3 rounded-lg border p-3 transition-colors",
                            optionClass,
                            !shouldShowFeedback && isSelected && "border-primary bg-primary/5"
                          )}
                        >
                          <RadioGroupItem value={option.letter} id={`${question.id}-${option.letter}`} />
                          <Label 
                            htmlFor={`${question.id}-${option.letter}`} 
                            className="flex-1 cursor-pointer"
                          >
                            <span className="font-medium">{option.letter}.</span> {option.text}
                          </Label>
                          {shouldShowFeedback && isCorrectOption && (
                            <Check className="h-5 w-5 text-success" />
                          )}
                          {shouldShowFeedback && isSelected && !isCorrectOption && (
                            <X className="h-5 w-5 text-destructive" />
                          )}
                        </div>
                      );
                    })}
                  </RadioGroup>

                  {/* Tutor Mode Feedback */}
                  {shouldShowFeedback && (
                    <div className="space-y-4 pt-4 border-t">
                      <div className={cn(
                        "flex items-center gap-2 text-lg font-medium",
                        isCorrect ? "text-success" : "text-destructive"
                      )}>
                        {isCorrect ? (
                          <>
                            <Check className="h-5 w-5" />
                            Correct!
                          </>
                        ) : (
                          <>
                            <X className="h-5 w-5" />
                            Incorrect
                          </>
                        )}
                      </div>

                      <div className="rounded-lg bg-muted p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="h-4 w-4 text-primary" />
                          <span className="font-medium">Professor's Logic</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{question.professorsLogic}</p>
                      </div>

                      <Collapsible>
                        <CollapsibleTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                          <ChevronDown className="h-4 w-4" />
                          Detailed Analysis
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-3 space-y-2">
                          {question.options.map((option) => (
                            <div 
                              key={option.letter}
                              className={cn(
                                "rounded-lg border p-3",
                                option.isCorrect && "border-success bg-success/5",
                                userAnswer === option.letter && !option.isCorrect && "border-destructive bg-destructive/5"
                              )}
                            >
                              <p className="font-medium mb-1">
                                {option.letter}. {option.text}
                              </p>
                              <p className="text-sm text-muted-foreground">{option.explanation}</p>
                            </div>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Button size="lg" onClick={handleSubmitExam}>
            {quizSettings.mode === 'exam' ? 'Submit Exam' : 'End Session & Save Results'}
          </Button>
        </div>
      </div>
    );
  }

  // Results
  if (quizState === 'results') {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 60;

    return (
      <div className="mx-auto max-w-3xl">
        {/* Celebration */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <PartyPopper className="mx-auto h-16 w-16 text-primary animate-bounce" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Exam Results</h1>
          <div className={cn(
            "text-4xl font-bold",
            passed ? "text-success" : "text-destructive"
          )}>
            Score: {score}/{questions.length} ({percentage}%)
          </div>
          <Badge 
            variant={passed ? 'default' : 'destructive'} 
            className="mt-2"
          >
            {passed ? 'PASSED' : 'NEEDS REVIEW'}
          </Badge>
        </div>

        {/* Detailed Review */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Detailed Review</h2>
          
          {questions.map((question, index) => {
            const userAnswer = userAnswers[question.id];
            const correctOption = question.options.find(o => o.isCorrect);
            const isCorrect = userAnswer === correctOption?.letter;
            const isExpanded = expandedResults[question.id];

            return (
              <Collapsible
                key={question.id}
                open={isExpanded}
                onOpenChange={(open) => setExpandedResults(prev => ({ ...prev, [question.id]: open }))}
              >
                <Card>
                  <CollapsibleTrigger className="w-full">
                    <CardHeader className="flex flex-row items-center gap-3">
                      <div className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full",
                        isCorrect ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                      )}>
                        {isCorrect ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium">Question {index + 1}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">{question.text}</p>
                      </div>
                      <ChevronDown className={cn(
                        "h-5 w-5 text-muted-foreground transition-transform",
                        isExpanded && "rotate-180"
                      )} />
                    </CardHeader>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <CardContent className="space-y-4 pt-0">
                      <div className="rounded-lg bg-muted p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="h-4 w-4 text-primary" />
                          <span className="font-medium">Professor's Logic</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{question.professorsLogic}</p>
                      </div>

                      <div className="space-y-2">
                        {question.options.map((option) => (
                          <div 
                            key={option.letter}
                            className={cn(
                              "rounded-lg border p-3",
                              option.isCorrect && "border-success bg-success/5",
                              userAnswer === option.letter && !option.isCorrect && "border-destructive bg-destructive/5"
                            )}
                          >
                            <p className="font-medium mb-1">
                              {option.letter}. {option.text}
                              {option.isCorrect && <Badge className="ml-2" variant="outline">Correct</Badge>}
                              {userAnswer === option.letter && !option.isCorrect && (
                                <Badge className="ml-2" variant="destructive">Your answer</Badge>
                              )}
                            </p>
                            <p className="text-sm text-muted-foreground">{option.explanation}</p>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAddToSmartReview(question)}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add to Smart Review
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={handleReportError}
                        >
                          <Flag className="mr-2 h-4 w-4" />
                          Report Error
                        </Button>
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <Button size="lg" onClick={handleStartNewQuiz}>
            Start New Quiz
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
