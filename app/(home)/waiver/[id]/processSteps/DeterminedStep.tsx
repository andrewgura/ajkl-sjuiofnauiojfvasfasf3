"use client"

import React, { useState } from "react";
import AuthorizationParagraph from "./components/AuthorizationParagraph";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { approveProcessStep, denyProcessStep } from "@/lib/actions/waiver/waiver-actions";
import { useRouter } from "next/navigation";

interface AuthorizationParagraphData {
    id: number;
    content: string;
}

interface DeterminedStepProps {
    waiverId: string;
    readOnly?: boolean;
    process?: any;
}

const DeterminedStep: React.FC<DeterminedStepProps> = ({
    waiverId,
    readOnly = false,
    process,
}) => {
    const [approvalCode, setApprovalCode] = useState(process?.determinedApprovalCode || "");
    const [comments, setComments] = useState(process?.determinedComments || "");
    const [rejectionReason, setRejectionReason] = useState(process?.determinedRejectionReason || "");
    const [confirmed, setConfirmed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const [paragraphs, setParagraphs] = useState<AuthorizationParagraphData[]>(() => {
        if (process?.determinedParagraphs) {
            try {
                return JSON.parse(process.determinedParagraphs);
            } catch {

            }
        }
        return [
            {
                id: 1,
                content: ""
            },
            {
                id: 2,
                content: ""
            },
            {
                id: 3,
                content: ""
            },
            {
                id: 4,
                content: ""
            },
            {
                id: 5,
                content: ""
            },
            {
                id: 6,
                content: ""
            }
        ];
    });

    const updateParagraph = (id: number, content: string) => {
        setParagraphs(prev => prev.map(p => p.id === id ? { ...p, content } : p));
    };

    const handleApprove = async () => {
        if (!confirmed) {
            setError("Please confirm your decision");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // TODO: Get current user ID from auth context
            const userId = "currentUser";

            const result = await approveProcessStep(
                waiverId,
                "DETERMINED",
                userId,
                comments,
                approvalCode,
                paragraphs
            );

            if (result.success) {
                router.refresh();
            } else {
                setError(result.error?.message || "Failed to approve determined step");
            }
        } catch (err) {
            setError("An unexpected error occurred");
            console.error("Error approving determined step:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReject = async () => {
        if (!confirmed) {
            setError("Please confirm your decision");
            return;
        }

        if (!rejectionReason.trim()) {
            setError("Rejection reason is required");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // TODO: Get current user ID from auth context
            const userId = "currentUser";

            const result = await denyProcessStep(
                waiverId,
                "DETERMINED",
                userId,
                rejectionReason,
                comments
            );

            if (result.success) {
                router.refresh();
            } else {
                setError(result.error?.message || "Failed to reject determined step");
            }
        } catch (err) {
            setError("An unexpected error occurred");
            console.error("Error rejecting determined step:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="p-4">

            {/* Approval Code Field */}
            <div className="mt-6 space-y-4">
                <div>
                    <Label htmlFor="approvalCode" className="text-sm font-medium text-slate-700">
                        Approval Code
                    </Label>
                    <Input
                        id="approvalCode"
                        value={approvalCode}
                        onChange={(e) => setApprovalCode(e.target.value)}
                        placeholder="Enter approval code..."
                        className="mt-1"
                        disabled={readOnly}
                    />
                </div>

                {/* Authorization Paragraphs */}
                <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700">
                        Authorization Paragraphs
                    </Label>
                    {paragraphs.map(paragraph => (
                        <AuthorizationParagraph
                            key={paragraph.id}
                            number={paragraph.id}
                            value={paragraph.content}
                            onChange={readOnly ? () => { } : (content) => updateParagraph(paragraph.id, content)}
                            readOnly={readOnly}
                        />
                    ))}
                </div>

                {/* Action Buttons and Notes */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                        <Label className="text-sm font-medium text-slate-700 mb-2 block">
                            Comments:
                        </Label>
                        <Textarea
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            placeholder="Add any comments..."
                            className="min-h-[60px] resize-y text-xs"
                            disabled={readOnly}
                        />
                    </div>
                </div>

                {/* Rejection Reason Field */}
                <div>
                    <Label htmlFor="rejectionReason" className="text-sm font-medium text-slate-700">
                        Rejection Reason (Required for Denial)
                    </Label>
                    <Textarea
                        id="rejectionReason"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Enter reason for denial if rejecting..."
                        className="mt-1 min-h-[60px] resize-y"
                        disabled={readOnly}
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                {/* Confirmation and Action Buttons - Hidden in read-only mode */}
                {!readOnly && (
                    <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-200">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="confirm"
                                checked={confirmed}
                                onCheckedChange={(checked) => {
                                    if (checked === true || checked === false) {
                                        setConfirmed(checked);
                                    }
                                }}
                                className="data-[state=checked]:bg-blue-500"
                            />
                            <label htmlFor="confirm" className="text-xs text-slate-600">
                                I confirm this decision
                            </label>
                        </div>

                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-red-200 text-red-600 hover:bg-red-50"
                                onClick={handleReject}
                                disabled={isLoading || !confirmed}
                            >
                                {isLoading ? "Rejecting..." : "Reject Request"}
                            </Button>
                            <Button
                                size="sm"
                                className="bg-blue-500 hover:bg-blue-600 text-white"
                                onClick={handleApprove}
                                disabled={isLoading || !confirmed}
                            >
                                {isLoading ? "Approving..." : "Approve Request"}
                            </Button>
                        </div>
                    </div>
                )}

                {/* Read-only status display */}
                {readOnly && process && (
                    <div className="pt-4 mt-2 border-t border-slate-200">
                        <div className="p-4 bg-slate-50 rounded-lg">
                            <h4 className="text-sm font-medium text-slate-800 mb-2">Decision Details</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <Label className="text-sm font-medium text-slate-700">Status:</Label>
                                    <div className="mt-1 text-slate-600">
                                        {process.determinedApproved === 'Y' ? 'Approved' : 'Rejected'}
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-slate-700">Date:</Label>
                                    <div className="mt-1 text-slate-600">
                                        {process.determinedDate ? new Date(process.determinedDate).toLocaleDateString() : '-'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
};

export default DeterminedStep;