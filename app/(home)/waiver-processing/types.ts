export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    assignedWaivers: number;
    role: string;
}

export interface Waiver {
    id: string;
    confirmation: number;
    company: string;
    currentAssignee: string;
    status: ProcessStepType;
    createdAt: string;
    lastUpdated: string;
    startDate: string;
    endDate?: string;
}

export type ProcessStepType =
    | "TSA ASSIGNED"
    | "IAPWG REVIEW"
    | "DETERMINED"
    | "VETTED"
    | "READY FOR FAA CERTIFICATION"
    | "DASSP READY FOR CERTIFICATION"
    | "VET REJECTED"
    | "QA REJECTED"
    | "FAA REJECTED"
    | "TSA REJECTED"
    | "FAA PENDING"
    | "APPROVED";

export const TSA_ATTENTION_STATUSES: ProcessStepType[] = [
    "TSA ASSIGNED",
    "IAPWG REVIEW",
    "DETERMINED",
    "VETTED",
    "DASSP READY FOR CERTIFICATION",
    "VET REJECTED",
    "QA REJECTED",
    "TSA REJECTED"
];

export const FAA_ATTENTION_STATUSES: ProcessStepType[] = [
    "READY FOR FAA CERTIFICATION",
    "FAA PENDING",
    "FAA REJECTED"
];

export const FINISHED_WAIVERS_STATUSES: ProcessStepType[] = [
    "APPROVED",
    "TSA REJECTED",
    "FAA REJECTED"
];

// Check if waiver is stale (last updated > 7 days ago)
export const isStaleWaiver = (waiver: Waiver): boolean => {
    const lastUpdated = new Date(waiver.lastUpdated);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - lastUpdated.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 7;
};