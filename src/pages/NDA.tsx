import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FileText, Download, Upload, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const NDA = () => {
  const [ndaStatus, setNdaStatus] = useState<"pending" | "signed" | "approved">("pending");
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setNdaStatus("signed");
      toast({
        title: "NDA Uploaded",
        description: "Your signed NDA has been successfully uploaded."
      });
    }
  };

  const downloadTemplate = () => {
    // In a real app, this would download the actual NDA template
    toast({
      title: "Downloading Template",
      description: "The NDA template is being downloaded."
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Non-Disclosure Agreement</h1>
        
        <Alert>
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Please review and sign the NDA to proceed with the onboarding process.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>NDA Status: {ndaStatus.charAt(0).toUpperCase() + ndaStatus.slice(1)}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ndaStatus === "pending" && (
              <div className="space-y-4">
                <p className="text-gray-600">
                  To begin the partnership process, please download, sign, and upload the NDA.
                </p>
                <div className="flex gap-4">
                  <Button onClick={downloadTemplate}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Template
                  </Button>
                  <Button
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = '.pdf,.doc,.docx';
                      input.onchange = (e) => handleFileUpload(e as any);
                      input.click();
                    }}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Signed NDA
                  </Button>
                </div>
              </div>
            )}
            
            {ndaStatus === "signed" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-success">
                  <CheckCircle className="h-5 w-5" />
                  <span>NDA uploaded successfully</span>
                </div>
                <p className="text-gray-600">
                  Your NDA is currently under review. We'll notify you once it's approved.
                </p>
                {file && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <FileText className="h-4 w-4" />
                    <span>{file.name}</span>
                  </div>
                )}
              </div>
            )}
            
            {ndaStatus === "approved" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-success">
                  <CheckCircle className="h-5 w-5" />
                  <span>NDA approved</span>
                </div>
                <p className="text-gray-600">
                  You can now proceed with uploading the required documents.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default NDA;