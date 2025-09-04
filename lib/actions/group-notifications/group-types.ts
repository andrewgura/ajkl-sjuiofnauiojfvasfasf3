export interface Group {
    id?: string;
    name: string;
    description: string;
    members: GroupMember[];
    createdBy?: string;
    createdDate?: Date;
    updatedBy?: string;
    updatedDate?: Date;
    isActive?: boolean;
}

export interface GroupMember {
    id?: string;
    groupId?: string;
    name: string;
    email: string;
    createdBy?: string;
    createdDate?: Date;
    updatedBy?: string;
    updatedDate?: Date;
    isActive?: boolean;
}

export interface GroupNotificationsData {
    groups: Group[];
    error?: DatabaseError;
}

export interface DatabaseError {
    type: 'CONNECTION_ERROR' | 'QUERY_ERROR' | 'UNKNOWN_ERROR';
    message: string;
    details?: string;
}

export interface CreateGroupParams {
    name: string;
    description: string;
    createdBy: string;
}

export interface UpdateGroupParams {
    id: string;
    name?: string;
    description?: string;
    updatedBy: string;
}

export interface DeleteGroupParams {
    id: string;
    updatedBy: string;
}

export interface AddMemberParams {
    groupId: string;
    name: string;
    email: string;
    createdBy: string;
}

export interface UpdateMemberParams {
    id: string;
    name?: string;
    email?: string;
    updatedBy: string;
}

export interface DeleteMemberParams {
    id: string;
    updatedBy: string;
}

export interface SearchGroupsParams {
    searchTerm?: string;
    limit?: number;
    offset?: number;
}