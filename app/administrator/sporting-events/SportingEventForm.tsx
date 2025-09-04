"use client";

import React, { useState } from "react";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField } from "@/components/shared/FormField";
import { SportingEvent, SportingEventFormProps } from "./types";

const SportingEventForm: React.FC<SportingEventFormProps> = ({
    sportingEvent,
    onClose,
    onSave,
    isEditing
}) => {
    const [formData, setFormData] = useState<SportingEvent>(
        sportingEvent || {
            id: 0,
            purpose: "",
            sport: "",
            createdOn: "",
            createdBy: "",
            updatedOn: "",
            updatedBy: "",
            active: true,
        }
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        // Validate
        if (!formData.purpose || !formData.sport) {
            return;
        }
        onSave(formData);
        onClose();
    };

    return (
        <DialogContent className="max-w-md">
            <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-slate-900">
                    {isEditing ? "Edit Event Purpose" : "Add New Purpose"}
                </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <FormField
                    label="Purpose Title"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    placeholder="Enter purpose title"
                    required
                />
                <FormField
                    label="Purpose Sport"
                    name="sport"
                    value={formData.sport}
                    onChange={handleInputChange}
                    placeholder="Enter purpose sport"
                    required
                />
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="active"
                        checked={formData.active}
                        onCheckedChange={(checked) =>
                            setFormData(prev => ({ ...prev, active: !!checked }))
                        }
                    />
                    <label
                        htmlFor="active"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Active
                    </label>
                </div>
            </div>
            <DialogFooter className="gap-3">
                <Button
                    variant="outline"
                    onClick={onClose}
                    className="text-sm font-medium"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    disabled={!formData.purpose || !formData.sport}
                    className="bg-blue-600 hover:bg-blue-700 text-sm font-medium text-white disabled:opacity-50"
                >
                    {isEditing ? "Save Changes" : "Add Purpose"}
                </Button>
            </DialogFooter>
        </DialogContent>
    );
};

export default SportingEventForm;