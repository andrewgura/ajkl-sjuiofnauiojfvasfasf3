"use client"

import React from "react";
import { MyWaiversData } from "./types";
import WaiverTable from "./WaiverTable";
import WaiverTableActions from "./WaiverTableActions";
import ArchivedWaivers from "./ArchivedWaivers";

interface MyWaiversClientProps {
    requests: MyWaiversData;
}

const MyWaiversClient: React.FC<MyWaiversClientProps> = ({ requests }) => {
    const { activeRequests, archivedRequests } = requests;

    const handleDownloadCSV = () => {
        console.log("Downloading CSV...");
    };

    return (
        <div className="w-full">
            <div className="max-w-full mx-auto px-4 py-2">
                {/* Active Waivers Section */}
                <div className="bg-white">
                    <WaiverTableActions onDownloadCSV={handleDownloadCSV} />
                    <WaiverTable
                        requests={activeRequests}
                        emptyTitle="No active waivers"
                        emptyMessage="You don't have any active waiver requests. Create a new waiver to get started."
                    />
                </div>

                {/* Archived Waivers Section */}
                <ArchivedWaivers
                    archivedRequests={archivedRequests}
                    onDownloadCSV={handleDownloadCSV}
                />
            </div>
        </div>
    );
};

export default MyWaiversClient;