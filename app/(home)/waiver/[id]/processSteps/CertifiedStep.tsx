"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { FileCheck, AlertTriangle } from "lucide-react";
import { CheckedState } from "@radix-ui/react-checkbox";
import { approveProcessStep, denyProcessStep } from "@/lib/actions/waiver/waiver-actions";
import { useRouter } from "next/navigation";
import type { WaiverProcessData } from "@/lib/actions/waiver/waiver-types";

interface CertifiedStepProps {
    waiverId: string;
    readOnly?: boolean;
    process?: WaiverProcessData | null;
}

const CertifiedStep: React.FC<CertifiedStepProps> = ({
    waiverId,
    readOnly = false,
    process,
}) => {
    const [isApproved, setIsApproved] = useState<boolean>(process?.certifiedApproved !== 'N');
    const [approvalCode, setApprovalCode] = useState<string>(process?.certifiedApprovalCode || "");
    const [rejectionReason, setRejectionReason] = useState<string>(process?.certifiedRejectionReason || "");
    const [comments, setComments] = useState<string>(process?.certifiedComments || "");
    const [confirmed, setConfirmed] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();


    // Approve 
    const handleApprove = async () => {

        if (readOnly) {
            return;
        }

        if (!confirmed) {
            setError("Please confirm your decision");
            return;
        }

        if (!approvalCode.trim()) {
            setError("Approval code is required for certification");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // TODO: Get current user ID from auth context
            const userId = "currentUser";

            const result = await approveProcessStep(
                waiverId,
                "CERTIFIED",
                userId,
                comments,
                approvalCode
            );

            if (result.success) {
                router.refresh();
            } else {
                setError(result.error?.message || "Failed to certify letter");
            }
        } catch (err) {
            setError("An unexpected error occurred");
            console.error("Error certifying letter:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle return to TSA
    const handleReject = async () => {
        if (readOnly) {
            return;
        }

        if (!confirmed) {
            setError("Please confirm your decision");
            return;
        }

        if (!rejectionReason.trim()) {
            setError("Return reason is required");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // TODO: Get current user ID from auth context
            const userId = "currentUser";

            const result = await denyProcessStep(
                waiverId,
                "CERTIFIED",
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
            console.error("Error returning certified step to TSA:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Read-only view for completed certified steps
    if (readOnly && process?.certifiedDate) {
        return (
            <Card className="p-4">
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-slate-700">Certification Decision (Read Only)</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label className="text-xs text-slate-600">Decision:</Label>
                            <p className={`text-sm font-medium ${process.certifiedApproved === 'Y' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {process.certifiedApproved === 'Y' ? 'Certified' : 'Returned to TSA'}
                            </p>
                        </div>

                        <div>
                            <Label className="text-xs text-slate-600">Date:</Label>
                            <p className="text-sm">{process.certifiedDate?.toLocaleDateString()}</p>
                        </div>

                        <div>
                            <Label className="text-xs text-slate-600">Processed By:</Label>
                            <p className="text-sm">{process.certifiedSignoff}</p>
                        </div>
                    </div>

                    {process.certifiedApproved === 'Y' && process.certifiedApprovalCode && (
                        <div>
                            <Label className="text-xs text-slate-600">Approval Code:</Label>
                            <p className="text-sm font-mono bg-slate-50 p-2 rounded">{process.certifiedApprovalCode}</p>
                        </div>
                    )}

                    {process.certifiedApproved === 'N' && process.certifiedRejectionReason && (
                        <div>
                            <Label className="text-xs text-slate-600">Return Reason:</Label>
                            <p className="text-sm bg-slate-50 p-2 rounded">{process.certifiedRejectionReason}</p>
                        </div>
                    )}

                    {process.certifiedComments && (
                        <div>
                            <Label className="text-xs text-slate-600">Comments:</Label>
                            <p className="text-sm bg-slate-50 p-2 rounded">{process.certifiedComments}</p>
                        </div>
                    )}
                </div>
            </Card>
        );
    }

    return (
        <Card className="p-4">
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
                        <span className="text-xs">Approve</span>
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

            {/* Content based on decision type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {isApproved ? (
                    <div className="space-y-4">

                        <div className="space-y-2">
                            <Label htmlFor="approvalCode" className="text-xs text-slate-600">
                                Certification Code (Required)
                            </Label>
                            <Input
                                id="approvalCode"
                                value={approvalCode}
                                onChange={(e) => setApprovalCode(e.target.value)}
                                placeholder="Enter certification code..."
                                className="text-sm"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium mb-3">Return Reason:</h3>
                        <Textarea
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            placeholder="Enter reason for return to TSA..."
                            className="min-h-[150px] resize-y text-sm"
                        />
                    </div>
                )}

                {/* Comments Section */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium mb-3">Additional Comments:</h3>
                    <Textarea
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="Add any additional comments or notes..."
                        className="min-h-[150px] resize-y text-sm"
                    />
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md mt-4">
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
                        I confirm this certification decision is accurate and complete
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
                    </Button>}

                    {isApproved && <Button
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                        onClick={handleApprove}
                        disabled={!isApproved || isLoading || !confirmed}
                    >
                        {isLoading ? "Processing..." : "Approve"}
                    </Button>}
                </div>
            </div>
        </Card>
    );
};

export default CertifiedStep;