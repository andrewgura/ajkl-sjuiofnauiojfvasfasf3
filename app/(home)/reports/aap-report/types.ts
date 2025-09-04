export interface AapReportItem {
    label: string;
    value: number;
}

export interface AapSectionData {
    title: string;
    total: number;
    items: AapReportItem[];
}

export interface AapReportData {
    sections: AapSectionData[];
}