// lib/actions/email-management/email-types.ts

export interface EmailTemplate {
    id: string;
    title: string;
    description: string;
    content: string;
    createdBy?: string;
    createdDate?: Date;
    updatedBy?: string;
    updatedDate?: Date;
    isActive?: boolean;
}

// This should match the existing types/emails.ts structure
export interface DistributionListType {
    id?: string; // Make id optional to match existing interface
    title: string;
    description?: string;
    emails: string[];
    createdBy?: string;
    createdDate?: Date;
    updatedBy?: string;
    updatedDate?: Date;
    isActive?: boolean;
}

export interface DistributionListMember {
    id: string;
    distributionListId: string;
    email: string;
    createdBy: string;
    createdDate: Date;
}

export interface EmailManagementData {
    templates: EmailTemplate[];
    distributionLists: DistributionListType[];
    error?: DatabaseError;
}

export interface DatabaseError {
    type: 'CONNECTION_ERROR' | 'QUERY_ERROR' | 'UNKNOWN_ERROR';
    message: string;
    details?: string;
}

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