"use client"

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { AdminWaiverItem } from './types';

interface EditWaiverDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    waiverItem: AdminWaiverItem | null;
}

export default function EditWaiverDialog({
    open,
    onOpenChange,
    waiverItem,
}: EditWaiverDialogProps) {
    const [editItem, setEditItem] = useState<AdminWaiverItem | null>(waiverItem);
    const [saveError, setSaveError] = useState<string | null>(null);

    // Update local state when the incoming prop changes
    if (waiverItem !== null && (editItem === null || editItem.id !== waiverItem.id)) {
        setEditItem(waiverItem);
    }

    // Handle form input changes
    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!editItem) return;
        setEditItem({
            ...editItem,
            [e.target.name]: e.target.value
        });
    };

    // Handle save action
    const handleSave = () => {
        if (!editItem) return;
        if (!editItem.title || !editItem.content) {
            setSaveError("Title and content are required");
            return;
        }

        //TODO: Handle edit action
        onOpenChange(false);
        setSaveError(null);
    };

    // Handle dialog close
    const handleClose = () => {
        onOpenChange(false);
        setSaveError(null);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xl p-6">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">
                        Edit Waiver Type
                    </DialogTitle>
                    <DialogDescription className="text-slate-500">
                        Update the information for this waiver type.
                    </DialogDescription>
                </DialogHeader>

                {saveError && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>{saveError}</AlertDescription>
                    </Alert>
                )}

                {editItem && (
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="title" className="text-right text-sm font-medium">
                                Title
                            </label>
                            <Input
                                id="title"
                                name="title"
                                value={editItem.title}
                                onChange={handleEditChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                            <label htmlFor="content" className="text-right text-sm font-medium pt-2">
                                Content
                            </label>
                            <Textarea
                                id="content"
                                name="content"
                                value={editItem.content}
                                onChange={handleEditChange}
                                className="col-span-3 min-h-[100px]"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                            <label htmlFor="footerText" className="text-right text-sm font-medium pt-2">
                                Footer Text
                            </label>
                            <Textarea
                                id="footerText"
                                name="footerText"
                                value={editItem.footerText || ''}
                                onChange={handleEditChange}
                                placeholder="Optional footer text (displayed in gray)"
                                className="col-span-3 min-h-[80px]"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="visible" className="text-right text-sm font-medium">
                                Visible
                            </label>
                            <div className="col-span-3">
                                <Switch
                                    id="visible"
                                    checked={editItem.visible}
                                    onCheckedChange={(checked) =>
                                        setEditItem({ ...editItem, visible: checked })
                                    }
                                />
                            </div>
                        </div>
                    </div>
                )}

                <DialogFooter className="mt-4">
                    <Button
                        variant="outline"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}