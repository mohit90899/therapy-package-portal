
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TherapistPackages from "./pages/TherapistPackages";
import TherapistPackageNew from "./pages/TherapistPackageNew";
import TherapistPackageEdit from "./pages/TherapistPackageEdit";
import AdminApproval from "./pages/AdminApproval";
import ClientPackages from "./pages/ClientPackages";

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/packages" element={<ClientPackages />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/therapist/packages" element={<TherapistPackages />} />
            <Route path="/therapist/packages/new" element={<TherapistPackageNew />} />
            <Route path="/therapist/packages/edit/:id" element={<TherapistPackageEdit />} />
            <Route path="/admin/approval" element={<AdminApproval />} />
            <Route path="/client/packages" element={<ClientPackages />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
