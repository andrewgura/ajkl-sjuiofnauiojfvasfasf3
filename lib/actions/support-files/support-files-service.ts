
import { categorizeError } from '@/lib/utils/db-utils';
import type {
    SupportFile,
    SupportFileRow,
    SupportFilesData,
    CreateSupportFileParams,
    UpdateSupportFileParams,
    DeleteSupportFileParams,
    SearchSupportFilesParams,
    GetSupportFileResult,
    CreateSupportFileResult,
    UpdateSupportFileResult,
    DeleteSupportFileResult,
} from './support-files-types';
import db from '@/lib/db';

/**
 * Convert database row to SupportFile object
 */
function mapRowToSupportFile(row: SupportFileRow): SupportFile {
    return {
        id: row.ID,
        title: row.TITLE,
        fileUrl: row.FILE_URL,
        description: row.DESCRIPTION,
        fileSize: row.FILE_SIZE,
        fileType: row.FILE_TYPE,
        visible: row.VISIBLE === 1,
        groups: row.GROUPS ? JSON.parse(row.GROUPS) : [],
        createdBy: row.CREATED_BY,
        createdDate: row.CREATED_DATE,
        updatedBy: row.UPDATED_BY,
        updatedDate: row.UPDATED_DATE
    };
}

/**
 * Get all support files with optional filtering
 */
export async function getAllSupportFiles(params?: SearchSupportFilesParams): Promise<SupportFilesData> {
    try {
        let query = db('SUPPORT_FILES')
            .select('ID', 'TITLE', 'FILE_URL', 'DESCRIPTION', 'FILE_SIZE', 'FILE_TYPE',
                'VISIBLE', 'GROUPS', 'CREATED_BY', 'CREATED_DATE', 'UPDATED_BY', 'UPDATED_DATE');

        if (params?.searchTerm) {
            query = query.where(function () {
                this.whereRaw('UPPER(TITLE) LIKE UPPER(?)', [`%${params.searchTerm}%`])
                    .orWhereRaw('UPPER(DESCRIPTION) LIKE UPPER(?)', [`%${params.searchTerm}%`]);
            });
        }

        if (params?.visible !== undefined) {
            query = query.where('VISIBLE', params.visible ? 1 : 0);
        }

        if (params?.fileType) {
            query = query.whereRaw('UPPER(FILE_TYPE) LIKE UPPER(?)', [`%${params.fileType}%`]);
        }

        query = query.orderBy('CREATED_DATE', 'desc');

        const rows = await query as SupportFileRow[];
        let files = rows.map(mapRowToSupportFile);

        // Filter by groups if specified (since groups is stored as JSON string)
        if (params?.groups && params.groups.length > 0) {
            files = files.filter(file =>
                params.groups!.some(group =>
                    file.groups.includes(group)
                )
            );
        }

        return { files };
    } catch (error) {
        const dbError = categorizeError(error);
        return {
            files: [],
            error: dbError
        };
    }
}

/**
 * Get a single support file by ID
 */
export async function getSupportFileById(id: number): Promise<GetSupportFileResult> {
    try {
        const rows = await db('SUPPORT_FILES')
            .select('ID', 'TITLE', 'FILE_URL', 'DESCRIPTION', 'FILE_SIZE', 'FILE_TYPE',
                'VISIBLE', 'GROUPS', 'CREATED_BY', 'CREATED_DATE', 'UPDATED_BY', 'UPDATED_DATE')
            .where('ID', id) as SupportFileRow[];

        if (rows.length === 0) {
            return {
                error: {
                    type: 'QUERY_ERROR',
                    message: 'Support file not found',
                    details: `No support file found with ID: ${id}`
                }
            };
        }

        const file = mapRowToSupportFile(rows[0]);
        return { file };
    } catch (error) {
        const dbError = categorizeError(error);
        return { error: dbError };
    }
}

/**
 * Create a new support file
 */
export async function createSupportFile(params: CreateSupportFileParams): Promise<CreateSupportFileResult> {
    try {
        // Handle file upload (placeholder for now)
        let fileUrl = '';
        if (params.file) {
            // TODO: file comes from params, uploaded in previous step
            // For now, just return empty string
            fileUrl = '';
        }

        const insertData = {
            TITLE: params.title,
            FILE_URL: fileUrl,
            DESCRIPTION: params.description,
            FILE_SIZE: params.fileSize,
            FILE_TYPE: params.fileType,
            VISIBLE: (params.visible ?? true) ? 1 : 0,
            GROUPS: JSON.stringify(params.groups || []),
            CREATED_BY: params.createdBy,
            CREATED_DATE: new Date()
        };

        const result = await db('SUPPORT_FILES').insert(insertData).returning('ID');
        const insertedId = Array.isArray(result) ? result[0] : result;

        // Fetch the created file
        const createdFile = await getSupportFileById(insertedId);

        return {
            success: true,
            file: createdFile.file
        };
    } catch (error) {
        const dbError = categorizeError(error);
        return {
            success: false,
            error: dbError
        };
    }
}

/**
 * Update an existing support file
 */
export async function updateSupportFile(params: UpdateSupportFileParams): Promise<UpdateSupportFileResult> {
    try {
        const updateData: any = {
            UPDATED_BY: params.updatedBy,
            UPDATED_DATE: new Date()
        };

        if (params.title !== undefined) {
            updateData.TITLE = params.title;
        }

        if (params.description !== undefined) {
            updateData.DESCRIPTION = params.description;
        }

        if (params.fileSize !== undefined) {
            updateData.FILE_SIZE = params.fileSize;
        }

        if (params.fileType !== undefined) {
            updateData.FILE_TYPE = params.fileType;
        }

        if (params.visible !== undefined) {
            updateData.VISIBLE = params.visible ? 1 : 0;
        }

        if (params.groups !== undefined) {
            updateData.GROUPS = JSON.stringify(params.groups);
        }

        // Check if there are fields to update (besides the audit fields)
        const hasUpdates = Object.keys(updateData).some(key =>
            !['UPDATED_BY', 'UPDATED_DATE'].includes(key)
        );

        if (!hasUpdates) {
            return {
                success: false,
                error: {
                    type: 'QUERY_ERROR',
                    message: 'No fields to update',
                    details: 'At least one field must be provided for update'
                }
            };
        }

        const rowsAffected = await db('SUPPORT_FILES')
            .where('ID', params.id)
            .update(updateData);

        if (rowsAffected === 0) {
            return {
                success: false,
                error: {
                    type: 'QUERY_ERROR',
                    message: 'Support file not found',
                    details: `No support file found with ID: ${params.id}`
                }
            };
        }

        return { success: true };
    } catch (error) {
        const dbError = categorizeError(error);
        return {
            success: false,
            error: dbError
        };
    }
}

/**
 * Delete a support file
 */
export async function deleteSupportFile(params: DeleteSupportFileParams): Promise<DeleteSupportFileResult> {
    try {
        const fileResult = await getSupportFileById(params.id);

        // Make sure getting file so no error from deleting our record then trying to delete from storage
        if (fileResult.error) {
            return {
                success: false,
                error: fileResult.error
            };
        }

        const rowsAffected = await db('SUPPORT_FILES')
            .where('ID', params.id)
            .del();

        if (rowsAffected === 0) {
            return {
                success: false,
                error: {
                    type: 'QUERY_ERROR',
                    message: 'Support file not found',
                    details: `No support file found with ID: ${params.id}`
                }
            };
        }

        // TODO: Delete file

        return { success: true };
    } catch (error) {
        const dbError = categorizeError(error);
        return {
            success: false,
            error: dbError
        };
    }
}

/**
 * Upload file (placeholder implementation)
 */
export async function uploadSupportFile(file: File, fileName: string): Promise<any> {
    try {
        // TODO: Upload file to storage/store file somehow
        // const fileBuffer = await file.arrayBuffer();

        return true

        return {
            success: false,
            error: {
                type: 'UNKNOWN_ERROR',
                message: 'File upload not implemented',
                details: 'File storage service is not yet configured'
            }
        };
    } catch (error) {
        const dbError = categorizeError(error);
        return {
            success: false,
            error: dbError
        };
    }
}