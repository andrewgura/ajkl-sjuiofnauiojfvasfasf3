export interface UasWaiver {
    id: string;
    confirmation: number;
    waiverId: string;
    startDate: Date;
    endDate: Date;
    waiverType: "UAS" | "SPT";
    waiverSubtype: "UAS" | "UFR" | "UAS7" | "UAS-SPT" | "UAS-SVY" | "UAS-SVY7";
    uasOperator: string;
    contact: string;
    operatorLastName: string;
}

export interface UasReportData {
    waivers: UasWaiver[];
}

export const WAIVER_TYPES = ["UAS", "SPT"] as const;
export const WAIVER_SUBTYPES = [
    "UAS",
    "UFR",
    "UAS7",
    "UAS-SPT",
    "UAS-SVY",
    "UAS-SVY7",
] as const;

export type WaiverType = typeof WAIVER_TYPES[number];
export type WaiverSubtype = typeof WAIVER_SUBTYPES[number];

export interface SubtypeFilterProps {
    selectedSubtype: WaiverSubtype | null;
    onSubtypeChange: (subtype: WaiverSubtype | null) => void;
    dropdownOpen: boolean;
    setDropdownOpen: (open: boolean) => void;
}

export interface TypeToggleButtonsProps {
    selectedTypes: WaiverType[];
    onToggleType: (type: WaiverType) => void;
}

export interface UASReportClientProps {
    initialData: UasReportData;
}