export interface AnalystReportItem {
    label: string;
    value: number;
}

export interface AnalystSectionData {
    title: string;
    total: number;
    items: AnalystReportItem[];
}

export interface AnalystReportData {
    sections: AnalystSectionData[];
    analysts: string[];
}