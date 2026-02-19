import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DataProvider } from "@/contexts/DataContext";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Announcements from "./pages/Announcements";
import Assignments from "./pages/Assignments";
import Resources from "./pages/Resources";
import Timetable from "./pages/Timetable";
import Contacts from "./pages/Contacts";
import Feedback from "./pages/Feedback";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AnnouncementDetail from "./pages/AnnouncementDetail";
import AssignmentDetail from "./pages/AssignmentDetail";
import ResourceDetail from "./pages/ResourceDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <DataProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/announcements" element={<Announcements />} />
                <Route path="/announcements/:id" element={<AnnouncementDetail />} />
                <Route path="/assignments" element={<Assignments />} />
                <Route path="/assignments/:id" element={<AssignmentDetail />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/resources/:id" element={<ResourceDetail />} />
                <Route path="/timetable" element={<Timetable />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
