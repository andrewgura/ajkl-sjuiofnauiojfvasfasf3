'use server'

import {
    getAllPurposes,
    createPurpose,
    updatePurpose,
    deletePurpose,
    getPurposeById,
    getSportsList
} from './sporting-events-service';

import type {
    SportingEventsData,
    CreatePurposeParams,
    UpdatePurposeParams,
    DeletePurposeParams,
    SearchPurposesParams,
    DatabaseError
} from './sporting-events-types';

/**
 * Fetch all sporting event purposes
 */
export async function fetchAllPurposes(params?: SearchPurposesParams): Promise<SportingEventsData> {
    return await getAllPurposes(params);
}

/**
 * Create a new sporting event purpose
 */
export async function createSportingEventPurpose(params: CreatePurposeParams): Promise<{
    success: boolean;
    purposeId?: number;
    error?: DatabaseError;
}> {
    const result = await createPurpose(params);

    if (result.error) {
        return {
            success: false,
            error: result.error
        };
    }

    return {
        success: true,
        purposeId: result.purpose?.id
    };
}

/**
 * Update an existing sporting event purpose
 */
export async function updateSportingEventPurpose(params: UpdatePurposeParams): Promise<{
    success: boolean;
    error?: DatabaseError;
}> {
    return await updatePurpose(params);
}

/**
 * Delete a sporting event purpose
 */
export async function deleteSportingEventPurpose(params: DeletePurposeParams): Promise<{
    success: boolean;
    error?: DatabaseError;
}> {
    return await deletePurpose(params);
}

/**
 * Get a single purpose by ID
 */
export async function fetchPurposeById(id: number): Promise<{
    purpose?: any;
    error?: DatabaseError;
}> {
    return await getPurposeById(id);
}

/**
 * Search sporting event purposes
 */
export async function searchSportingEventPurposes(searchTerm: string): Promise<SportingEventsData> {
    return await getAllPurposes({ searchTerm });
}

/**
 * Get list of unique sports for filtering
 */
export async function fetchSportsList(): Promise<{
    sports: string[];
    error?: DatabaseError;
}> {
    return await getSportsList();
}

/**
 * Toggle active status of a purpose
 */
export async function togglePurposeActive(id: number, active: boolean, updatedBy: string): Promise<{
    success: boolean;
    error?: DatabaseError;
}> {
    return await updatePurpose({
        id,
        active,
        updatedBy
    });
}