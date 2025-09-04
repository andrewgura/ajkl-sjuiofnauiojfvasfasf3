import React from "react";
import { Download, Plus } from "lucide-react";
import ActionButton from "@/components/shared/ActionButton";
import Link from "next/link";

interface WaiverTableActionsProps {
    onDownloadCSV: () => void;
    isArchive?: boolean
}

const WaiverTableActions: React.FC<WaiverTableActionsProps> = ({ onDownloadCSV, isArchive }) => {
    return (
        <div className="flex items-center space-x-4 mb-2 mt-2 px-1 py-2">
            {!isArchive && <Link href="/new-waiver" className="inline-block">
                <ActionButton
                    icon={Plus}
                    text="New Waiver"
                    onClick={() => { }}
                    variant="default"
                    className="bg-green-600 hover:bg-green-700 text-white text-xs px-2.5 py-1 h-8"
                />
            </Link>}
            <ActionButton
                icon={Download}
                text="Download CSV"
                onClick={onDownloadCSV}
                variant="default"
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-2.5 py-1 h-8"
            />
        </div>
    );
};

export default WaiverTableActions;