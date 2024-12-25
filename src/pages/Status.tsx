import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

const Status = () => {
  const steps = [
    { id: 1, name: "NDA Submission", status: "complete", date: "2024-01-15" },
    { id: 2, name: "NDA Approval", status: "complete", date: "2024-01-17" },
    { id: 3, name: "Document Upload", status: "in-progress", date: "2024-01-20" },
    { id: 4, name: "Document Review", status: "pending", date: null },
    { id: 5, name: "Partnership Approval", status: "pending", date: null },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "in-progress":
        return <Clock className="h-5 w-5 text-primary" />;
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
        <h1 className="text-3xl font-bold">Onboarding Status</h1>
        
        <Card className="mb-6">
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

        <div className="space-y-4">
          {steps.map((step, index) => (
            <Card key={step.id}>
              <CardContent className="flex items-center justify-between p-4">
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
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Status;