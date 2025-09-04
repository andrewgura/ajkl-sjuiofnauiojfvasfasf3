export interface Purpose {
    id: number;
    purpose: string;
    sport: string;
    createdOn: string;
    createdBy: string;
    updatedOn: string;
    updatedBy: string;
    active: boolean;
}

export interface SportingEventsData {
    purposes: Purpose[];
    error?: DatabaseError;
}

export interface DatabaseError {
    type: 'CONNECTION_ERROR' | 'QUERY_ERROR' | 'UNKNOWN_ERROR';
    message: string;
    details?: string;
}

export interface CreatePurposeParams {
    purpose: string;
    sport: string;
    createdBy: string;
}

export interface UpdatePurposeParams {
    id: number;
    purpose?: string;
    sport?: string;
    active?: boolean;
    updatedBy: string;
}

export interface DeletePurposeParams {
    id: number;
    updatedBy: string;
}

export interface SearchPurposesParams {
    searchTerm?: string;
    sport?: string;
    activeOnly?: boolean;
    limit?: number;
    offset?: number;
}