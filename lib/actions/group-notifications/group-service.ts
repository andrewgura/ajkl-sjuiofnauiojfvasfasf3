import db from '@/lib/db';
import type {
    Group,
    GroupMember,
    GroupNotificationsData,
    DatabaseError,
    CreateGroupParams,
    UpdateGroupParams,
    DeleteGroupParams,
    AddMemberParams,
    UpdateMemberParams,
    DeleteMemberParams,
    SearchGroupsParams
} from './group-types';

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
 * Get all groups with their members from the database
 */
export async function getAllGroups(params?: SearchGroupsParams): Promise<{
    groups: Group[];
    error?: DatabaseError;
}> {
    try {
        let groupQuery = db
            .select('*')
            .from('GROUPS')
            .where('ISACTIVE', 'Y')
            .orderBy('NAME');

        // Apply search filter if provided
        if (params?.searchTerm) {
            groupQuery = groupQuery.where(function () {
                this.where('NAME', 'like', `%${params.searchTerm}%`)
                    .orWhere('DESCRIPTION', 'like', `%${params.searchTerm}%`);
            });
        }

        // Apply pagination if provided
        if (params?.limit) {
            groupQuery = groupQuery.limit(params.limit);
            if (params?.offset) {
                groupQuery = groupQuery.offset(params.offset);
            }
        }

        const groups = await groupQuery;

        // Get all members for all groups in one query
        const groupIds = groups.map(g => g.ID);
        let members: any[] = [];

        if (groupIds.length > 0) {
            members = await db
                .select('*')
                .from('GROUPMEMBERS')
                .whereIn('GROUPID', groupIds)
                .where('ISACTIVE', 'Y')
                .orderBy(['GROUPID', 'NAME']);
        }

        // Transform and combine data
        const formattedGroups: Group[] = groups.map(group => {
            const groupMembers = members
                .filter(member => member.GROUPID === group.ID)
                .map(member => ({
                    id: member.ID,
                    groupId: member.GROUPID,
                    name: member.NAME,
                    email: member.EMAIL,
                    createdBy: member.CREATEDBY,
                    createdDate: member.CREATEDDATE,
                    updatedBy: member.UPDATEDBY,
                    updatedDate: member.UPDATEDDATE,
                    isActive: member.ISACTIVE === 'Y'
                }));

            return {
                id: group.ID,
                name: group.NAME,
                description: group.DESCRIPTION || '',
                members: groupMembers,
                createdBy: group.CREATEDBY,
                createdDate: group.CREATEDDATE,
                updatedBy: group.UPDATEDBY,
                updatedDate: group.UPDATEDDATE,
                isActive: group.ISACTIVE === 'Y'
            };
        });

        return { groups: formattedGroups };
    } catch (error) {
        const dbError = categorizeError(error);
        return {
            groups: [],
            error: dbError
        };
    }
}

/**
 * Create a new group
 */
export async function createGroup(params: CreateGroupParams): Promise<{
    group?: Group;
    error?: DatabaseError;
}> {
    try {
        const groupId = generateId();

        await db('GROUPS').insert({
            ID: groupId,
            NAME: params.name,
            DESCRIPTION: params.description,
            CREATEDBY: params.createdBy,
            CREATEDDATE: new Date(),
            ISACTIVE: 'Y'
        });

        // Return the created group
        const newGroup: Group = {
            id: groupId,
            name: params.name,
            description: params.description,
            members: [],
            createdBy: params.createdBy,
            createdDate: new Date(),
            isActive: true
        };

        return { group: newGroup };
    } catch (error) {
        const dbError = categorizeError(error);
        return { error: dbError };
    }
}

/**
 * Update an existing group
 */
export async function updateGroup(params: UpdateGroupParams): Promise<{
    success: boolean;
    error?: DatabaseError;
}> {
    try {
        const updateData: any = {
            UPDATEDBY: params.updatedBy,
            UPDATEDDATE: new Date()
        };

        if (params.name !== undefined) {
            updateData.NAME = params.name;
        }
        if (params.description !== undefined) {
            updateData.DESCRIPTION = params.description;
        }

        const rowsAffected = await db('GROUPS')
            .where('ID', params.id)
            .where('ISACTIVE', 'Y')
            .update(updateData);

        if (rowsAffected === 0) {
            return {
                success: false,
                error: {
                    type: 'QUERY_ERROR',
                    message: 'Group not found or already inactive'
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
 * Delete a group (soft delete by setting IsActive to 'N')
 */
export async function deleteGroup(params: DeleteGroupParams): Promise<{
    success: boolean;
    error?: DatabaseError;
}> {
    try {
        // Soft delete the group
        const groupRowsAffected = await db('GROUPS')
            .where('ID', params.id)
            .where('ISACTIVE', 'Y')
            .update({
                ISACTIVE: 'N',
                UPDATEDBY: params.updatedBy,
                UPDATEDDATE: new Date()
            });

        if (groupRowsAffected === 0) {
            return {
                success: false,
                error: {
                    type: 'QUERY_ERROR',
                    message: 'Group not found or already inactive'
                }
            };
        }

        // Also soft delete all members of the group
        await db('GROUPMEMBERS')
            .where('GROUPID', params.id)
            .where('ISACTIVE', 'Y')
            .update({
                ISACTIVE: 'N',
                UPDATEDBY: params.updatedBy,
                UPDATEDDATE: new Date()
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
 * Add a member to a group
 */
export async function addMemberToGroup(params: AddMemberParams): Promise<{
    member?: GroupMember;
    error?: DatabaseError;
}> {
    try {
        // Check if group exists and is active
        const group = await db('GROUPS')
            .select('ID')
            .where('ID', params.groupId)
            .where('ISACTIVE', 'Y')
            .first();

        if (!group) {
            return {
                error: {
                    type: 'QUERY_ERROR',
                    message: 'Group not found or inactive'
                }
            };
        }

        // Check if member with same email already exists in this group
        const existingMember = await db('GROUPMEMBERS')
            .select('ID')
            .where('GROUPID', params.groupId)
            .where('EMAIL', params.email)
            .where('ISACTIVE', 'Y')
            .first();

        if (existingMember) {
            return {
                error: {
                    type: 'QUERY_ERROR',
                    message: 'Member with this email already exists in the group'
                }
            };
        }

        const memberId = generateId();

        await db('GROUPMEMBERS').insert({
            ID: memberId,
            GROUPID: params.groupId,
            NAME: params.name,
            EMAIL: params.email,
            CREATEDBY: params.createdBy,
            CREATEDDATE: new Date(),
            ISACTIVE: 'Y'
        });

        // Return the created member
        const newMember: GroupMember = {
            id: memberId,
            groupId: params.groupId,
            name: params.name,
            email: params.email,
            createdBy: params.createdBy,
            createdDate: new Date(),
            isActive: true
        };

        return { member: newMember };
    } catch (error) {
        const dbError = categorizeError(error);
        return { error: dbError };
    }
}

/**
 * Update a group member
 */
export async function updateGroupMember(params: UpdateMemberParams): Promise<{
    success: boolean;
    error?: DatabaseError;
}> {
    try {
        const updateData: any = {
            UPDATEDBY: params.updatedBy,
            UPDATEDDATE: new Date()
        };

        if (params.name !== undefined) {
            updateData.NAME = params.name;
        }
        if (params.email !== undefined) {
            updateData.EMAIL = params.email;
        }

        const rowsAffected = await db('GROUPMEMBERS')
            .where('ID', params.id)
            .where('ISACTIVE', 'Y')
            .update(updateData);

        if (rowsAffected === 0) {
            return {
                success: false,
                error: {
                    type: 'QUERY_ERROR',
                    message: 'Member not found or already inactive'
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
 * Delete a group member (soft delete by setting IsActive to 'N')
 */
export async function deleteGroupMember(params: DeleteMemberParams): Promise<{
    success: boolean;
    error?: DatabaseError;
}> {
    try {
        const rowsAffected = await db('GROUPMEMBERS')
            .where('ID', params.id)
            .where('ISACTIVE', 'Y')
            .update({
                ISACTIVE: 'N',
                UPDATEDBY: params.updatedBy,
                UPDATEDDATE: new Date()
            });

        if (rowsAffected === 0) {
            return {
                success: false,
                error: {
                    type: 'QUERY_ERROR',
                    message: 'Member not found or already inactive'
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
 * Get a single group with its members
 */
export async function getGroupById(groupId: string): Promise<{
    group?: Group;
    error?: DatabaseError;
}> {
    try {
        const group = await db('GROUPS')
            .select('*')
            .where('ID', groupId)
            .where('ISACTIVE', 'Y')
            .first();

        if (!group) {
            return {
                error: {
                    type: 'QUERY_ERROR',
                    message: 'Group not found'
                }
            };
        }

        const members = await db('GROUPMEMBERS')
            .select('*')
            .where('GROUPID', groupId)
            .where('ISACTIVE', 'Y')
            .orderBy('NAME');

        const groupMembers: GroupMember[] = members.map(member => ({
            id: member.ID,
            groupId: member.GROUPID,
            name: member.NAME,
            email: member.EMAIL,
            createdBy: member.CREATEDBY,
            createdDate: member.CREATEDDATE,
            updatedBy: member.UPDATEDBY,
            updatedDate: member.UPDATEDDATE,
            isActive: member.ISACTIVE === 'Y'
        }));

        const formattedGroup: Group = {
            id: group.ID,
            name: group.NAME,
            description: group.DESCRIPTION || '',
            members: groupMembers,
            createdBy: group.CREATEDBY,
            createdDate: group.CREATEDDATE,
            updatedBy: group.UPDATEDBY,
            updatedDate: group.UPDATEDDATE,
            isActive: group.ISACTIVE === 'Y'
        };

        return { group: formattedGroup };
    } catch (error) {
        const dbError = categorizeError(error);
        return { error: dbError };
    }
}