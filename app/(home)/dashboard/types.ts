export interface AssignedWaiver {
    id: string;
    status: string;
    confirmation: string;
    company: string;
    createdAt: string;
    startDate: string;
    endDate: string;
}


export interface AssignedWaiversTableProps {
    assignedWaivers: AssignedWaiver[];
}


export interface RecentActivityItem {
    id: number | string;
    confirmation: string;
    status: string;
    applicationDate: string;
    waiverId?: string;
    type: string;
}


export interface RecentActivityTableProps {
    recentActivity: RecentActivityItem[];
}

export interface DashboardClientProps {
    recentActivity: RecentActivityItem[];
    assignedWaivers: AssignedWaiver[];
    isInternal: boolean;
}