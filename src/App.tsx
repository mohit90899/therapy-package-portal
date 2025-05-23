
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
import TherapistRegister from "./pages/TherapistRegister";
import RegistrationSuccess from "./pages/RegistrationSuccess";
import Profile from "./pages/Profile";
import TherapistCalendar from "./pages/TherapistCalendar";
import ClientBookings from "./pages/ClientBookings";
import BookingCalendar from "./pages/BookingCalendar";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccess from "./pages/PaymentSuccess";

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
            <Route path="/register/therapist" element={<TherapistRegister />} />
            <Route path="/registration-success" element={<RegistrationSuccess />} />
            <Route path="/packages" element={<ClientPackages />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/therapist/packages" element={<TherapistPackages />} />
            <Route path="/therapist/packages/new" element={<TherapistPackageNew />} />
            <Route path="/therapist/packages/edit/:id" element={<TherapistPackageEdit />} />
            <Route path="/therapist/calendar" element={<TherapistCalendar />} />
            <Route path="/admin/approval" element={<AdminApproval />} />
            <Route path="/client/packages" element={<ClientPackages />} />
            <Route path="/client/bookings" element={<ClientBookings />} />
            <Route path="/calendar/booking" element={<BookingCalendar />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
