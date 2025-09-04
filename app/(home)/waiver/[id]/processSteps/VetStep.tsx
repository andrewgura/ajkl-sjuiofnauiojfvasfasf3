"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import InfoAlert from "@/components/shared/InfoAlert";
import { FileCheck, AlertTriangle, X } from "lucide-react";
import { approveProcessStep, denyProcessStep } from "@/lib/actions/waiver/waiver-actions";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";

interface Person {
    lastName: string;
    firstName: string;
    middleName?: string;
    sex: string;
    birthDate: string;
    birthCity: string;
    birthState?: string;
    birthCountry: string;
    socialSecurity?: string;
    passportNumber?: string;
    passportCountry: string;
}

interface VetStepProps {
    waiverId: string;
    readOnly?: boolean;
    process?: any;
    manifestData?: Person[];
}

const VetStep: React.FC<VetStepProps> = ({
    waiverId,
    readOnly = false,
    process,
    manifestData = [] //TODO: Get data
}) => {
    const [isApproved, setIsApproved] = useState<boolean>(process?.vettedApproved !== 'N');
    const [confirmed, setConfirmed] = useState<boolean>(false);
    const [approvalCode, setApprovalCode] = useState<string>(process?.vettedApprovalCode || "");
    const [rejectionReason, setRejectionReason] = useState<string>(process?.vettedRejectionReason || "");
    const [showFullManifest, setShowFullManifest] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Handle approval
    const handleApprove = async () => {
        if (readOnly) return;

        if (!confirmed) {
            setError("Please confirm your decision");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            //TODO: get user id from context
            const userId = "currentUser";

            const result = await approveProcessStep(
                waiverId,
                "VETTED",
                userId,
                "",
                approvalCode
            );

            if (result.success) {
                router.refresh();
            } else {
                setError(result.error?.message || "Failed to approve vetted step");
            }
        } catch (err) {
            setError("An unexpected error occurred");
            console.error("Error approving vetted step:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle rejection
    const handleReject = async () => {
        if (readOnly) return;

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
            const userId = "currentUser";

            const result = await denyProcessStep(
                waiverId,
                "VETTED",
                userId,
                rejectionReason
            );

            if (result.success) {
                router.refresh();
            } else {
                setError(result.error?.message || "Failed to reject vetted step");
            }
        } catch (err) {
            setError("An unexpected error occurred");
            console.error("Error rejecting vetted step:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle manifest view
    const handleViewManifest = () => {
        setShowFullManifest(true);
    };

    return (
        <Card className="p-4">
            {/* Decision Selector */}
            {!readOnly && (
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
                            <span className="text-xs">Reject</span>
                        </Button>
                    </div>
                </div>
            )}

            {/* Read-only decision display */}
            {readOnly && process && (
                <div className="flex items-center gap-2 px-1 py-4">
                    <span className="text-xs font-medium text-slate-700 min-w-[100px]">Decision Type:</span>
                    <div className="flex flex-1 gap-2">
                        <div className={`flex-1 flex items-center justify-center gap-1 px-3 py-1.5 rounded border ${process.vettedApproved === 'Y'
                            ? "bg-green-50 border-green-200 text-green-700"
                            : "bg-red-50 border-red-200 text-red-700"
                            }`}>
                            {process.vettedApproved === 'Y' ? (
                                <FileCheck className="w-3.5 h-3.5 mr-1" />
                            ) : (
                                <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                            )}
                            <span className="text-xs">
                                {process.vettedApproved === 'Y' ? 'Approved' : 'Rejected'}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Option-specific UI */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3">
                {isApproved ? (
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-slate-800">Approval Information</h3>
                        <div className="space-y-2">
                            <label className="text-xs text-slate-600 block">
                                Approval Code:
                            </label>
                            <Input
                                type="text"
                                value={approvalCode}
                                onChange={(e) => setApprovalCode(e.target.value)}
                                placeholder="Enter approval code"
                                className="h-9 text-sm"
                                disabled={readOnly}
                            />
                        </div>
                        <InfoAlert
                            title="Approval Information"
                            description="The approval code must be in the format specified by your organization's guidelines. This will be included in the final approval document."
                            variant="blue"
                        />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <h3 className="text-sm font-medium text-slate-800">Rejection Reason</h3>
                        <Textarea
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            placeholder="Enter detailed reason for rejection..."
                            className="min-h-[150px] resize-y text-sm"
                            disabled={readOnly}
                        />
                        <InfoAlert
                            title="Rejection Information"
                            description="Please provide a detailed reason for the rejection. This information will be shared with the applicant."
                            variant="amber"
                        />
                    </div>
                )}

                {/* Manifest Summary */}
                <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                    <h3 className="text-sm font-medium text-slate-800 mb-4">Manifest Data</h3>
                    <div className="text-xs text-slate-600">
                        <p className="mb-2">The following people are associated with this request:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            {manifestData.slice(0, 5).map((person, index) => (
                                <li key={index}>
                                    {person.lastName}, {person.firstName} ({person.passportCountry})
                                </li>
                            ))}
                            {manifestData.length > 0 && <li>+ {manifestData.length - 5} more individuals</li>}
                        </ul>
                        <div className="mt-3">
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-xs h-7"
                                onClick={handleViewManifest}
                            >
                                View Full Manifest
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md mt-4">
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            {!readOnly && (
                <div className="flex items-center justify-between pt-4 mt-6 border-t border-slate-200">
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
                            I confirm this decision is accurate and complete
                        </label>
                    </div>

                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-red-200 text-red-600 hover:bg-red-50"
                            onClick={handleReject}
                            disabled={isApproved || isLoading || !confirmed}
                        >
                            {isLoading ? "Rejecting..." : "Reject Request"}
                        </Button>
                        <Button
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                            onClick={handleApprove}
                            disabled={!isApproved || isLoading || !confirmed}
                        >
                            {isLoading ? "Approving..." : "Approve Request"}
                        </Button>
                    </div>
                </div>
            )}

            {/* Read-only status display */}
            {readOnly && process && (
                <div className="pt-4 mt-4 border-t border-slate-200">
                    <div className="p-4 bg-slate-50 rounded-lg">
                        <h4 className="text-sm font-medium text-slate-800 mb-3">Vetting Decision Details</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="font-medium text-slate-700">Status:</span>
                                <div className="mt-1 text-slate-600">
                                    {process.vettedApproved === 'Y' ? 'Approved' : 'Rejected'}
                                </div>
                            </div>
                            <div>
                                <span className="font-medium text-slate-700">Date:</span>
                                <div className="mt-1 text-slate-600">
                                    {process.vettedDate ? new Date(process.vettedDate).toLocaleDateString() : '-'}
                                </div>
                            </div>
                            {process.vettedApprovalCode && (
                                <div>
                                    <span className="font-medium text-slate-700">Approval Code:</span>
                                    <div className="mt-1 text-slate-600">{process.vettedApprovalCode}</div>
                                </div>
                            )}
                            {process.vettedRejectionReason && (
                                <div className="col-span-2">
                                    <span className="font-medium text-slate-700">Rejection Reason:</span>
                                    <div className="mt-1 text-slate-600">{process.vettedRejectionReason}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Full Manifest Dialog */}
            <Dialog open={showFullManifest} onOpenChange={setShowFullManifest}>
                <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <div className="flex items-center justify-between">
                            <DialogTitle>Manifest</DialogTitle>
                            <DialogClose className="h-6 w-6 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                                <X className="h-4 w-4" />
                                <span className="sr-only">Close</span>
                            </DialogClose>
                        </div>
                    </DialogHeader>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-xs">
                            <thead>
                                <tr className="bg-slate-100">
                                    <th className="border border-slate-300 px-2 py-1.5 text-left">Last Name</th>
                                    <th className="border border-slate-300 px-2 py-1.5 text-left">First Name</th>
                                    <th className="border border-slate-300 px-2 py-1.5 text-left">Middle</th>
                                    <th className="border border-slate-300 px-2 py-1.5 text-left">Sex</th>
                                    <th className="border border-slate-300 px-2 py-1.5 text-left">Birth Date</th>
                                    <th className="border border-slate-300 px-2 py-1.5 text-left">Birth City</th>
                                    <th className="border border-slate-300 px-2 py-1.5 text-left">Birth State</th>
                                    <th className="border border-slate-300 px-2 py-1.5 text-left">Birth Country</th>
                                    <th className="border border-slate-300 px-2 py-1.5 text-left">Social Security</th>
                                    <th className="border border-slate-300 px-2 py-1.5 text-left">Passport Number</th>
                                    <th className="border border-slate-300 px-2 py-1.5 text-left">Passport Country</th>
                                </tr>
                            </thead>
                            <tbody>
                                {manifestData.map((person, index) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                                        <td className="border border-slate-300 px-2 py-1.5">{person.lastName}</td>
                                        <td className="border border-slate-300 px-2 py-1.5">{person.firstName}</td>
                                        <td className="border border-slate-300 px-2 py-1.5">{person.middleName || ""}</td>
                                        <td className="border border-slate-300 px-2 py-1.5">{person.sex}</td>
                                        <td className="border border-slate-300 px-2 py-1.5">{person.birthDate}</td>
                                        <td className="border border-slate-300 px-2 py-1.5">{person.birthCity}</td>
                                        <td className="border border-slate-300 px-2 py-1.5">{person.birthState || ""}</td>
                                        <td className="border border-slate-300 px-2 py-1.5">{person.birthCountry}</td>
                                        <td className="border border-slate-300 px-2 py-1.5">{person.socialSecurity || ""}</td>
                                        <td className="border border-slate-300 px-2 py-1.5">{person.passportNumber || ""}</td>
                                        <td className="border border-slate-300 px-2 py-1.5">{person.passportCountry}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default VetStep;