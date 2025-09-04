import React, { useState, useEffect } from 'react';
import { Loader2 } from "lucide-react";
import ActionButton from "@/components/shared/ActionButton";

interface NewFileState {
    file: File | null;
    name: string;
    description: string;
    groups: string[];
}

interface AddFileModalProps {
    isOpen: boolean;
    isLoading: boolean;
    groupOptions: string[];
    onClose: () => void;
    onSave: (fileData: NewFileState) => Promise<void>;
}

export function AddFileModal({
    isOpen,
    isLoading,
    groupOptions,
    onClose,
    onSave
}: AddFileModalProps) {
    const [newFile, setNewFile] = useState<NewFileState>({
        file: null,
        name: '',
        description: '',
        groups: []
    });

    // Reset form when modal opens/closes
    useEffect(() => {
        if (!isOpen) {
            setNewFile({
                file: null,
                name: '',
                description: '',
                groups: []
            });
        }
    }, [isOpen]);

    const toggleGroupSelection = (group: string) => {
        setNewFile(prev => ({
            ...prev,
            groups: prev.groups.includes(group)
                ? prev.groups.filter(g => g !== group)
                : [...prev.groups, group]
        }));
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setNewFile(prev => ({ ...prev, file }));
    };

    const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewFile(prev => ({ ...prev, name: e.target.value }));
    };

    const handleDescriptionInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewFile(prev => ({ ...prev, description: e.target.value }));
    };

    const handleSave = async () => {
        if (newFile.file && newFile.name && newFile.groups.length > 0) {
            await onSave(newFile);
        }
    };

    const isValid = newFile.file && newFile.name && newFile.groups.length > 0;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Add New File</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">File</label>
                        <input
                            type="file"
                            onChange={handleFileInputChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            accept=".pdf,.zip,.doc,.docx,.mp4,.avi,.mov"
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">File Name</label>
                        <input
                            type="text"
                            value={newFile.name}
                            onChange={handleNameInputChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            placeholder="Enter file name"
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                            value={newFile.description}
                            onChange={handleDescriptionInputChange}
                            className="w-full border border-gray-300 rounded-md p-2"
                            placeholder="Enter file description"
                            rows={3}
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Access Groups</label>
                        <div className="space-y-2">
                            {groupOptions.map(group => (
                                <label key={group} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={newFile.groups.includes(group)}
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
                        onClick={handleSave}
                        disabled={!isValid || isLoading}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Add File'}
                    </ActionButton>
                </div>
            </div>
        </div>
    );
}