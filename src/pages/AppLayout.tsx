import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { AppSidebar } from '@/components/app/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuizTab } from '@/components/app/QuizTab';
import { DashboardTab } from '@/components/app/DashboardTab';
import { WalletTab } from '@/components/app/WalletTab';
import { SrsOverlay } from '@/components/app/SrsOverlay';
import { Loader2 } from 'lucide-react';

const AppLayout = () => {
  const { isAuthenticated, isLoading, isSrsActive } = useApp();
  const [activeTab, setActiveTab] = useState('quiz');
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Simulate post-login loading
    const timer = setTimeout(() => setShowLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Redirect to landing if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Post-login loading state
  if (showLoading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-lg text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        
        <main className="flex-1 overflow-auto">
          <header className="flex h-14 items-center gap-4 border-b bg-card px-6">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">MedPrep AI</h1>
          </header>
          
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="quiz">Quiz</TabsTrigger>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="wallet">Wallet</TabsTrigger>
              </TabsList>
              
              <TabsContent value="quiz">
                <QuizTab />
              </TabsContent>
              
              <TabsContent value="dashboard">
                <DashboardTab />
              </TabsContent>
              
              <TabsContent value="wallet">
                <WalletTab />
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        {isSrsActive && <SrsOverlay />}
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
