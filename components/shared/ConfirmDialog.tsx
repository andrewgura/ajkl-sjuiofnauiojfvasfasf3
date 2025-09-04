// components/shared/ConfirmDialog.tsx
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    description?: React.ReactNode;
    message?: React.ReactNode;  // Alternative to description for backwards compatibility
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
    isDestructive?: boolean;
    isLoading?: boolean;
}

const ConfirmDialog = ({
    isOpen,
    title,
    description,
    message,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    onConfirm,
    onCancel,
    isDestructive = false,
    isLoading = false
}: ConfirmDialogProps) => {
    // Use message if provided, otherwise fall back to description for backwards compatibility
    const content = message || description;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && !isLoading && onCancel()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{content}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-end gap-3 mt-4">
                    <Button
                        variant="outline"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        variant={isDestructive ? "destructive" : "default"}
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                Processing...
                            </>
                        ) : (
                            confirmLabel
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmDialog;