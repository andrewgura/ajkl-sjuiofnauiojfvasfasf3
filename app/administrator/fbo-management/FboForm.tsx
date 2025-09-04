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
import { FBO, FBOFormProps } from "./types";

const FBOForm: React.FC<FBOFormProps> = ({ fbo, onClose, onSave, isEditing }) => {
    const [formData, setFormData] = useState<FBO>(
        fbo || {
            id: "",
            icao: "",
            name: "",
            type: "",
            loadDate: "",
            loadBy: "",
            inactive: false,
        }
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        // Validation 
        if (!formData.id || !formData.icao || !formData.name || !formData.type) {
            return;
        }
        onSave(formData);
        onClose();
    };

    return (
        <DialogContent className="max-w-md">
            <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-slate-900">
                    {isEditing ? "Edit FBO" : "Add New FBO"}
                </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <FormField
                    label="ID"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    placeholder="Enter FBO ID"
                    required
                />
                <FormField
                    label="ICAO"
                    name="icao"
                    value={formData.icao}
                    onChange={handleInputChange}
                    placeholder="Enter ICAO"
                    required
                />
                <FormField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter FBO name"
                    required
                />
                <FormField
                    label="Type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    placeholder="Enter FBO type"
                    required
                />
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="inactive"
                        checked={formData.inactive}
                        onCheckedChange={(checked) =>
                            setFormData(prev => ({ ...prev, inactive: !!checked }))
                        }
                    />
                    <label
                        htmlFor="inactive"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Inactive
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
                    disabled={!formData.id || !formData.icao || !formData.name || !formData.type}
                    className="bg-blue-600 hover:bg-blue-700 text-sm font-medium text-white disabled:opacity-50"
                >
                    {isEditing ? "Save Changes" : "Add FBO"}
                </Button>
            </DialogFooter>
        </DialogContent>
    );
};

export default FBOForm;