import { useFormContext } from "react-hook-form";
import { WaiverFormData } from "./waiver-validation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function Documents() {
  const {
    register,
    formState: { errors },
  } = useFormContext<WaiverFormData>();

  return (
    <Card className="bg-white shadow-sm">
      <div className="p-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-900">Documents</h2>
      </div>

      <div className="p-4 space-y-4">
        <div className="justify-items-center p-4">
          <p>Select File(s) to Upload</p>
          <p>Only PDF, JPG, and PNG formats are accepted</p>
          <Button className="h-8">
            <Upload />
            Upload Documents
          </Button>
        </div>
      </div>
    </Card>
  );
}
