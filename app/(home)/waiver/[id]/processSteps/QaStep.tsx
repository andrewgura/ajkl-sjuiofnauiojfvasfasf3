"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ActionButton from "@/components/shared/ActionButton";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Download, FileCheck, AlertTriangle } from "lucide-react";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Card } from "@/components/ui/card";
import { approveProcessStep, denyProcessStep } from "@/lib/actions/waiver/waiver-actions";
import { useRouter } from "next/navigation";
import type { WaiverProcessData } from "@/lib/actions/waiver/waiver-types";

interface QaStepProps {
    waiverId: string;
    readOnly?: boolean;
    process?: WaiverProcessData | null;
}

const QaStep: React.FC<QaStepProps> = ({
    waiverId,
    readOnly = false,
    process,
}) => {
    // Initialize state from process data if available
    const [isApproved, setIsApproved] = useState<boolean>(process?.qaApproved !== 'N');
    const [approvalCode, setApprovalCode] = useState<string>("");
    const [rejectionReason, setRejectionReason] = useState<string>("");
    const [comments, setComments] = useState<string>(process?.qaComments || "");
    const [confirmed, setConfirmed] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Handle download draft letter
    const handleDownloadDraft = () => {
        console.log("Downloading draft letter...");
        // TODO: Implement actual download functionality
    };

    // Handle approval
    const handleApprove = async () => {
        console.log("Approve button clicked", { readOnly, confirmed, approvalCode: approvalCode.trim() });

        if (readOnly) {
            console.log("Blocked: readOnly is true");
            return;
        }

        if (!confirmed) {
            console.log("Blocked: confirmation checkbox not checked");
            setError("Please confirm your decision");
            return;
        }

        if (!approvalCode.trim()) {
            console.log("Blocked: approval code is empty");
            setError("Approval code is required");
            return;
        }

        console.log("Proceeding with approval...");
        setIsLoading(true);
        setError(null);

        try {
            // TODO: Get current user ID from auth context
            const userId = "currentUser";

            const result = await approveProcessStep(
                waiverId,
                "QA",
                userId,
                comments,
                approvalCode
            );

            if (result.success) {
                router.refresh();
            } else {
                setError(result.error?.message || "Failed to approve QA step");
            }
        } catch (err) {
            setError("An unexpected error occurred");
            console.error("Error approving QA step:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle rejection/return to TSA
    const handleReject = async () => {
        console.log("Reject button clicked", { readOnly, confirmed, rejectionReason: rejectionReason.trim() });

        if (readOnly) {
            console.log("Blocked: readOnly is true");
            return;
        }

        if (!confirmed) {
            console.log("Blocked: confirmation checkbox not checked");
            setError("Please confirm your decision");
            return;
        }

        if (!rejectionReason.trim()) {
            console.log("Blocked: rejection reason is empty");
            setError("Return reason is required");
            return;
        }

        console.log("Proceeding with rejection...");
        setIsLoading(true);
        setError(null);

        try {
            // TODO: Get current user ID from auth context
            const userId = "currentUser";

            const result = await denyProcessStep(
                waiverId,
                "QA",
                userId,
                rejectionReason,
                comments
            );

            if (result.success) {
                router.refresh();
            } else {
                setError(result.error?.message || "Failed to return to TSA");
            }
        } catch (err) {
            setError("An unexpected error occurred");
            console.error("Error returning QA step to TSA:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Read-only view for completed QA steps
    if (readOnly && process?.qaDate) {
        return (
            <Card className="p-4">
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-slate-700">QA Decision (Read Only)</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label className="text-xs text-slate-600">Decision:</Label>
                            <p className={`text-sm font-medium ${process.qaApproved === 'Y' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {process.qaApproved === 'Y' ? 'Approved' : 'Returned to TSA'}
                            </p>
                        </div>

                        <div>
                            <Label className="text-xs text-slate-600">Date:</Label>
                            <p className="text-sm">{process.qaDate?.toLocaleDateString()}</p>
                        </div>

                        <div>
                            <Label className="text-xs text-slate-600">Processed By:</Label>
                            <p className="text-sm">{process.qaSignoff}</p>
                        </div>
                    </div>

                    {process.qaApproved === 'Y' && approvalCode && (
                        <div>
                            <Label className="text-xs text-slate-600">Approval Code:</Label>
                            <p className="text-sm font-mono bg-slate-50 p-2 rounded">{approvalCode}</p>
                        </div>
                    )}

                    {process.qaApproved === 'N' && rejectionReason && (
                        <div>
                            <Label className="text-xs text-slate-600">Return Reason:</Label>
                            <p className="text-sm bg-slate-50 p-2 rounded">{rejectionReason}</p>
                        </div>
                    )}

                    {process.qaComments && (
                        <div>
                            <Label className="text-xs text-slate-600">Comments:</Label>
                            <p className="text-sm bg-slate-50 p-2 rounded">{process.qaComments}</p>
                        </div>
                    )}
                </div>
            </Card>
        );
    }

    return (
        <Card className="space-y-6 p-6">
            {/* Decision Selector */}
            <div className="flex items-center gap-2 px-1 py-4">
                <span className="text-xs font-medium text-slate-700 min-w-[100px]">Decision Type:</span>
                <div className="flex flex-1 gap-2">
                    <Button
                        type="button"
                        onClick={() => setIsApproved(true)}
                        className={`flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded border ${isApproved
                            ? "bg-green-50 border-green-200 text-green-700"
                            : "bg-white border-slate-200 text-slate-500"
                            }`}
                        variant="ghost"
                    >
                        <FileCheck className="w-3.5 h-3.5 mr-1" />
                        <span className="text-xs">Approve Letter</span>
                    </Button>

                    <Button
                        type="button"
                        onClick={() => setIsApproved(false)}
                        className={`flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded border ${!isApproved
                            ? "bg-red-50 border-red-200 text-red-700"
                            : "bg-white border-slate-200 text-slate-500"
                            }`}
                        variant="ghost"
                    >
                        <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                        <span className="text-xs">Return to TSA</span>
                    </Button>
                </div>
            </div>

            {/* Form Content */}
            <div className="space-y-6">
                <div className="gap-8 pt-4">
                    <div>
                        {isApproved && (
                            <div className="space-y-2">
                                <Label htmlFor="approvalCode" className="text-xs text-slate-600">
                                    Approval Code (Required)
                                </Label>
                                <Input
                                    id="approvalCode"
                                    value={approvalCode}
                                    onChange={(e) => setApprovalCode(e.target.value)}
                                    placeholder="Enter approval code..."
                                    className="text-sm"
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        {!isApproved && (
                            <div className="space-y-2">
                                <Label htmlFor="rejectionReason" className="text-xs text-slate-600">
                                    Return Reason (Required)
                                </Label>
                                <Textarea
                                    id="rejectionReason"
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    placeholder="Enter reason for return to TSA..."
                                    className="text-sm"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Comments Section */}
                <div className="space-y-2">
                    <Label htmlFor="comments" className="text-xs text-slate-600">
                        Comments (Optional)
                    </Label>
                    <Textarea
                        id="comments"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="Add any additional comments..."
                        className="min-h-[80px] text-sm"
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                {/* Confirmation and Action Buttons */}
                <div className="flex items-center justify-between pt-4 mt-6 border-t border-slate-200">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="confirm"
                            checked={confirmed}
                            onCheckedChange={(checked: CheckedState) => {
                                if (checked === true || checked === false) {
                                    setConfirmed(checked);
                                }
                            }}
                            className="data-[state=checked]:bg-blue-500"
                        />
                        <label htmlFor="confirm" className="text-xs text-slate-600">
                            I confirm this decision is accurate and complete
                        </label>
                    </div>

                    <div className="flex gap-3">
                        {!isApproved && <Button
                            variant="outline"
                            size="sm"
                            className="border-red-200 text-red-600 hover:bg-red-50"
                            onClick={handleReject}
                            disabled={isApproved || isLoading || !confirmed}
                        >
                            {isLoading ? "Processing..." : "Return to TSA"}
                        </Button>
                        }

                        {isApproved && <Button
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                            onClick={handleApprove}
                            disabled={!isApproved || isLoading || !confirmed}
                        >
                            {isLoading ? "Processing..." : "Approve Letter"}
                        </Button>}

                    </div>
                </div>
            </div>
        </Card>
    );
};

export default QaStep;