import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Documents from "./pages/Documents";
import { DashboardLayout } from "./components/layout/DashboardLayout";

const queryClient = new QueryClient();

const Dashboard = () => (
  <DashboardLayout>
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold">Welcome to FinTech Portal</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold mb-2">NDA Status</h2>
          <p className="text-gray-600">Pending Signature</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold mb-2">Documents</h2>
          <p className="text-gray-600">0 / 5 Uploaded</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold mb-2">Overall Progress</h2>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: "20%" }}></div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/documents" element={<Documents />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;