import db from '@/lib/db';
import type {
    EmailTemplate,
    DistributionListType,
    EmailManagementData,
    DatabaseError,
    AddEmailToListParams,
    RemoveEmailFromListParams,
    UpdateTemplateParams,
    CreateTemplateParams,
    CreateDistributionListParams
} from './email-types';

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

// Generate unique ID helper
function generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Get all email templates from the database
 */
export async function getEmailTemplates(): Promise<{
    templates: EmailTemplate[];
    error?: DatabaseError;
}> {
    try {
        const templates = await db
            .select('*')
            .from('EMAILTEMPLATES')
            .where('ISACTIVE', 'Y')
            .orderBy('TITLE');

        const formattedTemplates: EmailTemplate[] = templates.map(template => ({
            id: template.ID,
            title: template.TITLE,
            description: template.DESCRIPTION || '',
            content: template.CONTENT,
            createdBy: template.CREATEDBY,
            createdDate: template.CREATEDDATE,
            updatedBy: template.UPDATEDBY,
            updatedDate: template.UPDATEDDATE,
            isActive: template.ISACTIVE === 'Y'
        }));

        return { templates: formattedTemplates };
    } catch (error) {
        const dbError = categorizeError(error);
        return {
            templates: [],
            error: dbError
        };
    }
}

/**
 * Get all distribution lists with their members
 */
export async function getDistributionLists(): Promise<{
    distributionLists: DistributionListType[];
    error?: DatabaseError;
}> {
    try {
        // Get all distribution lists
        const lists = await db
            .select('*')
            .from('DISTRIBUTIONLISTS')
            .where('ISACTIVE', 'Y')
            .orderBy('TITLE');

        // Get all members for all lists in one query
        const members = await db
            .select('DISTRIBUTIONLISTID', 'EMAIL')
            .from('DISTRIBUTIONLISTMEMBERS')
            .orderBy(['DISTRIBUTIONLISTID', 'EMAIL']);

        // Group members by distribution list ID
        const membersByListId = members.reduce((acc, member) => {
            if (!acc[member.DISTRIBUTIONLISTID]) {
                acc[member.DISTRIBUTIONLISTID] = [];
            }
            acc[member.DISTRIBUTIONLISTID].push(member.EMAIL);
            return acc;
        }, {} as Record<string, string[]>);

        const formattedLists: DistributionListType[] = lists.map(list => ({
            id: list.ID,
            title: list.TITLE,
            description: list.DESCRIPTION || '',
            emails: membersByListId[list.ID] || [],
            createdBy: list.CREATEDBY,
            createdDate: list.CREATEDDATE,
            updatedBy: list.UPDATEDBY,
            updatedDate: list.UPDATEDDATE,
            isActive: list.ISACTIVE === 'Y'
        }));

        return { distributionLists: formattedLists };
    } catch (error) {
        const dbError = categorizeError(error);
        return {
            distributionLists: [],
            error: dbError
        };
    }
}

/**
 * Get all email management data in one call
 */
export async function getEmailManagementData(): Promise<EmailManagementData> {
    try {
        const [templatesResult, listsResult] = await Promise.all([
            getEmailTemplates(),
            getDistributionLists()
        ]);

        // Return first error found, if any
        const error = templatesResult.error || listsResult.error;

        return {
            templates: templatesResult.templates,
            distributionLists: listsResult.distributionLists,
            error
        };
    } catch (error) {
        const dbError = categorizeError(error);
        return {
            templates: [],
            distributionLists: [],
            error: dbError
        };
    }
}

/**
 * Add an email to a distribution list
 */
export async function addEmailToDistributionList(params: AddEmailToListParams): Promise<{
    success: boolean;
    error?: DatabaseError;
}> {
    try {
        // Check if the email already exists in the list
        const existingMember = await db
            .select('ID')
            .from('DISTRIBUTIONLISTMEMBERS')
            .where('DISTRIBUTIONLISTID', params.distributionListId)
            .where('EMAIL', params.email)
            .first();

        if (existingMember) {
            return {
                success: false,
                error: {
                    type: 'QUERY_ERROR',
                    message: 'Email already exists in this distribution list',
                    details: `Email ${params.email} is already a member of this distribution list`
                }
            };
        }

        // Add the email to the distribution list
        await db('DISTRIBUTIONLISTMEMBERS').insert({
            ID: generateId(),
            DISTRIBUTIONLISTID: params.distributionListId,
            EMAIL: params.email,
            CREATEDBY: params.createdBy,
            CREATEDDATE: new Date()
        });

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
 * Remove an email from a distribution list
 */
export async function removeEmailFromDistributionList(params: RemoveEmailFromListParams): Promise<{
    success: boolean;
    error?: DatabaseError;
}> {
    try {
        const result = await db('DISTRIBUTIONLISTMEMBERS')
            .where('DISTRIBUTIONLISTID', params.distributionListId)
            .where('EMAIL', params.email)
            .del();

        if (result === 0) {
            return {
                success: false,
                error: {
                    type: 'QUERY_ERROR',
                    message: 'Email not found in distribution list',
                    details: `Email ${params.email} was not found in the specified distribution list`
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
 * Update an email template
 */
export async function updateEmailTemplate(params: UpdateTemplateParams): Promise<{
    success: boolean;
    error?: DatabaseError;
}> {
    try {
        const updateData: any = {
            UPDATEDBY: params.updatedBy,
            UPDATEDDATE: new Date()
        };

        if (params.title !== undefined) updateData.TITLE = params.title;
        if (params.description !== undefined) updateData.DESCRIPTION = params.description;
        if (params.content !== undefined) updateData.CONTENT = params.content;

        const result = await db('EMAILTEMPLATES')
            .where('ID', params.id)
            .update(updateData);

        if (result === 0) {
            return {
                success: false,
                error: {
                    type: 'QUERY_ERROR',
                    message: 'Template not found',
                    details: `No template found with ID: ${params.id}`
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
 * Create a new email template
 */
export async function createEmailTemplate(params: CreateTemplateParams): Promise<{
    success: boolean;
    templateId?: string;
    error?: DatabaseError;
}> {
    try {
        const templateId = generateId();

        await db('EMAILTEMPLATES').insert({
            ID: templateId,
            TITLE: params.title,
            DESCRIPTION: params.description,
            CONTENT: params.content,
            CREATEDBY: params.createdBy,
            CREATEDDATE: new Date(),
            ISACTIVE: 'Y'
        });

        return {
            success: true,
            templateId
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
 * Create a new distribution list
 */
export async function createDistributionList(params: CreateDistributionListParams): Promise<{
    success: boolean;
    listId?: string;
    error?: DatabaseError;
}> {
    try {
        const listId = generateId();

        await db('DISTRIBUTIONLISTS').insert({
            ID: listId,
            TITLE: params.title,
            DESCRIPTION: params.description,
            CREATEDBY: params.createdBy,
            CREATEDDATE: new Date(),
            ISACTIVE: 'Y'
        });

        return {
            success: true,
            listId
        };
    } catch (error) {
        const dbError = categorizeError(error);
        return {
            success: false,
            error: dbError
        };
    }
}