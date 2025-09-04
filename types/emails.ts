// types/emails.ts

// Extended EmailTemplate interface with server-side fields
export interface EmailTemplate {
    id: string;
    title: string;
    description: string;
    content: string;
    // Server-side fields
    createdBy?: string;
    createdDate?: Date;
    updatedBy?: string;
    updatedDate?: Date;
    isActive?: boolean;
}

// Extended DistributionListType interface with server-side fields
export interface DistributionListType {
    id?: string; // Optional for compatibility with existing code
    title: string;
    description?: string;
    emails: string[];
    // Server-side fields
    createdBy?: string;
    createdDate?: Date;
    updatedBy?: string;
    updatedDate?: Date;
    isActive?: boolean;
}

export interface DatabaseError {
    type: 'CONNECTION_ERROR' | 'QUERY_ERROR' | 'UNKNOWN_ERROR';
    message: string;
    details?: string;
}

export interface EmailManagementData {
    templates: EmailTemplate[];
    distributionLists: DistributionListType[];
    error?: DatabaseError;
}

// Server action parameter interfaces
export interface AddEmailToListParams {
    distributionListId: string;
    email: string;
    createdBy: string;
}

export interface RemoveEmailFromListParams {
    distributionListId: string;
    email: string;
}

export interface UpdateTemplateParams {
    id: string;
    title?: string;
    description?: string;
    content?: string;
    updatedBy: string;
}

export interface CreateTemplateParams {
    title: string;
    description: string;
    content: string;
    createdBy: string;
}

export interface CreateDistributionListParams {
    title: string;
    description?: string;
    createdBy: string;
}