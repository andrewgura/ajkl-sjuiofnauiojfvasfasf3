export interface FilterSubCategory {
    id: string;
    label: string;
    selected: boolean;
}

export interface FilterCategory {
    id: string;
    label: string;
    selected: boolean;
    items: FilterSubCategory[];
}

export interface Paragraph {
    id: string;
    number: number;
    content: string;
    startTag: string | null;
    endTag: string | null;
}

export interface ParagraphSet {
    id: string;
    title: string;
    paragraphs: Paragraph[];
}

export interface WaiverData {
    filterCategories: FilterCategory[];
    paragraphSets: ParagraphSet[];
}

export interface ParagraphEditState {
    id: string;
    type: string;
    subtype: string;
    distance: string;
    notice: string;
    startTag: string;
    endTag: string;
    text: string;
}

export interface DatabaseError {
    type: 'CONNECTION_ERROR' | 'QUERY_ERROR' | 'UNKNOWN_ERROR';
    message: string;
    details?: string;
}

export interface AllWaiverData {
    filterCategories: FilterCategory[];
    allParagraphs: any[];
    error?: DatabaseError;
    isLoading?: boolean;
}