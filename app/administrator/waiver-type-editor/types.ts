import { WaiverType } from "@/types/waivers";

export interface AdminWaiverItem {
    id: number;
    title: WaiverType | string;
    content: string;
    footerText?: string;
    visible: boolean;
    order: number;
}