import React, { useState } from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ExternalLink, AlertTriangle } from "lucide-react";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
};

const UASGuidelinesModal = ({ open, onOpenChange, onConfirm }: Props) => {
    const [hasClickedLink, setHasClickedLink] = useState(false);

    const handleLinkClick = () => {
        setHasClickedLink(true);
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-2xl">
                <AlertDialogHeader className="space-y-6">
                    <div className="flex items-center gap-3">
                        <AlertDialogTitle className="text-xl font-semibold text-slate-900">
                            UAS Guidelines Affirmation
                        </AlertDialogTitle>
                    </div>

                    <div className="space-y-5">
                        <Alert
                            variant="warning"
                            className="bg-amber-50 border-amber-200 text-amber-800"
                        >
                            <AlertTriangle className="h-4 w-4 text-amber-600" />
                            <AlertTitle className="text-amber-800 font-medium text-sm">
                                Important Notice
                            </AlertTitle>
                            <AlertDescription className="text-amber-700 text-sm mt-1.5">
                                In order to create an Unmanned Aircraft System (UAS) request, you must affirm that you have read the UAS TSA Guidelines.
                            </AlertDescription>
                        </Alert>

                        <div className="rounded-lg bg-blue-50 border border-blue-200 p-5 space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5">
                                    <AlertTriangle className="h-4 w-4 text-blue-600" />
                                </div>
                                <div className="text-sm font-medium text-blue-900">
                                    Please review UAS TSA Guidelines
                                    before continuing!
                                </div>
                            </div>

                            <div className="ml-7">
                                <a
                                    target="_blank"
                                    href="https://www.tsa.gov/sites/default/files/dc-frz-uas-application-guidelines-june-27-2024-updated-notams-version.pdf"
                                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium group"
                                    onClick={handleLinkClick}
                                >
                                    Click here to review the guidelines PDF
                                    <ExternalLink className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                                </a>
                                <div className="text-xs text-blue-600/80 mt-1">
                                    (Opens in a new tab on TSA website)
                                </div>
                            </div>
                        </div>

                        <div className="text-sm text-slate-600">
                            After reviewing the guidelines and confirming you have all required
                            documentation, click &apos;I Affirm&apos; to proceed with your request.
                        </div>
                    </div>
                </AlertDialogHeader>

                <AlertDialogFooter className="gap-3 sm:gap-2 mt-8">
                    <AlertDialogCancel className="text-xs font-medium px-4 py-2 bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        disabled={!hasClickedLink}
                        className={`text-xs font-medium px-4 py-2 transition-colors ${hasClickedLink
                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                : "bg-blue-300 cursor-not-allowed text-white"
                            }`}
                    >
                        I Affirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default UASGuidelinesModal;