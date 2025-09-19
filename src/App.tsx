import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./components/LoginPage";
import BlockedPage from "./components/BlockedPage";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on app load
    const authStatus = localStorage.getItem('isAuthenticated');
    const attempts = localStorage.getItem('loginAttempts');
    const lastAttempt = localStorage.getItem('lastAttempt');

    if (attempts && parseInt(attempts) >= 3) {
      if (lastAttempt) {
        const lastAttemptDate = new Date(lastAttempt);
        const now = new Date();
        const hoursDiff = (now.getTime() - lastAttemptDate.getTime()) / (1000 * 60 * 60);
        
        // Check if still blocked (24 hours for testing, normally 48 hours)
        if (hoursDiff < 24) {
          setIsBlocked(true);
        } else {
          // Clear expired block
          localStorage.removeItem('loginAttempts');
          localStorage.removeItem('lastAttempt');
        }
      }
    }

    setIsAuthenticated(authStatus === 'true');
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setIsBlocked(false);
  };

  const handleBlock = () => {
    setIsBlocked(true);
    setIsAuthenticated(false);
  };

  const handleRetry = () => {
    setIsBlocked(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isBlocked) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BlockedPage onRetry={handleRetry} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <LoginPage onLogin={handleLogin} onBlock={handleBlock} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index onLogout={handleLogout} />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
