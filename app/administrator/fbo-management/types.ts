export interface FBO {
    id: string;
    icao: string;
    name: string;
    type: string;
    loadDate: string;
    loadBy: string;
    inactive: boolean;
}

export interface FBOFormData {
    id: string;
    icao: string;
    name: string;
    type: string;
    inactive: boolean;
}

export interface FboManagementClientProps {
    initialData: FBO[];
}

export interface FBOFormProps {
    fbo: FBO | null;
    onClose: () => void;
    onSave: (fbo: FBO) => void;
    isEditing: boolean;
}

export interface FBOTableProps {
    data: FBO[];
    currentPage: number;
    itemsPerPage: number;
    onEditFBO: (fbo: FBO) => void;
    onDeleteFBO: (id: string) => void;
    onPageChange: (page: number) => void;
}