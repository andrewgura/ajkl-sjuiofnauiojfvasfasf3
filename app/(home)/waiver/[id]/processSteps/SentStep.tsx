"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Send } from "lucide-react";
import { CheckedState } from "@radix-ui/react-checkbox";
import { denyProcessStep, sendWaiverEmail } from "@/lib/actions/waiver/waiver-actions";
import { useRouter } from "next/navigation";
import type { WaiverProcessData } from "@/lib/actions/waiver/waiver-types";

interface SentStepProps {
    waiverId: string;
    readOnly?: boolean;
    process?: WaiverProcessData | null;
}


// TODO: Do we even need to ask for specific email body, can just be a template instead

const SentStep: React.FC<SentStepProps> = ({
    waiverId,
    readOnly = false,
    process,
}) => {
    // Initialize state from process data if available
    const [isApproved, setIsApproved] = useState<boolean>(process?.sentApproved !== 'N');
    const [emailBody, setEmailBody] = useState<string>(process?.sentEmailBody || "");
    const [emailTo, setEmailTo] = useState<string>(process?.sentEmailTo || "");
    const [comments, setComments] = useState<string>(process?.sentComments || "");
    const [rejectionReason, setRejectionReason] = useState<string>("");
    const [confirmed, setConfirmed] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Handle email sending (approval)
    const handleSendEmail = async () => {
        if (readOnly) return;

        if (!confirmed) {
            setError("Please confirm your decision");
            return;
        }

        if (!emailBody.trim()) {
            setError("Email body is required");
            return;
        }

        if (!emailTo.trim()) {
            setError("Email recipients are required");
            return;
        }

        // Validate email format
        const emailList = emailTo.split(',').map(email => email.trim());
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const invalidEmails = emailList.filter(email => !emailRegex.test(email));

        if (invalidEmails.length > 0) {
            setError(`Invalid email addresses: ${invalidEmails.join(', ')}`);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // TODO: Get current user ID from auth context
            const userId = "currentUser";

            const result = await sendWaiverEmail(
                waiverId,
                userId,
                emailBody,
                emailTo,
                comments
            );

            if (result.success) {
                router.refresh();
            } else {
                setError(result.error?.message || "Failed to send email");
            }
        } catch (err) {
            setError("An unexpected error occurred");
            console.error("Error sending waiver email:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle rejection/denial
    const handleReject = async () => {
        if (readOnly) return;

        if (!confirmed) {
            setError("Please confirm your decision");
            return;
        }

        if (!rejectionReason.trim()) {
            setError("Denial reason is required");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // TODO: Get current user ID from auth context
            const userId = "currentUser";

            const result = await denyProcessStep(
                waiverId,
                "SENT",
                userId,
                rejectionReason,
                comments
            );

            if (result.success) {
                router.refresh();
            } else {
                setError(result.error?.message || "Failed to deny waiver");
            }
        } catch (err) {
            setError("An unexpected error occurred");
            console.error("Error denying sent step:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Read-only view for completed sent steps
    if (readOnly && process?.sentDate) {
        return (
            <Card className="p-4">
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-slate-700">Email Sent (Read Only)</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label className="text-xs text-slate-600">Status:</Label>
                            <p className={`text-sm font-medium ${process.sentApproved === 'Y' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {process.sentApproved === 'Y' ? 'Email Sent' : 'Waiver Denied'}
                            </p>
                        </div>

                        <div>
                            <Label className="text-xs text-slate-600">Date:</Label>
                            <p className="text-sm">{process.sentDate?.toLocaleDateString()}</p>
                        </div>

                        <div>
                            <Label className="text-xs text-slate-600">Processed By:</Label>
                            <p className="text-sm">{process.sentSignoff}</p>
                        </div>
                    </div>

                    {process.sentApproved === 'Y' && (
                        <>
                            {process.sentEmailTo && (
                                <div>
                                    <Label className="text-xs text-slate-600">Recipients:</Label>
                                    <p className="text-sm bg-slate-50 p-2 rounded">{process.sentEmailTo}</p>
                                </div>
                            )}

                            {process.sentEmailBody && (
                                <div>
                                    <Label className="text-xs text-slate-600">Email Body:</Label>
                                    <div className="text-sm bg-slate-50 p-3 rounded whitespace-pre-wrap max-h-40 overflow-y-auto">
                                        {process.sentEmailBody}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {process.sentComments && (
                        <div>
                            <Label className="text-xs text-slate-600">Comments:</Label>
                            <p className="text-sm bg-slate-50 p-2 rounded">{process.sentComments}</p>
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
                        <Send className="w-3.5 h-3.5 mr-1" />
                        <span className="text-xs">Send Approval</span>
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
                        <span className="text-xs">Send Denial</span>
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6 mt-4">

                {/* Email Form */}
                <div className="space-y-4">
                    {/* Recipients */}
                    <div>
                        <Label htmlFor="emailTo" className="text-sm text-slate-600 mb-1.5 block">
                            Email Recipients (Required):
                        </Label>
                        <Input
                            id="emailTo"
                            value={emailTo}
                            onChange={(e) => setEmailTo(e.target.value)}
                            placeholder="recipient1@example.com, recipient2@example.com"
                            className="text-sm"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                            Separate multiple email addresses with commas
                        </p>
                    </div>

                    {/* Email Body */}
                    <div>
                        <Label htmlFor="emailBody" className="text-sm text-slate-600 mb-1.5 block">
                            Email Body (Required):
                        </Label>
                        <Textarea
                            id="emailBody"
                            value={emailBody}
                            onChange={(e) => setEmailBody(e.target.value)}
                            className="min-h-[200px] resize-y text-sm"
                            placeholder="Enter email message..."
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-6">

                        {/* Additional Comments */}
                        <div>
                            <Label htmlFor="comments" className="text-sm text-slate-600 mb-1.5 block">
                                Additional Comments (Optional):
                            </Label>
                            <Textarea
                                id="comments"
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                placeholder="Add any internal notes or comments..."
                                className="min-h-[120px] resize-y text-sm"
                            />
                        </div>
                    </div>

                    {/* Denial Reason */}
                    {!isApproved && (
                        <div>
                            <Label htmlFor="rejectionReason" className="text-sm text-slate-600 mb-1.5 block">
                                Denial Reason (Required):
                            </Label>
                            <Textarea
                                id="rejectionReason"
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                placeholder="Enter the reason for denial..."
                                className="min-h-[100px] resize-y text-sm"
                            />
                        </div>
                    )}
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
                            I confirm this email is ready to send and all information is accurate
                        </label>
                    </div>

                    <div className="flex">
                        {!isApproved && <Button
                            variant="outline"
                            size="sm"
                            className="border-red-200 text-red-600 hover:bg-red-50"
                            onClick={handleReject}
                            disabled={isApproved || isLoading || !confirmed}
                        >
                            {isLoading ? "Processing..." : "Send Denial"}
                        </Button>}

                        {isApproved && <Button
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                            onClick={handleSendEmail}
                            disabled={!isApproved || isLoading || !confirmed}
                        >
                            {isLoading ? "Sending..." : "Send Approval Email"}
                        </Button>}

                    </div>
                </div>
            </div>
        </Card>
    );
};

export default SentStep;