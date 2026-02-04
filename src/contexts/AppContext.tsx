import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, mockUser, FlashCard, mockFlashcards, QuizResult, mockQuizHistory, Transaction, mockTransactions } from '@/lib/mock-data';

interface AppContextType {
  // Auth state
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, fullName: string, password: string) => Promise<boolean>;
  logout: () => void;
  
  // Loading states
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  
  // Quiz settings
  quizSettings: {
    language: string;
    examStyle: string;
    mode: 'tutor' | 'exam';
    questionCount: number;
  };
  updateQuizSettings: (settings: Partial<AppContextType['quizSettings']>) => void;
  
  // Tokens
  tokens: number;
  useToken: () => boolean;
  refillTokens: (amount: number) => void;
  
  // Flashcards
  flashcards: FlashCard[];
  addFlashcard: (card: Omit<FlashCard, 'id' | 'nextReview' | 'interval' | 'easeFactor'>) => void;
  updateFlashcardReview: (cardId: string, difficulty: 'again' | 'hard' | 'good' | 'easy') => void;
  getDueFlashcards: () => FlashCard[];
  
  // Quiz history
  quizHistory: QuizResult[];
  addQuizResult: (result: QuizResult) => void;
  
  // Transactions
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  
  // SRS overlay
  isSrsActive: boolean;
  setIsSrsActive: (active: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tokens, setTokens] = useState(mockUser.tokens);
  const [flashcards, setFlashcards] = useState<FlashCard[]>(mockFlashcards);
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>(mockQuizHistory);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [isSrsActive, setIsSrsActive] = useState(false);
  
  const [quizSettings, setQuizSettings] = useState({
    language: 'en',
    examStyle: 'usmle',
    mode: 'tutor' as const,
    questionCount: 10,
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (email && password) {
      setUser({ ...mockUser, email });
      setIsAuthenticated(true);
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const signup = async (email: string, fullName: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && fullName && password) {
      setUser({ ...mockUser, email, fullName });
      setIsAuthenticated(true);
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateQuizSettings = (settings: Partial<typeof quizSettings>) => {
    setQuizSettings(prev => ({ ...prev, ...settings }));
  };

  const useToken = (): boolean => {
    if (tokens > 0) {
      setTokens(prev => prev - 1);
      return true;
    }
    return false;
  };

  const refillTokens = (amount: number) => {
    setTokens(prev => prev + amount);
  };

  const addFlashcard = (card: Omit<FlashCard, 'id' | 'nextReview' | 'interval' | 'easeFactor'>) => {
    const newCard: FlashCard = {
      ...card,
      id: `f${Date.now()}`,
      nextReview: new Date(),
      interval: 1,
      easeFactor: 2.5,
    };
    setFlashcards(prev => [...prev, newCard]);
  };

  const updateFlashcardReview = (cardId: string, difficulty: 'again' | 'hard' | 'good' | 'easy') => {
    setFlashcards(prev => prev.map(card => {
      if (card.id !== cardId) return card;
      
      const intervals = { again: 1, hard: 3, good: 7, easy: 14 };
      const newInterval = intervals[difficulty];
      const nextReview = new Date();
      nextReview.setDate(nextReview.getDate() + newInterval);
      
      return {
        ...card,
        interval: newInterval,
        nextReview,
      };
    }));
  };

  const getDueFlashcards = (): FlashCard[] => {
    const now = new Date();
    return flashcards.filter(card => new Date(card.nextReview) <= now);
  };

  const addQuizResult = (result: QuizResult) => {
    setQuizHistory(prev => [result, ...prev]);
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `t${Date.now()}`,
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      user,
      login,
      signup,
      logout,
      isLoading,
      setIsLoading,
      quizSettings,
      updateQuizSettings,
      tokens,
      useToken,
      refillTokens,
      flashcards,
      addFlashcard,
      updateFlashcardReview,
      getDueFlashcards,
      quizHistory,
      addQuizResult,
      transactions,
      addTransaction,
      isSrsActive,
      setIsSrsActive,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
