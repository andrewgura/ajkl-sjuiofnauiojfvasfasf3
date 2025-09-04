export interface WaiverRequest {
    id: number;
    confirmation: string;
    type: string;
    status: WaiverStatus;
    waiverId: string;
    applicationDate: string | null;
    archived: boolean;
}

// Define the enum first, as the primary source of truth.
export enum WaiverStatusEnum {
    APPROVED = "APPROVED",
    CANCELLED = "CANCELLED",
    VOIDED = "VOIDED",
    WITHDRAWN = "WITHDRAWN",
    DENIED = "DENIED",
    TERMINATED = "TERMINATED",
    DRAFT = "DRAFT",
    INCOMPLETE_PLEASE_REVISE = "INCOMPLETE, PLEASE REVISE",
    MODIFICATION = "MODIFICATION",
    NEW_UNSAVED = "NEW/UNSAVED",
    PROCESSING = "PROCESSING",
    SUBMITTED = "SUBMITTED",
    COMPLETED = "COMPLETED",
}

// Create the array from the enum's values.
export const WAIVER_STATUS_LIST = Object.values(WaiverStatusEnum);

// Create the type from the values in the array.
export type WaiverStatus = typeof WAIVER_STATUS_LIST[number];


export interface MyWaiversData {
    activeRequests: WaiverRequest[];
    archivedRequests: WaiverRequest[];
}