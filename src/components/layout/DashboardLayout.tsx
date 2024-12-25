import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { 
  LayoutDashboard, 
  FileText, 
  Upload, 
  Clock, 
  LogOut 
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-primary">FinTech Portal</h1>
          </div>
          <Button
            variant="ghost"
            onClick={() => {
              navigate("/");
              toast({
                title: "Success",
                description: "Logged out successfully"
              });
            }}
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </nav>

      <div className="flex h-screen pt-16">
        <aside className="w-64 bg-white border-r fixed h-full">
          <div className="p-4 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate("/dashboard")}
            >
              <LayoutDashboard className="h-5 w-5 mr-2" />
              Dashboard
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate("/dashboard/nda")}
            >
              <FileText className="h-5 w-5 mr-2" />
              NDA
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate("/dashboard/documents")}
            >
              <Upload className="h-5 w-5 mr-2" />
              Documents
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate("/dashboard/status")}
            >
              <Clock className="h-5 w-5 mr-2" />
              Status
            </Button>
          </div>
        </aside>

        <main className="flex-1 ml-64 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};