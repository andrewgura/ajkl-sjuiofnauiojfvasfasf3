"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CirclePlay, Copy, FileText, History, Save, Send } from "lucide-react";
import { useSearchParams } from "next/navigation";
import type { WaiverData, WaiverProcessData } from "@/lib/actions/waiver/waiver-types";
import { useFormContext } from "react-hook-form";
import { WaiverFormData } from "./waiver-validation";

function getWaiverType() {
  const waiverType = decodeURIComponent(useSearchParams().get("type") ?? '');
  return waiverType;
}

interface InfoBoxProps {
  confirmation?: string;
  waiverId: string;
  currentProcessStep: string;
  waiver: WaiverData | null;
  process: WaiverProcessData | null;
  onProcessClick: () => void;
  onSaveDraftClick: () => void;
}

export default function InfoBox({
  confirmation,
  waiverId,
  currentProcessStep,
  waiver,
  process,
  onProcessClick,
  onSaveDraftClick,
}: InfoBoxProps) {

  const { handleSubmit, formState: { isValid } } = useFormContext<WaiverFormData>();

  const onSubmitClick = () => {
    console.log('submit clicked!, isValid', isValid);
    handleSubmit((data) => {
      console.log('Final Submission from button:', data);
    })(); // The extra () is necessary to execute the function
  };

  const handleCopy = () => {
    console.log("Copy clicked");
  };

  const handleCaseNotes = () => {
    console.log("Case notes clicked");
  };

  const handleTransactions = () => {
    console.log("Transactions clicked");
  };

  const handleProcess = () => {
    // Only allow process view if waiver is ready for processing workflow
    const isProcessReady = waiver?.status === 'PROCESSING' ||
      waiver?.status === 'REJECTED' ||
      waiver?.status === 'COMPLETED';

    if (isProcessReady) {
      onProcessClick();
    }
  };

  // Check if process workflow is available
  const isProcessReady = waiver?.status === 'PROCESSING' ||
    waiver?.status === 'REJECTED' ||
    waiver?.status === 'COMPLETED';

  // Format dates for display
  const formatDate = (date: Date | undefined | null): string => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  // Format status for display
  const formatStatus = (status: string | undefined): string => {
    if (!status) return "Unknown";

    // Convert underscores to spaces and make it more readable
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Format processing step for display
  const formatProcessingStep = (step: string | undefined): string => {
    if (!step) return "Not ready for processing";

    // Convert underscores to spaces and make it more readable
    return step
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Get status color based on status value
  const getStatusColor = (status: string | undefined): string => {
    if (!status) return "text-gray-600";

    if (status.startsWith('REJECTED_')) {
      return "text-red-600";
    } else if (status === 'COMPLETED') {
      return "text-green-600";
    } else if (status === 'ACTIVE') {
      return "text-blue-600";
    } else {
      return "text-gray-600";
    }
  };

  // Get processing step color
  const getProcessingStepColor = (step: string | undefined): string => {
    if (!step) return "text-gray-600";

    if (step.startsWith('REJECTED_')) {
      return "text-red-600";
    } else if (step === 'COMPLETED') {
      return "text-green-600";
    } else {
      return "text-blue-600";
    }
  };

  // Get waiver type from database or fallback to URL
  const displayWaiverType = waiver?.waiverType || getWaiverType() || "Unknown";

  return (
    <Card className="bg-gray shadow-md mb-4">
      <div className="">
        <div className="px-4 pt-4">
          <div className="justify-items-stretch border-b border-gray-300">
            <div className="grid grid-cols-7 gap-y-0 justify-items-center">
              <div className="text-xs font-medium text-gray-700">
                Waiver Type
              </div>
              <div className="text-xs font-medium text-gray-700">
                Confirmation #
              </div>
              <div className="text-xs font-medium text-gray-700">
                Start Date
              </div>
              <div className="text-xs font-medium text-gray-700">End Date</div>
              <div className="text-xs font-medium text-gray-700">Assigned</div>
              <div className="text-xs font-medium text-gray-700">Status</div>
              <div className="text-xs font-medium text-gray-700">Processing Step</div>

              <div className="text-sm font-semibold">{displayWaiverType}</div>
              <div className="text-sm font-semibold">{confirmation}</div>
              <div className="text-sm font-semibold">{formatDate(waiver?.startDate)}</div>
              <div className="text-sm font-semibold">{formatDate(waiver?.endDate)}</div>
              <div className="text-sm font-semibold">{waiver?.userId || "Unassigned"}</div>
              <div className={`text-sm font-semibold ${getStatusColor(waiver?.status)}`}>
                {formatStatus(waiver?.status)}
              </div>
              <div className={`text-sm font-semibold ${getProcessingStepColor(waiver?.processingStep)}`}>
                {formatProcessingStep(waiver?.processingStep)}
              </div>
            </div>
          </div>
        </div>
        <div className="justify-items-center">
          <div className="justify-items-center">
            <Button
              className="bg-white text-black hover:bg-gray-200 m-2 border"
              onClick={onSaveDraftClick}
            >
              <Save />
              Save Draft
            </Button>

            <Button
              className="bg-white text-black hover:bg-gray-200 m-2 border"
              onClick={onSubmitClick}
              disabled={!isValid}
            >
              <Send />
              Submit
            </Button>

            <Button
              className="bg-white text-black hover:bg-gray-200 m-2 border"
              onClick={handleCopy}
            >
              <Copy />
              Copy
            </Button>

            <Button
              className="bg-white text-black hover:bg-gray-200 m-2 border"
              onClick={handleCaseNotes}
            >
              <FileText />
              Case Notes
            </Button>

            <Button
              className="bg-white text-black hover:bg-gray-200 m-2 border"
              onClick={handleTransactions}
            >
              <History />
              Transactions
            </Button>

            <Button
              className={`m-2 border ${isProcessReady
                ? 'bg-white text-black hover:bg-gray-200'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              onClick={handleProcess}
              disabled={!isProcessReady}
            >
              <CirclePlay />
              Process
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}