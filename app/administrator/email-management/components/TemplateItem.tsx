'use client';

import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

interface TemplateItemProps {
    id: string;
    title: string;
    description: string;
    content: string;
    onUpdate?: (templateId: string, updates: {
        title?: string;
        description?: string;
        content?: string;
    }) => Promise<void>;
    isLoading?: boolean;
}

export const TemplateItem: React.FC<TemplateItemProps> = ({
    id,
    title,
    description,
    content,
    onUpdate,
    isLoading = false
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [templateContent, setTemplateContent] = useState(content);
    const [localContent, setLocalContent] = useState(content);
    const [isSaving, setIsSaving] = useState(false);

    // Update local content when props change
    if (content !== localContent && !isEditing) {
        setTemplateContent(content);
        setLocalContent(content);
    }

    const handleEdit = () => {
        setTemplateContent(content);
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (onUpdate && templateContent !== content) {
            setIsSaving(true);
            try {
                await onUpdate(id, { content: templateContent });
                setLocalContent(templateContent);
                setIsEditing(false);
            } catch (error) {
                console.error('Error updating template:', error);
                // Reset content on error
                setTemplateContent(content);
            } finally {
                setIsSaving(false);
            }
        } else {
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setTemplateContent(content);
        setIsEditing(false);
    };

    return (
        <>
            <div className="group py-4 hover:bg-slate-100 my-1 rounded-lg">
                <div className="flex items-start justify-between cursor-pointer" onClick={handleEdit}>
                    <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-3">
                            <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-900 transition-colors">
                                {title}
                            </h3>
                            {(isLoading || isSaving) && (
                                <Loader2 className="h-3 w-3 animate-spin text-blue-600" />
                            )}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed pr-4">
                            {description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Edit Dialog */}
            <Dialog open={isEditing} onOpenChange={(open) => !open && handleCancel()}>
                <DialogContent className="max-w-3xl max-h-[80vh]">
                    <DialogHeader className="space-y-2 pb-2">
                        <DialogTitle className="flex items-center gap-2 text-base">
                            <span>Edit Template:</span>
                            <span className="text-blue-600">{title}</span>
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-3">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-900">
                                Email Template Content
                            </label>
                            <Textarea
                                value={templateContent}
                                onChange={(e) => setTemplateContent(e.target.value)}
                                disabled={isSaving}
                                className="min-h-[240px] font-mono text-xs leading-relaxed border-slate-300 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50"
                            />
                        </div>
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200/50">
                            <div className="flex gap-3">
                                <AlertCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                <div className="text-xs">
                                    <p className="font-semibold mb-2 text-blue-900">Available variables:</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-medium border border-blue-200">
                                            <code>{"{userName}"}</code>
                                            <span className="ml-1.5 text-blue-600">User&apos;s full name</span>
                                        </span>
                                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-purple-100 text-purple-800 text-xs font-medium border border-purple-200">
                                            <code>{"{waiverType}"}</code>
                                            <span className="ml-1.5 text-purple-600">Type of waiver</span>
                                        </span>
                                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-green-100 text-green-800 text-xs font-medium border border-green-200">
                                            <code>{"{expiryDate}"}</code>
                                            <span className="ml-1.5 text-green-600">Waiver expiration date</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="gap-2 pt-2">
                        <Button
                            variant="outline"
                            onClick={handleCancel}
                            disabled={isSaving}
                            className="hover:bg-slate-50 border-slate-300 text-sm"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={isSaving || templateContent === content}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm text-sm disabled:opacity-50"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="h-3 w-3 animate-spin mr-2" />
                                    Saving...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TemplateItem;