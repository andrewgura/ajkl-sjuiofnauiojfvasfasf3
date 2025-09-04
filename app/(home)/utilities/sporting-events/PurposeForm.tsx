"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Purpose } from "@/lib/actions/sporting-events/sporting-events-types";

interface PurposeFormProps {
    purpose: Purpose | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (formData: { purpose: string; sport: string; active: boolean }) => void;
    isEditing: boolean;
}

const PurposeForm = ({
    purpose,
    isOpen,
    onClose,
    onSave,
    isEditing
}: PurposeFormProps) => {
    const [formData, setFormData] = useState<{
        purpose: string;
        sport: string;
        active: boolean;
    }>({
        purpose: "",
        sport: "",
        active: true,
    });

    // If Edit, set default values
    useEffect(() => {
        if (purpose) {
            setFormData({
                purpose: purpose.purpose,
                sport: purpose.sport,
                active: purpose.active,
            });
        } else {
            setFormData({
                purpose: "",
                sport: "",
                active: true,
            });
        }
    }, [purpose]);

    const handleSave = () => {
        if (!formData.purpose.trim() || !formData.sport.trim()) {
            return; // Let parent component handle validation and toast
        }

        onSave(formData);
    };

    const handleClose = () => {
        onClose();
        // Reset form when closed
        setFormData({
            purpose: "",
            sport: "",
            active: true,
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-slate-900">
                        {isEditing ? "Edit Event Purpose" : "Add New Purpose"}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-6">
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-slate-900">
                            Purpose Title
                        </label>
                        <Input
                            value={formData.purpose}
                            onChange={(e) =>
                                setFormData({ ...formData, purpose: e.target.value })
                            }
                            placeholder="Enter purpose title"
                            className="h-10 text-sm"
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-slate-900">
                            Purpose Sport
                        </label>
                        <Input
                            value={formData.sport}
                            onChange={(e) =>
                                setFormData({ ...formData, sport: e.target.value })
                            }
                            placeholder="Enter purpose sport"
                            className="h-10 text-sm"
                        />
                    </div>
                </div>
                <DialogFooter className="gap-3">
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        className="text-sm font-medium"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="bg-blue-600 hover:bg-blue-700 text-sm font-medium text-white"
                    >
                        {isEditing ? "Save Changes" : "Add Purpose"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PurposeForm;