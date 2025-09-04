import type { DatabaseError } from '@/lib/utils/db-utils';

export interface SupportFile {
    id: number;
    title: string;
    fileUrl: string | null;
    description: string;
    fileSize: string;
    fileType: string;
    visible: boolean;
    groups: string[]; // Parsed from JSON string
    createdBy: string;
    createdDate: Date;
    updatedBy?: string;
    updatedDate?: Date;
}

export interface SupportFileRow {
    ID: number;
    TITLE: string;
    FILE_URL: string | null;
    DESCRIPTION: string;
    FILE_SIZE: string;
    FILE_TYPE: string;
    VISIBLE: number;
    GROUPS: string; // JSON string from database
    CREATED_BY: string;
    CREATED_DATE: Date;
    UPDATED_BY?: string;
    UPDATED_DATE?: Date;
}

export interface SupportFilesData {
    files: SupportFile[];
    error?: DatabaseError;
}

export interface CreateSupportFileParams {
    title: string;
    description: string;
    fileSize: string;
    fileType: string;
    visible?: boolean;
    groups?: string[];
    createdBy: string;
    file?: File;
}

export interface UpdateSupportFileParams {
    id: number;
    title?: string;
    description?: string;
    fileSize?: string;
    fileType?: string;
    visible?: boolean;
    groups?: string[];
    updatedBy: string;
}

export interface DeleteSupportFileParams {
    id: number;
    updatedBy: string;
}

export interface ToggleVisibilityParams {
    id: number;
    visible: boolean;
    updatedBy: string;
}

export interface SearchSupportFilesParams {
    searchTerm?: string;
    visible?: boolean;
    fileType?: string;
    groups?: string[];
}

export interface GetSupportFileResult {
    file?: SupportFile;
    error?: DatabaseError;
}

export interface CreateSupportFileResult {
    success: boolean;
    file?: SupportFile;
    error?: DatabaseError;
}

export interface UpdateSupportFileResult {
    success: boolean;
    error?: DatabaseError;
}

export interface DeleteSupportFileResult {
    success: boolean;
    error?: DatabaseError;
}