import db from '@/lib/db';
import type {
    Purpose,
    DatabaseError,
    CreatePurposeParams,
    UpdatePurposeParams,
    DeletePurposeParams,
    SearchPurposesParams
} from './sporting-events-types';

// Error categorization helper
function categorizeError(error: any): DatabaseError {
    const errorMessage = error?.message || String(error);

    // Check for connection errors
    if (errorMessage.includes('connection') ||
        errorMessage.includes('ECONNREFUSED') ||
        errorMessage.includes('ENOTFOUND') ||
        errorMessage.includes('timeout') ||
        errorMessage.includes('Network') ||
        error?.code === 'ECONNREFUSED' ||
        error?.code === 'ENOTFOUND' ||
        error?.code === 'ETIMEDOUT') {
        return {
            type: 'CONNECTION_ERROR',
            message: 'Unable to connect to the database',
            details: errorMessage
        };
    }

    // Check for query-related errors
    if (errorMessage.includes('ORA-') ||
        errorMessage.includes('syntax') ||
        errorMessage.includes('table') ||
        errorMessage.includes('column')) {
        return {
            type: 'QUERY_ERROR',
            message: 'Database query failed',
            details: errorMessage
        };
    }

    // Default to unknown error
    return {
        type: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred',
        details: errorMessage
    };
}

// Format date helper
function formatDate(date: Date | null): string {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

/**
 * Get all sporting event purposes from the database
 */
export async function getAllPurposes(params?: SearchPurposesParams): Promise<{
    purposes: Purpose[];
    error?: DatabaseError;
}> {
    try {
        let query = db
            .select('*')
            .from('SPORTINGEVENTPURPOSES')
            .orderBy(['SPORT', 'PURPOSE']);

        // Apply active filter (default to active only)
        if (params?.activeOnly !== false) {
            query = query.where('ACTIVE', 'Y');
        }

        // Apply search filter if provided
        if (params?.searchTerm) {
            query = query.where(function () {
                this.where('PURPOSE', 'like', `%${params.searchTerm}%`)
                    .orWhere('SPORT', 'like', `%${params.searchTerm}%`);
            });
        }

        // Apply sport filter if provided
        if (params?.sport) {
            query = query.where('SPORT', 'like', `%${params.sport}%`);
        }

        // Apply pagination if provided
        if (params?.limit) {
            query = query.limit(params.limit);
            if (params?.offset) {
                query = query.offset(params.offset);
            }
        }

        const purposes = await query;

        // Transform data to match client interface
        const formattedPurposes: Purpose[] = purposes.map(purpose => ({
            id: purpose.ID,
            purpose: purpose.PURPOSE,
            sport: purpose.SPORT,
            createdOn: formatDate(purpose.CREATEDON),
            createdBy: purpose.CREATEDBY || '',
            updatedOn: formatDate(purpose.UPDATEDON),
            updatedBy: purpose.UPDATEDBY || '',
            active: purpose.ACTIVE === 'Y'
        }));

        return { purposes: formattedPurposes };
    } catch (error) {
        console.error('Error fetching purposes:', error);
        const dbError = categorizeError(error);
        return {
            purposes: [],
            error: dbError
        };
    }
}

// Generate next available ID helper
async function getNextId(): Promise<number> {
    try {
        const result = await db('SPORTINGEVENTPURPOSES')
            .max('ID as maxId')
            .first();

        return (result?.maxId || 0) + 1;
    } catch (error) {
        // Fallback to timestamp-based ID if query fails
        return Date.now() % 1000000;
    }
}

/**
 * Create a new sporting event purpose
 */
export async function createPurpose(params: CreatePurposeParams): Promise<{
    purpose?: Purpose;
    error?: DatabaseError;
}> {
    try {
        // Check if purpose already exists for this sport
        const existingPurpose = await db('SPORTINGEVENTPURPOSES')
            .select('ID')
            .where('PURPOSE', params.purpose)
            .where('SPORT', params.sport)
            .where('ACTIVE', 'Y')
            .first();

        if (existingPurpose) {
            return {
                error: {
                    type: 'QUERY_ERROR',
                    message: 'A purpose with this name already exists for this sport'
                }
            };
        }

        // Get next available ID
        const nextId = await getNextId();
        const now = new Date();

        // Insert the new purpose
        await db('SPORTINGEVENTPURPOSES').insert({
            ID: nextId,
            PURPOSE: params.purpose,
            SPORT: params.sport,
            CREATEDON: now,
            CREATEDBY: params.createdBy,
            ACTIVE: 'Y'
        });

        // Return the created purpose
        const newPurpose: Purpose = {
            id: nextId,
            purpose: params.purpose,
            sport: params.sport,
            createdOn: formatDate(now),
            createdBy: params.createdBy,
            updatedOn: '',
            updatedBy: '',
            active: true
        };

        return { purpose: newPurpose };
    } catch (error) {
        console.error('Error creating purpose:', error);
        const dbError = categorizeError(error);
        return { error: dbError };
    }
}

/**
 * Update an existing sporting event purpose
 */
export async function updatePurpose(params: UpdatePurposeParams): Promise<{
    success: boolean;
    error?: DatabaseError;
}> {
    try {
        const updateData: any = {
            UPDATEDBY: params.updatedBy,
            UPDATEDON: new Date()
        };

        if (params.purpose !== undefined) {
            updateData.PURPOSE = params.purpose;
        }
        if (params.sport !== undefined) {
            updateData.SPORT = params.sport;
        }
        if (params.active !== undefined) {
            updateData.ACTIVE = params.active ? 'Y' : 'N';
        }

        // Check if we're updating name/sport and if it would create a duplicate
        if (params.purpose !== undefined || params.sport !== undefined) {
            // Get current record first
            const currentRecord = await db('SPORTINGEVENTPURPOSES')
                .select('PURPOSE', 'SPORT')
                .where('ID', params.id)
                .first();

            if (!currentRecord) {
                return {
                    success: false,
                    error: {
                        type: 'QUERY_ERROR',
                        message: 'Purpose not found'
                    }
                };
            }

            const newPurpose = params.purpose || currentRecord.PURPOSE;
            const newSport = params.sport || currentRecord.SPORT;

            const existingPurpose = await db('SPORTINGEVENTPURPOSES')
                .select('ID')
                .where('PURPOSE', newPurpose)
                .where('SPORT', newSport)
                .where('ACTIVE', 'Y')
                .whereNot('ID', params.id)
                .first();

            if (existingPurpose) {
                return {
                    success: false,
                    error: {
                        type: 'QUERY_ERROR',
                        message: 'A purpose with this name already exists for this sport'
                    }
                };
            }
        }

        const rowsAffected = await db('SPORTINGEVENTPURPOSES')
            .where('ID', params.id)
            .update(updateData);

        if (rowsAffected === 0) {
            return {
                success: false,
                error: {
                    type: 'QUERY_ERROR',
                    message: 'Purpose not found'
                }
            };
        }

        return { success: true };
    } catch (error) {
        console.error('Error updating purpose:', error);
        const dbError = categorizeError(error);
        return {
            success: false,
            error: dbError
        };
    }
}

/**
 * Delete a sporting event purpose (soft delete by setting Active to 'N')
 */
export async function deletePurpose(params: DeletePurposeParams): Promise<{
    success: boolean;
    error?: DatabaseError;
}> {
    try {
        const rowsAffected = await db('SPORTINGEVENTPURPOSES')
            .where('ID', params.id)
            .where('ACTIVE', 'Y')
            .update({
                ACTIVE: 'N',
                UPDATEDBY: params.updatedBy,
                UPDATEDON: new Date()
            });

        if (rowsAffected === 0) {
            return {
                success: false,
                error: {
                    type: 'QUERY_ERROR',
                    message: 'Purpose not found or already inactive'
                }
            };
        }

        return { success: true };
    } catch (error) {
        console.error('Error deleting purpose:', error);
        const dbError = categorizeError(error);
        return {
            success: false,
            error: dbError
        };
    }
}

/**
 * Get a single purpose by ID
 */
export async function getPurposeById(id: number): Promise<{
    purpose?: Purpose;
    error?: DatabaseError;
}> {
    try {
        const purpose = await db('SPORTINGEVENTPURPOSES')
            .select('*')
            .where('ID', id)
            .where('ACTIVE', 'Y')
            .first();

        if (!purpose) {
            return {
                error: {
                    type: 'QUERY_ERROR',
                    message: 'Purpose not found'
                }
            };
        }

        const formattedPurpose: Purpose = {
            id: purpose.ID,
            purpose: purpose.PURPOSE,
            sport: purpose.SPORT,
            createdOn: formatDate(purpose.CREATEDON),
            createdBy: purpose.CREATEDBY || '',
            updatedOn: formatDate(purpose.UPDATEDON),
            updatedBy: purpose.UPDATEDBY || '',
            active: purpose.ACTIVE === 'Y'
        };

        return { purpose: formattedPurpose };
    } catch (error) {
        const dbError = categorizeError(error);
        return { error: dbError };
    }
}

/**
 * Get unique sports list for filtering
 */
export async function getSportsList(): Promise<{
    sports: string[];
    error?: DatabaseError;
}> {
    try {
        const sports = await db('SPORTINGEVENTPURPOSES')
            .distinct('SPORT')
            .where('ACTIVE', 'Y')
            .orderBy('SPORT');

        return {
            sports: sports.map(s => s.SPORT).filter(sport => sport)
        };
    } catch (error) {
        const dbError = categorizeError(error);
        return {
            sports: [],
            error: dbError
        };
    }
}