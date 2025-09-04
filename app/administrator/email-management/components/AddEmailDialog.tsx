'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Mail, AlertCircle } from "lucide-react";

interface AddEmailDialogProps {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    onAddEmail?: (email: string) => Promise<void>;
    isLoading?: boolean;
}

export const AddEmailDialog: React.FC<AddEmailDialogProps> = ({
    isOpen,
    title,
    onClose,
    onAddEmail,
    isLoading = false
}) => {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    //TODO standard validation
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    };

    const handleSubmit = async () => {
        const trimmedEmail = email.trim();

        // Validation
        if (!trimmedEmail) {
            setError("Email address is required");
            return;
        }

        if (!validateEmail(trimmedEmail)) {
            setError("Please enter a valid email address");
            return;
        }

        if (onAddEmail) {
            setIsSubmitting(true);
            try {
                await onAddEmail(trimmedEmail);
                // Close dialog and reset form on success
                setEmail("");
                setError("");
                onClose();
            } catch (error) {
                setError("Failed to add email address. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        } else {
            // Fallback for when no onAddEmail is provided
            setEmail("");
            setError("");
            onClose();
        }
    };

    const handleClose = () => {
        if (!isSubmitting && !isLoading) {
            setEmail("");
            setError("");
            onClose();
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isSubmitting && !isLoading) {
            handleSubmit();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-blue-100">
                            <Mail className="h-4 w-4 text-blue-600" />
                        </div>
                        <DialogTitle className="text-base font-semibold">Add Email Address</DialogTitle>
                    </div>
                </DialogHeader>

                <div className="py-4 space-y-4">
                    <div className="space-y-3">
                        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                            <p className="text-xs text-blue-800">
                                <strong>Adding to:</strong> {title}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email-input" className="text-xs font-semibold text-slate-900">
                                Email Address
                            </Label>
                            <Input
                                id="email-input"
                                placeholder="Enter email address (e.g., user@domain.com)"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError("");
                                }}
                                onKeyPress={handleKeyPress}
                                disabled={isSubmitting || isLoading}
                                className={`h-9 text-sm ${error
                                    ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                            />
                            {error && (
                                <div className="flex items-center gap-1.5 text-red-600">
                                    <AlertCircle className="h-3 w-3" />
                                    <span className="text-xs">{error}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        disabled={isSubmitting || isLoading}
                        className="text-sm"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting || isLoading || !email.trim()}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-3 w-3 animate-spin mr-2" />
                                Adding...
                            </>
                        ) : (
                            'Add Email'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddEmailDialog;