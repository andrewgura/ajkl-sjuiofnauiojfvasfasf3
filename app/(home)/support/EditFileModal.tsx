import React, { useState, useEffect } from 'react';
import { Loader2, Trash2, Eye, EyeOff } from "lucide-react";
import ActionButton from "@/components/shared/ActionButton";

interface FileResource {
    id: number;
    title: string;
    filename: string;
    description: string;
    size: string;
    uploadDate: string;
    fileType: string;
    visible: boolean;
    groups: string[];
}

interface EditFileModalProps {
    isOpen: boolean;
    isLoading: boolean;
    editingFile: FileResource | null;
    groupOptions: string[];
    onClose: () => void;
    onSave: (file: FileResource) => Promise<void>;
    onDelete: (fileId: number) => Promise<void>;
}

export function EditFileModal({
    isOpen,
    isLoading,
    editingFile,
    groupOptions,
    onClose,
    onSave,
    onDelete
}: EditFileModalProps) {
    const [formData, setFormData] = useState<FileResource | null>(null);

    // Update form data when editingFile changes
    useEffect(() => {
        if (editingFile) {
            setFormData({ ...editingFile });
        }
    }, [editingFile]);

    const toggleGroupSelection = (group: string) => {
        if (!formData) return;

        setFormData(prev => prev ? ({
            ...prev,
            groups: prev.groups.includes(group)
                ? prev.groups.filter(g => g !== group)
                : [...prev.groups, group]
        }) : null);
    };

    const handleVisibilityToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!formData) return;
        setFormData(prev => prev ? ({ ...prev, visible: e.target.checked }) : null);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!formData) return;
        setFormData(prev => prev ? ({ ...prev, title: e.target.value }) : null);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!formData) return;
        setFormData(prev => prev ? ({ ...prev, description: e.target.value }) : null);
    };

    const handleSave = async () => {
        if (formData && formData.title) {
            await onSave(formData);
        }
    };

    const handleDelete = async () => {
        if (formData && confirm('Are you sure you want to delete this file?')) {
            await onDelete(formData.id);
        }
    };

    const isValid = formData?.title;

    if (!isOpen || !formData) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Edit File: {editingFile?.title}</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">File Name</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={handleTitleChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            placeholder="Enter file name"
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={handleDescriptionChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            placeholder="Enter file description"
                            rows={3}
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={formData.visible}
                                onChange={handleVisibilityToggle}
                                className="mr-2"
                                disabled={isLoading}
                            />
                            <span className="flex items-center gap-2">
                                {formData.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                {formData.visible ? 'Visible' : 'Hidden'}
                            </span>
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Access Groups</label>
                        <div className="space-y-2">
                            {groupOptions.map(group => (
                                <label key={group} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.groups.includes(group)}
                                        onChange={() => toggleGroupSelection(group)}
                                        className="mr-2"
                                        disabled={isLoading}
                                    />
                                    {group}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <ActionButton
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700"
                        disabled={isLoading}
                    >
                        Cancel
                    </ActionButton>
                    <ActionButton
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700 text-white"
                        disabled={isLoading}
                    >
                        <Trash2 className="w-4 h-4" />
                    </ActionButton>
                    <ActionButton
                        onClick={handleSave}
                        disabled={!isValid || isLoading}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}
                    </ActionButton>
                </div>
            </div>
        </div>
    );
}