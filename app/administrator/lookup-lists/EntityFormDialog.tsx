"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/shared/FormField";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// Define a type for the form data
interface FormDataType {
    // Country fields
    country?: string;
    code?: string;
    icaoCode?: string;
    // FBO fields
    name?: string;
    icao?: string;
    type?: string;
    // Sporting Event fields
    title?: string;
    sport?: string;
    // Sporting Venue fields
    venue?: string;
    city?: string;
    state?: string;
    team?: string;
    // US State fields
    abbreviation?: string;
    // Common fields
    isActive?: boolean;
    [key: string]: any; // Allow for other fields
}

interface EntityFormDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: any) => void;
    entityType: "country" | "fbo" | "sportingEvent" | "sportingVenue" | "usState";
    editData?: any;
}

export default function EntityFormDialog({
    open,
    onOpenChange,
    onSave,
    entityType,
    editData,
}: EntityFormDialogProps) {
    const [formData, setFormData] = useState<FormDataType>({});

    // This ensures form data is properly initialized when the dialog opens
    useEffect(() => {

        if (editData) {
            setFormData({ ...editData });
        } else {
            // Reset form data based on entity type
            switch (entityType) {
                case "country":
                    setFormData({ country: "", code: "", icaoCode: "", isActive: true });
                    break;
                case "fbo":
                    setFormData({ name: "", code: "", icao: "", type: "Primary", isActive: true });
                    break;
                case "sportingEvent":
                    setFormData({ title: "", sport: "", isActive: true });
                    break;
                case "sportingVenue":
                    setFormData({ venue: "", city: "", state: "", sport: "", team: "", isActive: true });
                    break;
                case "usState":
                    setFormData({ state: "", abbreviation: "", isActive: true });
                    break;
                default:
                    console.error("EntityFormDialog: Unknown entity type:", entityType);
                    setFormData({});
            }
        }
    }, [entityType, editData, open]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev: FormDataType) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: FormDataType) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onOpenChange(false);
    };

    const getTitleText = () => {
        const action = editData ? "Edit" : "Add New";
        switch (entityType) {
            case "country":
                return `${action} Country`;
            case "fbo":
                return `${action} FBO`;
            case "sportingEvent":
                return `${action} Sporting Event`;
            case "sportingVenue":
                return `${action} Sporting Venue`;
            case "usState":
                return `${action} US State`;
            default:
                return `${action} Item`;
        }
    };

    const renderFormFields = () => {
        switch (entityType) {
            case "country":
                return (
                    <>
                        <FormField
                            label="Country Name"
                            name="country"
                            required
                            value={formData.country || ""}
                            onChange={handleInputChange}
                        />
                        <FormField
                            label="Country Code (2 letter)"
                            name="code"
                            required
                            value={formData.code || ""}
                            onChange={handleInputChange}
                            placeholder="e.g., US, CA, UK"
                        />
                        <FormField
                            label="ICAO Code"
                            name="icaoCode"
                            value={formData.icaoCode || ""}
                            onChange={handleInputChange}
                            placeholder="e.g., USA, CAN, GBR"
                        />
                        <div className="flex items-center space-x-2 pt-2">
                            <Switch
                                id="isActive"
                                checked={formData.isActive}
                                onCheckedChange={(checked) =>
                                    setFormData((prev: FormDataType) => ({ ...prev, isActive: checked }))
                                }
                            />
                            <Label htmlFor="isActive">Active</Label>
                        </div>
                    </>
                );
            case "fbo":
                return (
                    <>
                        <FormField
                            label="FBO Name"
                            name="name"
                            required
                            value={formData.name || ""}
                            onChange={handleInputChange}
                        />
                        <FormField
                            label="Code"
                            name="code"
                            required
                            value={formData.code || ""}
                            onChange={handleInputChange}
                        />
                        <FormField
                            label="ICAO"
                            name="icao"
                            required
                            value={formData.icao || ""}
                            onChange={handleInputChange}
                            placeholder="e.g., KLAX, KJFK"
                        />
                        <div className="space-y-2">
                            <Label htmlFor="type">Type</Label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type || ""}
                                onChange={handleSelectChange}
                                className="flex h-10 w-full items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="Primary">Primary</option>
                                <option value="Secondary">Secondary</option>
                                <option value="Satellite">Satellite</option>
                            </select>
                        </div>
                        <div className="flex items-center space-x-2 pt-2">
                            <Switch
                                id="isActive"
                                checked={formData.isActive}
                                onCheckedChange={(checked) =>
                                    setFormData((prev: FormDataType) => ({ ...prev, isActive: checked }))
                                }
                            />
                            <Label htmlFor="isActive">Active</Label>
                        </div>
                    </>
                );
            case "sportingEvent":
                return (
                    <>
                        <FormField
                            label="Event Title"
                            name="title"
                            required
                            value={formData.title || ""}
                            onChange={handleInputChange}
                        />
                        <FormField
                            label="Sport"
                            name="sport"
                            required
                            value={formData.sport || ""}
                            onChange={handleInputChange}
                            placeholder="e.g., Football, Basketball, Tennis"
                        />
                        <div className="flex items-center space-x-2 pt-2">
                            <Switch
                                id="isActive"
                                checked={formData.isActive}
                                onCheckedChange={(checked) =>
                                    setFormData((prev: FormDataType) => ({ ...prev, isActive: checked }))
                                }
                            />
                            <Label htmlFor="isActive">Active</Label>
                        </div>
                    </>
                );
            case "sportingVenue":
                return (
                    <>
                        <FormField
                            label="Venue Name"
                            name="venue"
                            required
                            value={formData.venue || ""}
                            onChange={handleInputChange}
                        />
                        <FormField
                            label="City"
                            name="city"
                            required
                            value={formData.city || ""}
                            onChange={handleInputChange}
                        />
                        <FormField
                            label="State"
                            name="state"
                            required
                            value={formData.state || ""}
                            onChange={handleInputChange}
                            placeholder="e.g., NY, CA, TX"
                        />
                        <div className="space-y-2">
                            <Label htmlFor="sport">Sport</Label>
                            <select
                                id="sport"
                                name="sport"
                                value={formData.sport || ""}
                                onChange={handleSelectChange}
                                className="flex h-10 w-full items-center rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="NFL">NFL</option>
                                <option value="NBA">NBA</option>
                                <option value="MLB">MLB</option>
                                <option value="NHL">NHL</option>
                                <option value="MLS">MLS</option>
                                <option value="Golf">Golf</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <FormField
                            label="Team"
                            name="team"
                            value={formData.team || ""}
                            onChange={handleInputChange}
                            placeholder="e.g., Dallas Cowboys, New York Yankees"
                        />
                        <div className="flex items-center space-x-2 pt-2">
                            <Switch
                                id="isActive"
                                checked={formData.isActive}
                                onCheckedChange={(checked) =>
                                    setFormData((prev: FormDataType) => ({ ...prev, isActive: checked }))
                                }
                            />
                            <Label htmlFor="isActive">Active</Label>
                        </div>
                    </>
                );
            case "usState":
                return (
                    <>
                        <FormField
                            label="State Name"
                            name="state"
                            required
                            value={formData.state || ""}
                            onChange={handleInputChange}
                        />
                        <FormField
                            label="Abbreviation"
                            name="abbreviation"
                            required
                            value={formData.abbreviation || ""}
                            onChange={handleInputChange}
                            placeholder="e.g., CA, NY, TX"
                        />
                        <div className="flex items-center space-x-2 pt-2">
                            <Switch
                                id="isActive"
                                checked={formData.isActive}
                                onCheckedChange={(checked) =>
                                    setFormData((prev: FormDataType) => ({ ...prev, isActive: checked }))
                                }
                            />
                            <Label htmlFor="isActive">Active</Label>
                        </div>
                    </>
                );
            default:
                return (
                    <div className="text-center py-4 text-red-500">
                        Unknown entity type: {entityType}
                    </div>
                );
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{getTitleText()}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 py-4">
                        {renderFormFields()}
                    </div>
                    <DialogFooter className="gap-3 sm:gap-0">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">
                            {editData ? "Save Changes" : "Add"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}