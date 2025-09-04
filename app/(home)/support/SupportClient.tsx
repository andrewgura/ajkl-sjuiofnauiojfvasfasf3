"use client";

import React, { useState } from 'react';
import { Plus, Loader2 } from "lucide-react";
import ActionButton from "@/components/shared/ActionButton";
import {
    updateSupportFileAction,
    deleteSupportFileAction,
    uploadAndCreateSupportFile
} from '@/lib/actions/support-files/support-files-actions';
import { AddFileModal } from './AddFileModal';
import { EditFileModal } from './EditFileModal';
import { SupportFileGrid } from './SupportFileGrid';
import toast from 'react-hot-toast';

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

interface NewFileState {
    file: File | null;
    name: string;
    description: string;
    groups: string[];
}

interface SupportClientProps {
    initialResources: FileResource[];
}

export function SupportClient({ initialResources }: SupportClientProps) {
    // TODO: Get actual user role from auth system
    const isAdmin = true;
    // TODO: Get current user from auth system
    const currentUser = 'current_user';

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingFile, setEditingFile] = useState<FileResource | null>(null);
    const [resources, setResources] = useState<FileResource[]>(initialResources);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    //TODO: get all possible group permissions
    const groupOptions = ["AAP User", "FAA User", "Admin"];

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    const getFileType = (fileName: string): string => {
        const extension = fileName.split('.').pop()?.toLowerCase();
        switch (extension) {
            case 'pdf': return 'PDF Document';
            case 'zip': return 'Zip File';
            case 'mp4': case 'avi': case 'mov': return 'Video File';
            case 'doc': case 'docx': return 'Word Document';
            default: return 'Document';
        }
    };

    const handleAddFile = async (fileData: NewFileState) => {
        if (!fileData.file) return;

        setIsLoading(true);
        setError(null);

        try {
            const result = await uploadAndCreateSupportFile(
                fileData.file,
                fileData.name,
                fileData.description,
                fileData.groups,
                currentUser
            );

            if (result.success && result.fileId) {
                // Add new file to local state
                const file = fileData.file;
                const newResource: FileResource = {
                    id: result.fileId,
                    title: fileData.name,
                    filename: file.name,
                    description: fileData.description,
                    size: formatFileSize(file.size),
                    uploadDate: new Date().toLocaleDateString('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    }).replace(',', ''),
                    fileType: getFileType(file.name),
                    visible: true,
                    groups: [...fileData.groups]
                };

                setResources([newResource, ...resources]);
                setShowAddModal(false);
                toast.success('File created successfully.')
            } else {
                toast.error("Failed to upload file.")
                setError(result.error?.message || 'Failed to upload file');
            }
        } catch (error) {
            setError('Failed to upload file');
            toast.error("Failed to add file.")
            console.error('Upload error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditFile = (file: FileResource) => {
        setEditingFile({ ...file });
        setShowEditModal(true);
        setError(null);
    };

    const handleSaveEdit = async (updatedFile: FileResource) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await updateSupportFileAction({
                id: updatedFile.id,
                title: updatedFile.title,
                description: updatedFile.description,
                visible: updatedFile.visible,
                groups: updatedFile.groups,
                updatedBy: currentUser
            });

            if (result.success) {
                setResources(resources.map(r =>
                    r.id === updatedFile.id ? updatedFile : r
                ));
                setShowEditModal(false);
                setEditingFile(null);
                toast.success('File updated successfully.')
            } else {
                setError(result.error?.message || 'Failed to update file');
                toast.error("Failed to update file.")
            }
        } catch (error) {
            setError('Failed to update file');
            toast.error("Failed to update file.")
            console.error('Update error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteFile = async (fileId: number) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await deleteSupportFileAction({
                id: fileId,
                updatedBy: currentUser
            });

            if (result.success) {
                setResources(resources.filter(r => r.id !== fileId));
                setShowEditModal(false);
                setEditingFile(null);
                toast.success('File deleted successfully.')
            } else {
                setError(result.error?.message || 'Failed to delete file');
                toast.error("Failed to delete file.")
            }
        } catch (error) {
            setError('Failed to delete file');
            toast.error("Failed to delete file.")
            console.error('Delete error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
        setError(null);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEditingFile(null);
        setError(null);
    };

    return (
        <div>
            {/* Error Display */}
            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-800">{error}</p>
                    <button
                        onClick={() => setError(null)}
                        className="text-red-600 hover:text-red-800 text-sm mt-2"
                    >
                        Dismiss
                    </button>
                </div>
            )}

            {/* Header with Add Button */}
            <div className="mb-8">
                <div className="flex justify-between items-center">
                    {isAdmin && (
                        <ActionButton
                            onClick={() => setShowAddModal(true)}
                            className="ml-auto bg-blue-600 hover:bg-blue-400 hover:text-white text-white"
                            icon={Plus}
                            disabled={isLoading}
                        >
                            Add File
                        </ActionButton>
                    )}
                </div>
            </div>

            {/* Loading Overlay */}
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 flex items-center gap-3">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Processing...</span>
                    </div>
                </div>
            )}

            {/* File Grid */}
            <SupportFileGrid
                resources={resources}
                isAdmin={isAdmin}
                isLoading={isLoading}
                onEditFile={handleEditFile}
            />

            {/* Add File Modal */}
            <AddFileModal
                isOpen={showAddModal}
                isLoading={isLoading}
                groupOptions={groupOptions}
                onClose={handleCloseAddModal}
                onSave={handleAddFile}
            />

            {/* Edit File Modal */}
            <EditFileModal
                isOpen={showEditModal}
                isLoading={isLoading}
                editingFile={editingFile}
                groupOptions={groupOptions}
                onClose={handleCloseEditModal}
                onSave={handleSaveEdit}
                onDelete={handleDeleteFile}
            />
        </div>
    );
}