import React from 'react';
import { FileText, Download, Calendar, FileArchive, Video, Edit, LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
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

interface SupportFileCardProps {
    resource: FileResource;
    isAdmin: boolean;
    isLoading: boolean;
    onEdit: (file: FileResource) => void;
}

const getFileIcon = (fileType: string): LucideIcon => {
    const type = fileType.toLowerCase();
    if (type.includes('pdf')) return FileText;
    if (type.includes('zip')) return FileArchive;
    if (type.includes('video')) return Video;
    if (type.includes('word') || type.includes('document')) return FileText;
    return FileText;
};

export function SupportFileCard({
    resource,
    isAdmin,
    isLoading,
    onEdit,
}: SupportFileCardProps) {
    const Icon = getFileIcon(resource.fileType);

    return (
        <Card
            className={`p-6 shadow-lg border-t-4 bg-white rounded-lg hover:shadow-xl hover:bg-slate-100 transition-all duration-300 flex flex-col max-w-sm mx-auto w-full relative ${!resource.visible ? 'opacity-50 border-gray-300' : 'border-blue-300'}`}
        >
            {isAdmin && (
                <div className="absolute top-2 right-2 flex gap-1">
                    <ActionButton
                        onClick={() => onEdit(resource)}
                        className="p-1 text-gray-500 hover:text-gray-700 bg-transparent hover:bg-gray-100"
                        disabled={isLoading}
                    >
                        <Edit className="w-4 h-4" />
                    </ActionButton>
                </div>
            )}

            <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-center mb-4">
                    <Icon className="w-12 h-12 text-blue-600" />
                </div>

                <h3 className="text-lg font-semibold text-center mb-2 text-gray-900">
                    {resource.title}
                </h3>

                <p className="text-sm text-gray-600 text-center mb-4 flex-1">
                    {resource.description}
                </p>

                <div className="space-y-2 mt-auto">

                    <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                        <Download className="w-3 h-3" />
                        <span>{resource.size}</span>
                        <span className="font">({resource.fileType})</span>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
                        <Calendar className="w-3 h-3" />
                        <span><strong>Upload date: </strong>{resource.uploadDate}</span>
                    </div>

                    {resource.visible && (
                        <a
                            target="_blank"
                            href={`/files/${resource.filename}`}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10 rounded-md font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center mt-3 gap-2"
                            rel="noopener noreferrer"
                        >
                            <Download className="w-4 h-4" />
                            Download
                        </a>
                    )}
                </div>
            </div>
        </Card>
    );
}