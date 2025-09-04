export interface BannerType {
    label: string;
    bgColor: string;
    textColor: string;
    iconColor: string;
    borderColor: string;
    icon: React.ReactNode;
}

export interface BannerSettings {
    message: string;
    type: string;
    expiryDateTime: string | null;
    logoutAllUsers: boolean;
}

export interface ToggleButtonProps {
    label: string;
    description?: string;
    isActive: boolean;
    onToggle: () => void;
}

export const BANNER_TYPES = {
    warning: "warning",
    info: "info",
    general: "general"
} as const;

export type BannerTypeKey = keyof typeof BANNER_TYPES;