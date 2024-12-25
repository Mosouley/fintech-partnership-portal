import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, File, CheckCircle, XCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const requiredDocuments = [
  { id: 1, name: "Financial Statements", description: "Last 2 years of financial statements" },
  { id: 2, name: "Business Plan", description: "Detailed business plan and strategy" },
  { id: 3, name: "Compliance Certificates", description: "Regulatory compliance documents" },
  { id: 4, name: "Company Registration", description: "Company registration documents" },
  { id: 5, name: "Tax Documents", description: "Recent tax returns" },
];

const Documents = () => {
  const [uploadedDocs, setUploadedDocs] = useState<{ [key: number]: File | null }>({});

  const handleFileUpload = (docId: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedDocs(prev => ({ ...prev, [docId]: file }));
      toast({
        title: "Document uploaded",
        description: `${file.name} has been uploaded successfully.`
      });
    }
  };

  const uploadProgress = (Object.keys(uploadedDocs).length / requiredDocuments.length) * 100;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Required Documents</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {Object.keys(uploadedDocs).length} of {requiredDocuments.length} uploaded
            </span>
            <Progress value={uploadProgress} className="w-40" />
          </div>
        </div>

        <div className="grid gap-4">
          {requiredDocuments.map((doc) => (
            <Card key={doc.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">{doc.name}</CardTitle>
                {uploadedDocs[doc.id] ? (
                  <CheckCircle className="h-5 w-5 text-success" />
                ) : (
                  <XCircle className="h-5 w-5 text-destructive" />
                )}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">{doc.description}</p>
                <div className="flex items-center gap-4">
                  <Button
                    variant={uploadedDocs[doc.id] ? "outline" : "default"}
                    className="w-full"
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = '.pdf,.doc,.docx';
                      input.onchange = (e) => handleFileUpload(doc.id)(e as any);
                      input.click();
                    }}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {uploadedDocs[doc.id] ? 'Replace Document' : 'Upload Document'}
                  </Button>
                  {uploadedDocs[doc.id] && (
                    <div className="flex items-center text-sm text-gray-600">
                      <File className="h-4 w-4 mr-2" />
                      {uploadedDocs[doc.id]?.name}
                    </div>
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

export default Documents;