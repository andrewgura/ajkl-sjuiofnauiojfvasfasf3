'use server'

import {
    getAllGroups,
    createGroup,
    updateGroup,
    deleteGroup,
    addMemberToGroup,
    updateGroupMember,
    deleteGroupMember,
    getGroupById
} from './group-service';

import type {
    GroupNotificationsData,
    CreateGroupParams,
    UpdateGroupParams,
    DeleteGroupParams,
    AddMemberParams,
    UpdateMemberParams,
    DeleteMemberParams,
    SearchGroupsParams,
    DatabaseError
} from './group-types';

/**
 * Fetch all groups with their members
 */
export async function fetchAllGroups(params?: SearchGroupsParams): Promise<GroupNotificationsData> {
    return await getAllGroups(params);
}

/**
 * Create a new notification group
 */
export async function createNotificationGroup(params: CreateGroupParams): Promise<{
    success: boolean;
    groupId?: string;
    error?: DatabaseError;
}> {
    const result = await createGroup(params);

    if (result.error) {
        return {
            success: false,
            error: result.error
        };
    }

    return {
        success: true,
        groupId: result.group?.id
    };
}

/**
 * Update an existing notification group
 */
export async function updateNotificationGroup(params: UpdateGroupParams): Promise<{
    success: boolean;
    error?: DatabaseError;
}> {
    return await updateGroup(params);
}

/**
 * Delete a notification group
 */
export async function deleteNotificationGroup(params: DeleteGroupParams): Promise<{
    success: boolean;
    error?: DatabaseError;
}> {
    return await deleteGroup(params);
}

/**
 * Add a member to a notification group
 */
export async function addGroupMember(params: AddMemberParams): Promise<{
    success: boolean;
    memberId?: string;
    error?: DatabaseError;
}> {
    const result = await addMemberToGroup(params);

    if (result.error) {
        return {
            success: false,
            error: result.error
        };
    }

    return {
        success: true,
        memberId: result.member?.id
    };
}

/**
 * Update a group member
 */
export async function updateNotificationGroupMember(params: UpdateMemberParams): Promise<{
    success: boolean;
    error?: DatabaseError;
}> {
    return await updateGroupMember(params);
}

/**
 * Delete a group member
 */
export async function deleteGroupMemberAction(params: DeleteMemberParams): Promise<{
    success: boolean;
    error?: DatabaseError;
}> {
    return await deleteGroupMember(params);
}

/**
 * Get a single group by ID
 */
export async function fetchGroupById(groupId: string): Promise<{
    group?: any;
    error?: DatabaseError;
}> {
    return await getGroupById(groupId);
}

/**
 * Search groups by name or description
 */
export async function searchGroups(searchTerm: string): Promise<GroupNotificationsData> {
    return await getAllGroups({ searchTerm });
}