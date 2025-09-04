import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ActionButton from "@/components/shared/ActionButton";
import WaiverTable from "./WaiverTable";
import WaiverTableActions from "./WaiverTableActions";
import { WaiverRequest } from "./types";

interface ArchivedWaiversProps {
    archivedRequests: WaiverRequest[];
    onDownloadCSV: () => void;
}

const ArchivedWaivers: React.FC<ArchivedWaiversProps> = ({
    archivedRequests,
    onDownloadCSV
}) => {
    const [showArchived, setShowArchived] = useState(false);

    return (
        <div className="mt-6">
            <ActionButton
                icon={showArchived ? ChevronUp : ChevronDown}
                text={showArchived ? "Hide Archived Waivers" : "Show Archived Waivers"}
                onClick={() => setShowArchived(!showArchived)}
                variant="ghost"
                className="text-sm text-gray-700 py-1.5 px-3 mb-4 border border-gray-300 hover:bg-gray-50"
            />

            {showArchived && (
                <div className="bg-white">
                    <WaiverTableActions onDownloadCSV={onDownloadCSV} isArchive={true} />
                    <WaiverTable
                        requests={archivedRequests}
                        emptyTitle="No archived waivers"
                        emptyMessage="You don't have any archived waiver requests."
                        isArchive={true}
                    />
                </div>
            )}
        </div>
    );
};

export default ArchivedWaivers;