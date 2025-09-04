export interface WaiverMasterListEntry {
    id: string;
    startDate: string;
    endDate: string;
    waiverAuthorization: string;
    tailNumber: string;
    callSign: string;
    aircraftType: string;
    companyName: string;
    itineraryVenueDestination: string;
    status?: string;
    lastUpdated?: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    assignedWaivers: number;
    role: string;
}

export const WAIVER_MASTER_LIST_STATUSES = [
    "ACTIVE",
    "EXPIRED",
    "APPROVED",
    "PENDING"
];

export const isActiveWaiver = (entry: WaiverMasterListEntry): boolean => {
    const today = new Date();
    const startDate = new Date(entry.startDate);
    const endDate = new Date(entry.endDate);
    return today >= startDate && today <= endDate;
};