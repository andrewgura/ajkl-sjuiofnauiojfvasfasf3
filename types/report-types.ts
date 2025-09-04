export interface TeamMember {
    id: number;
    name: string;
    role: string;
    waiverCount: number;
}

export interface Waiver {
    id: string;
    confirmation: number;
    waiverId: string;
    company: string;
    startDate: Date;
    endDate: Date;
    certifiedDate: Date;
}

export type WaiverData = {
    [key: number]: Waiver[];
};