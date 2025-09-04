'use server'

import { DatabaseError } from '@/lib/utils/db-utils';
import {
    getAllSupportFiles,
    getSupportFileById,
    createSupportFile,
    updateSupportFile,
    deleteSupportFile,
    uploadSupportFile
} from './support-files-service';

import type {
    SupportFilesData,
    CreateSupportFileParams,
    UpdateSupportFileParams,
    DeleteSupportFileParams,
    SearchSupportFilesParams,
} from './support-files-types';

/**
 * Get all support files
 */
export async function fetchAllSupportFiles(params?: SearchSupportFilesParams): Promise<SupportFilesData> {
    //TODO: ensure user permissions
    return await getAllSupportFiles(params);
}

/**
 * Create a new support file
 */
export async function createSupportFileAction(params: CreateSupportFileParams): Promise<{
    success: boolean;
    fileId?: number;
    error?: DatabaseError;
}> {
    const result = await createSupportFile(params);

    if (result.error) {
        return {
            success: false,
            error: result.error
        };
    }

    return {
        success: true,
        fileId: result.file?.id
    };
}

/**
 * Update an existing support file
 */
export async function updateSupportFileAction(params: UpdateSupportFileParams): Promise<{
    success: boolean;
    error?: DatabaseError;
}> {
    return await updateSupportFile(params);
}

/**
 * Delete a support file
 */
export async function deleteSupportFileAction(params: DeleteSupportFileParams): Promise<{
    success: boolean;
    error?: DatabaseError;
}> {
    return await deleteSupportFile(params);
}

/**
 * Get a single support file by ID
 */
export async function fetchSupportFileById(id: number): Promise<{
    file?: any;
    error?: DatabaseError;
}> {
    return await getSupportFileById(id);
}

/**
 * Handle file upload with metadata creation
 */
export async function uploadAndCreateSupportFile(
    file: File,
    title: string,
    description: string,
    groups: string[],
    createdBy: string
): Promise<{
    success: boolean;
    fileId?: number;
    error?: DatabaseError;
}> {
    try {
        // TODO: Upload file to storage service, expecting a url string
        const uploadResult = await uploadSupportFile(file, file.name);

        if (uploadResult.error) {
            return {
                success: false,
                error: uploadResult.error
            };
        }

        // Determine file type from file extension
        const getFileType = (fileName: string): string => {
            const extension = fileName.split('.').pop()?.toLowerCase();
            if (extension && ['pdf'].includes(extension)) return 'PDF Document';
            if (extension && ['zip', 'rar'].includes(extension)) return 'Zip File';
            if (extension && ['mp4', 'avi', 'mov'].includes(extension)) return 'Video File';
            if (extension && ['doc', 'docx'].includes(extension)) return 'Word Document';
            if (extension && ['xls', 'xlsx'].includes(extension)) return 'Excel Document';
            if (extension && ['ppt', 'pptx'].includes(extension)) return 'PowerPoint Document';
            return 'Document';
        };

        // Format file size
        const formatFileSize = (bytes: number): string => {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
        };

        const createParams: CreateSupportFileParams = {
            title,
            description,
            fileSize: formatFileSize(file.size),
            fileType: getFileType(file.name),
            visible: true,
            groups,
            createdBy,
            file
        };

        return await createSupportFileAction(createParams);
    } catch (error) {
        return {
            success: false,
            error: {
                type: 'UNKNOWN_ERROR',
                message: 'Upload failed',
                details: String(error)
            }
        };
    }
}
