import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, AlertCircle, FileText } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Status = () => {
  const steps = [
    { 
      id: 1, 
      name: "NDA Submission", 
      status: "complete", 
      date: "2024-01-15",
      icon: FileText,
      description: "Non-Disclosure Agreement submitted and verified"
    },
    { 
      id: 2, 
      name: "Financial Statements", 
      status: "complete", 
      date: "2024-01-17",
      icon: FileText,
      description: "Last 2 years of financial statements uploaded"
    },
    { 
      id: 3, 
      name: "Business Plan", 
      status: "in-progress", 
      date: "2024-01-20",
      icon: FileText,
      description: "Detailed business plan and strategy document"
    },
    { 
      id: 4, 
      name: "Compliance Documents", 
      status: "pending", 
      date: null,
      icon: FileText,
      description: "Regulatory compliance certificates and documentation"
    },
    { 
      id: 5, 
      name: "Final Review", 
      status: "pending", 
      date: null,
      icon: FileText,
      description: "Final review and partnership approval"
    },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      stepsRef.current.forEach((step, index) => {
        if (!step) return;
        
        const rect = step.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const visibleThreshold = windowHeight * 0.7;

        // Check if element is in viewport
        if (rect.top < visibleThreshold && rect.bottom > 0) {
          setActiveStep(index);
          
          // Calculate parallax and opacity based on scroll position
          const scrollProgress = (visibleThreshold - rect.top) / visibleThreshold;
          const translateY = Math.min(20 * scrollProgress, 20);
          const opacity = Math.min(0.4 + scrollProgress, 1);
          
          step.style.transform = `translateY(${translateY}px)`;
          step.style.opacity = opacity.toString();
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
        return <CheckCircle className="h-6 w-6 text-success animate-bounce" />;
      case "in-progress":
        return <Clock className="h-6 w-6 text-primary animate-pulse" />;
      default:
        return <AlertCircle className="h-6 w-6 text-gray-300" />;
    }
  };

  const calculateProgress = () => {
    const completedSteps = steps.filter(step => step.status === "complete").length;
    return (completedSteps / steps.length) * 100;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold animate-fade-in">Document Workflow Status</h1>
        
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
              className={`
                transition-all duration-700 ease-out opacity-0
                ${index === activeStep ? 'scale-105' : 'scale-100'}
              `}
            >
              <Card className={`
                hover:shadow-lg transition-all duration-300
                ${index === activeStep ? 'border-primary' : ''}
                ${step.status === 'complete' ? 'bg-green-50' : ''}
                ${step.status === 'in-progress' ? 'bg-blue-50' : ''}
              `}>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className={`
                      p-3 rounded-full
                      ${step.status === 'complete' ? 'bg-green-100' : ''}
                      ${step.status === 'in-progress' ? 'bg-blue-100' : ''}
                      ${step.status === 'pending' ? 'bg-gray-100' : ''}
                    `}>
                      {getStatusIcon(step.status)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{step.name}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                      {step.date && (
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(step.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    {step.status === "complete" && (
                      <span className="text-success animate-fade-in">Completed</span>
                    )}
                    {step.status === "in-progress" && (
                      <span className="text-primary animate-pulse">In Progress</span>
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