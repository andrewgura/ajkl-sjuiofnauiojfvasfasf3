
export interface SportingEvent {
    id: number;
    purpose: string;
    sport: string;
    createdOn: string;
    createdBy: string;
    updatedOn: string;
    updatedBy: string;
    active: boolean;
}

export interface SportingEventFormData {
    purpose: string;
    sport: string;
    active: boolean;
}

export interface SportingEventsClientProps {
    initialData: SportingEvent[];
}

export interface SportingEventFormProps {
    sportingEvent: SportingEvent | null;
    onClose: () => void;
    onSave: (sportingEvent: SportingEvent) => void;
    isEditing: boolean;
}

export interface SportingEventsTableProps {
    data: SportingEvent[];
    currentPage: number;
    itemsPerPage: number;
    onEditEvent: (event: SportingEvent) => void;
    onDeleteEvent: (id: number) => void;
    onPageChange: (page: number) => void;
}