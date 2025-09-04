"use client"

import React from "react";
import { Card } from "@/components/ui/card";
import { AlertTriangle, Download } from "lucide-react";
import ActionButton from "@/components/shared/ActionButton";

interface RejectionData {
    date: string;
    status: string;
    reason: string;
}

interface RejectedStepProps {
    rejectionData?: RejectionData;
}

const RejectedStep: React.FC<RejectedStepProps> = ({
    rejectionData = {
        date: "03/08/2025 11:21:12",
        status: "REJECTED",
        reason: "Your UAS waiver application has been rejected based on insufficient or improperly formatted documentation to support your application. Your start date year on the SGI COA Application is inaccurate. Your Drone Photo Permission Letter does not state in the letter body that Nomoi Design LLC dba Visual14 was hired for the project. Your Letter of Application Letter needs to be more clarified, in the 2nd paragraph, it states \"This will allow for details to be captured that can now be captured from a helicopter, or a crane\". If it can be captured by crane or helicopter, there is no need for a drone. In addition, in the the last paragraph, third bullet it states \"3. A crane can measure the length of the area to be covered.\" Please adjust or clarify. Once corrected resubmit for review."
    },
}) => {

    return (
        <Card className="p-4">

            {/* Rejection Details */}
            <div className="mt-6 border border-red-100 rounded-lg bg-red-50 p-5">
                <div className="flex items-start gap-3 mb-4">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                        <h3 className="text-sm font-medium text-red-800 mb-1">Waiver Rejected</h3>
                        <p className="text-xs text-red-700">
                            {rejectionData.date} - {rejectionData.status}
                        </p>
                    </div>
                </div>

                <div className="ml-8">
                    <h4 className="text-sm font-medium text-red-800 mb-2">Rejection Reason:</h4>
                    <div className="text-sm text-red-700 bg-white border border-red-200 rounded-md p-3 whitespace-pre-line">
                        {rejectionData.reason}
                    </div>
                </div>

                <div className="ml-8 mt-4 flex gap-3">
                    <ActionButton
                        icon={Download}
                        text="Download Rejection Letter"
                        onClick={() => console.log("Downloading rejection letter...")}
                        variant="default"
                    />
                </div>
            </div>
        </Card>
    );
};

export default RejectedStep;