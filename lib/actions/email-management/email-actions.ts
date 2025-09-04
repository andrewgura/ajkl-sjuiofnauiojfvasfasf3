'use server'

import {
    getEmailManagementData,
    getEmailTemplates,
    getDistributionLists,
    addEmailToDistributionList,
    removeEmailFromDistributionList,
    updateEmailTemplate,
    createEmailTemplate,
    createDistributionList
} from './email-service';

import type {
    EmailManagementData,
    EmailTemplate,
    DistributionListType,
    AddEmailToListParams,
    RemoveEmailFromListParams,
    UpdateTemplateParams,
    CreateTemplateParams,
    CreateDistributionListParams,
    DatabaseError
} from './email-types';

/**
 * Fetch all email management data (templates and distribution lists)
 * This is the main action called on initial page load
 */
export async function fetchEmailManagementData(): Promise<EmailManagementData> {
    return await getEmailManagementData();
}

/**
 * Fetch only email templates
 */
export async function fetchEmailTemplates(): Promise<{
    templates: EmailTemplate[];
    error?: DatabaseError;
}> {
    return await getEmailTemplates();
}

/**
 * Fetch only distribution lists
 */
export async function fetchDistributionLists(): Promise<{
    distributionLists: DistributionListType[];
    error?: DatabaseError;
}> {
    return await getDistributionLists();
}

/**
 * Add an email address to a distribution list
 */
export async function addEmailToList(
    distributionListId: string,
    email: string,
    createdBy: string
): Promise<{ success: boolean; error?: DatabaseError }> {
    // Validate email format
    // TODO: standarise validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            success: false,
            error: {
                type: 'QUERY_ERROR',
                message: 'Invalid email format',
                details: 'Please provide a valid email address'
            }
        };
    }

    const params: AddEmailToListParams = {
        distributionListId,
        email: email.toLowerCase().trim(),
        createdBy
    };

    return await addEmailToDistributionList(params);
}

/**
 * Remove an email address from a distribution list
 */
export async function removeEmailFromList(
    distributionListId: string,
    email: string
): Promise<{ success: boolean; error?: DatabaseError }> {
    const params: RemoveEmailFromListParams = {
        distributionListId,
        email: email.toLowerCase().trim()
    };

    return await removeEmailFromDistributionList(params);
}

/**
 * Update an email template
 */
export async function updateTemplate(
    templateId: string,
    updates: {
        title?: string;
        description?: string;
        content?: string;
    },
    updatedBy: string
): Promise<{ success: boolean; error?: DatabaseError }> {
    // Validate that at least one field is being updated
    if (!updates.title && !updates.description && !updates.content) {
        return {
            success: false,
            error: {
                type: 'QUERY_ERROR',
                message: 'No updates provided',
                details: 'At least one field must be provided for update'
            }
        };
    }

    const params: UpdateTemplateParams = {
        id: templateId,
        ...updates,
        updatedBy
    };

    return await updateEmailTemplate(params);
}

/**
 * Create a new email template
 */
export async function createTemplate(
    title: string,
    description: string,
    content: string,
    createdBy: string
): Promise<{ success: boolean; templateId?: string; error?: DatabaseError }> {
    // Validate required fields
    if (!title?.trim()) {
        return {
            success: false,
            error: {
                type: 'QUERY_ERROR',
                message: 'Title is required',
                details: 'Template title cannot be empty'
            }
        };
    }

    if (!content?.trim()) {
        return {
            success: false,
            error: {
                type: 'QUERY_ERROR',
                message: 'Content is required',
                details: 'Template content cannot be empty'
            }
        };
    }

    const params: CreateTemplateParams = {
        title: title.trim(),
        description: description?.trim() || '',
        content: content.trim(),
        createdBy
    };

    return await createEmailTemplate(params);
}

/**
 * Create a new distribution list
 */
export async function createDistributionListAction(
    title: string,
    description: string,
    createdBy: string
): Promise<{ success: boolean; listId?: string; error?: DatabaseError }> {
    // Validate required fields
    if (!title?.trim()) {
        return {
            success: false,
            error: {
                type: 'QUERY_ERROR',
                message: 'Title is required',
                details: 'Distribution list title cannot be empty'
            }
        };
    }

    const params: CreateDistributionListParams = {
        title: title.trim(),
        description: description?.trim() || '',
        createdBy
    };

    return await createDistributionList(params);
}

/**
 * Bulk operations for distribution lists
 */
export async function bulkAddEmailsToList(
    distributionListId: string,
    emails: string[],
    createdBy: string
): Promise<{
    success: boolean;
    successCount: number;
    errors: Array<{ email: string; error: string }>;
}> {
    const results = {
        success: true,
        successCount: 0,
        errors: [] as Array<{ email: string; error: string }>
    };

    for (const email of emails) {
        const result = await addEmailToList(distributionListId, email, createdBy);
        if (result.success) {
            results.successCount++;
        } else {
            results.errors.push({
                email,
                error: result.error?.message || 'Unknown error'
            });
        }
    }

    results.success = results.errors.length === 0;
    return results;
}

/**
 * Search templates by title or content
 */
export async function searchTemplates(searchTerm: string): Promise<{
    templates: EmailTemplate[];
    error?: DatabaseError;
}> {
    try {
        const { templates, error } = await fetchEmailTemplates();

        if (error) {
            return { templates: [], error };
        }

        const filteredTemplates = templates.filter(template =>
            template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.content.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return { templates: filteredTemplates };
    } catch (error) {
        return {
            templates: [],
            error: {
                type: 'UNKNOWN_ERROR',
                message: 'Search failed',
                details: String(error)
            }
        };
    }
}