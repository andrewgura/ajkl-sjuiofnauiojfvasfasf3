"use client"

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Info, CheckCircle, XCircle } from "lucide-react";
import { approveProcessStep, denyProcessStep } from "@/lib/actions/waiver/waiver-actions";
import { useRouter } from "next/navigation";

interface ProcessingStepProps {
    waiverId: string;
    readOnly?: boolean;
    process?: any;
}

const ProcessingStep: React.FC<ProcessingStepProps> = ({
    waiverId,
    readOnly = false,
    process,
}) => {
    const [comments, setComments] = useState(process?.processingComments || "");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleApprove = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // TODO: Get current user ID from auth context
            const userId = "currentUser";

            const result = await approveProcessStep(waiverId, "PROCESSING", userId, comments);

            if (result.success) {
                // Refresh the page to show updated status
                router.refresh();
            } else {
                setError(result.error?.message || "Failed to approve processing step");
            }
        } catch (err) {
            setError("An unexpected error occurred");
            console.error("Error approving processing step:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReject = async () => {
        if (!comments.trim()) {
            setError("Comments are required when rejecting");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // TODO: Get current user ID from auth context
            const userId = "currentUser";

            const result = await denyProcessStep(waiverId, "PROCESSING", userId, comments, comments);

            if (result.success) {
                // Refresh the page to show updated status
                router.refresh();
            } else {
                setError(result.error?.message || "Failed to reject processing step");
            }
        } catch (err) {
            setError("An unexpected error occurred");
            console.error("Error rejecting processing step:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="p-4">
            {/* Processing Message */}
            {!readOnly && <div className="mt-8 p-6 border border-slate-100 rounded-lg bg-slate-50">
                <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                        <h3 className="text-sm font-medium text-slate-800 mb-2">Request is being processed</h3>
                        <p className="text-sm text-slate-600">
                            The server is currently validating all submitted information and will update the status soon.
                        </p>
                        <p className="text-sm text-slate-600 mt-2">
                            You can also manually override the system decision by approving.
                        </p>
                    </div>
                </div>
            </div>}

            {/* Manual Override Section */}
            {!readOnly && (
                <div className="mt-6 p-6 border border-slate-200 rounded-lg bg-white">
                    <h4 className="text-sm font-medium text-slate-800 mb-4">Manual Override</h4>

                    {/* Comments Field */}
                    <div className="mb-4">
                        <Label htmlFor="comments" className="text-sm font-medium text-slate-700">
                            Comments
                        </Label>
                        <Textarea
                            id="comments"
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            placeholder="Add comments for approval or rejection..."
                            className="mt-1"
                            rows={3}
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="w-full flex gap-3">
                        <Button
                            onClick={handleApprove}
                            disabled={isLoading}
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            {isLoading ? "Approving..." : "Approve"}
                        </Button>

                        <Button
                            onClick={handleReject}
                            disabled={isLoading}
                            variant="destructive"
                        >
                            <XCircle className="w-4 h-4 mr-2" />
                            {isLoading ? "Rejecting..." : "Reject"}
                        </Button>
                    </div>
                </div>
            )}

            {/* Read-only data display */}
            {readOnly && process && (
                <div className="mt-6 p-6 border border-slate-200 rounded-lg bg-slate-50">
                    <h4 className="text-sm font-medium text-slate-800 mb-4">Processing Details</h4>

                    {process.processingComments && (
                        <div className="mb-3">
                            <Label className="text-sm font-medium text-slate-700">Comments:</Label>
                            <div className="mt-1 p-3 bg-white border rounded text-sm text-slate-600">
                                {process.processingComments}
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <Label className="text-sm font-medium text-slate-700">Status:</Label>
                            <div className="mt-1 text-slate-600">
                                {process.processingApproved === 'Y' ? 'Approved' : 'Rejected'}
                            </div>
                        </div>
                        <div>
                            <Label className="text-sm font-medium text-slate-700">Date:</Label>
                            <div className="mt-1 text-slate-600">
                                {process.processingDate ? new Date(process.processingDate).toLocaleDateString() : '-'}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default ProcessingStep;