import React from 'react';
import { SupportFileCard } from './SupportFileCard';

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

interface SupportFileGridProps {
    resources: FileResource[];
    isAdmin: boolean;
    isLoading: boolean;
    onEditFile: (file: FileResource) => void;
}

export function SupportFileGrid({
    resources,
    isAdmin,
    isLoading,
    onEditFile,
}: SupportFileGridProps) {
    if (resources.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No support files available</p>
                <p className="text-gray-400 text-sm mt-2">
                    {isAdmin ? 'Click "Add File" to upload your first support file.' : 'Check back later for available resources.'}
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl">
            {resources.map((resource) => (
                <SupportFileCard
                    key={resource.id}
                    resource={resource}
                    isAdmin={isAdmin}
                    isLoading={isLoading}
                    onEdit={onEditFile}
                />
            ))}
        </div>
    );
}