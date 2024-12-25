import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useEffect, useRef } from "react";

const Status = () => {
  const steps = [
    { id: 1, name: "NDA Submission", status: "complete", date: "2024-01-15" },
    { id: 2, name: "NDA Approval", status: "complete", date: "2024-01-17" },
    { id: 3, name: "Document Upload", status: "in-progress", date: "2024-01-20" },
    { id: 4, name: "Document Review", status: "pending", date: null },
    { id: 5, name: "Partnership Approval", status: "pending", date: null },
  ];

  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      stepsRef.current.forEach((step, index) => {
        if (!step) return;
        
        const rect = step.getBoundingClientRect();
        const scrolled = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Check if element is in viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
          const distance = (windowHeight - rect.top) * 0.15;
          step.style.transform = `translateY(${distance}px)`;
          step.style.opacity = Math.min(1, (windowHeight - rect.top) / windowHeight + 0.2).toString();
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="h-5 w-5 text-success animate-fade-in" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-primary animate-pulse" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-300" />;
    }
  };

  const calculateProgress = () => {
    const completedSteps = steps.filter(step => step.status === "complete").length;
    return (completedSteps / steps.length) * 100;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold animate-fade-in">Onboarding Status</h1>
        
        <Card className="mb-6 animate-scale-in">
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={calculateProgress()} className="mb-2" />
            <p className="text-sm text-gray-600">
              {Math.round(calculateProgress())}% Complete
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              ref={el => stepsRef.current[index] = el}
              className="transition-all duration-500 ease-out"
              style={{ opacity: 0, transform: 'translateY(20px)' }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(step.status)}
                    <div>
                      <h3 className="font-semibold">{step.name}</h3>
                      {step.date && (
                        <p className="text-sm text-gray-600">
                          {new Date(step.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    {step.status === "complete" && (
                      <span className="text-success">Completed</span>
                    )}
                    {step.status === "in-progress" && (
                      <span className="text-primary">In Progress</span>
                    )}
                    {step.status === "pending" && (
                      <span className="text-gray-400">Pending</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Status;