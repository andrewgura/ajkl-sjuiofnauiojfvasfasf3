'use client';

import { useState } from "react";
import { Users, Mail, X, ChevronDown, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddEmailDialog from "./AddEmailDialog";
import ConfirmDialog from "@/components/shared/ConfirmDialog";

interface DistributionListProps {
    title: string;
    emails: string[];
    isExpanded: boolean;
    onToggle: () => void;
    onAddEmail: (email: string) => Promise<void>;
    onRemoveEmail: (email: string) => Promise<void>;
    isLoading?: boolean;
}

export const DistributionList: React.FC<DistributionListProps> = ({
    title,
    emails,
    isExpanded,
    onToggle,
    onAddEmail,
    onRemoveEmail,
    isLoading = false
}) => {
    const [emailToRemove, setEmailToRemove] = useState<string | null>(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [removingEmail, setRemovingEmail] = useState<string | null>(null);

    const handleRemoveClick = (email: string) => {
        setEmailToRemove(email);
        setShowConfirmDialog(true);
    };

    const handleConfirmRemove = async () => {
        if (emailToRemove) {
            setRemovingEmail(emailToRemove);
            try {
                await onRemoveEmail(emailToRemove);
            } finally {
                setRemovingEmail(null);
                setShowConfirmDialog(false);
                setEmailToRemove(null);
            }
        }
    };

    const handleCancelRemove = () => {
        setShowConfirmDialog(false);
        setEmailToRemove(null);
    };

    const handleAddEmail = async (email: string) => {
        await onAddEmail(email);
        setShowAddDialog(false);
    };

    return (
        <>
            <div className="border-t first:border-t-0 border-slate-200">
                <button
                    onClick={onToggle}
                    disabled={isLoading}
                    className="w-full py-3 flex items-center justify-between hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50/30 px-4 transition-all duration-200 group disabled:opacity-50"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-md bg-slate-100 group-hover:bg-blue-100 transition-colors duration-200">
                            <Users className="h-3 w-3 text-slate-500 group-hover:text-blue-600" />
                        </div>
                        <h3 className="text-xs font-semibold text-slate-900 group-hover:text-blue-900 transition-colors">
                            {title}
                        </h3>
                        {isLoading && (
                            <Loader2 className="h-3 w-3 animate-spin text-blue-600" />
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                            <span className={`text-xs font-medium`}>
                                {emails.length}
                            </span>
                            <span className="text-xs text-slate-500">
                                recipient{emails.length !== 1 ? "s" : ""}
                            </span>
                        </div>
                        <ChevronDown
                            className={`h-3 w-3 text-slate-400 group-hover:text-blue-600 transition-all duration-200 ${isExpanded ? "rotate-180" : ""
                                }`}
                        />
                    </div>
                </button>

                {isExpanded && (
                    <div className="pb-4 animate-in slide-in-from-top-4 duration-200 bg-gradient-to-b from-slate-50/50 to-transparent">
                        <div className="px-4 flex justify-between items-center mb-3">
                            <Button
                                variant="ghost"
                                size="sm"
                                disabled={isLoading}
                                className="h-7 text-blue-600 hover:text-blue-700 hover:bg-blue-50 gap-1.5 font-medium border border-blue-200 hover:border-blue-300 transition-all duration-200 text-xs disabled:opacity-50"
                                onClick={() => setShowAddDialog(true)}
                            >
                                <Plus className="h-3 w-3" />
                                <span>Add Address</span>
                            </Button>
                        </div>
                        <div className="space-y-1 px-2">
                            {emails.map((email, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between py-2 px-3 hover:bg-white hover:shadow-sm group rounded-md transition-all duration-200"
                                >
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-3 w-3 text-slate-400 group-hover:text-blue-500" />
                                        <span className="text-xs text-slate-700 group-hover:text-blue-900 font-medium">
                                            {email}
                                        </span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        disabled={isLoading || removingEmail === email}
                                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 transition-all duration-200 disabled:opacity-50"
                                        onClick={() => handleRemoveClick(email)}
                                    >
                                        {removingEmail === email ? (
                                            <Loader2 className="h-3 w-3 animate-spin" />
                                        ) : (
                                            <X className="h-3 w-3" />
                                        )}
                                    </Button>
                                </div>
                            ))}
                            {emails.length === 0 && (
                                <div className="text-center py-4 text-slate-500 text-xs">
                                    No email addresses in this list
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <ConfirmDialog
                isOpen={showConfirmDialog}
                title="Remove Email Address"
                message={
                    <span>
                        Are you sure you want to remove <strong>{emailToRemove}</strong> from this distribution list?
                        <br />
                        <br />
                        This action cannot be undone.
                    </span>
                }
                confirmLabel="Remove"
                cancelLabel="Cancel"
                onConfirm={handleConfirmRemove}
                onCancel={handleCancelRemove}
                isDestructive={true}
                isLoading={removingEmail === emailToRemove}
            />

            <AddEmailDialog
                isOpen={showAddDialog}
                title={title}
                onClose={() => setShowAddDialog(false)}
                onAddEmail={handleAddEmail}
                isLoading={isLoading}
            />
        </>
    );
};

export default DistributionList;