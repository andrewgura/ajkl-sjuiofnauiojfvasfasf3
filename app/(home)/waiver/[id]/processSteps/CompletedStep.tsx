"use client"

import React from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";


const CompletedStep: React.FC = () => {
    return (
        <Card className="p-4">
            {/* Completed Message */}
            <div className="mt-6 border border-green-100 rounded-lg bg-green-50 p-5">
                <div className="flex items-start gap-3 mb-4">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                        <h3 className="text-sm font-medium text-green-800 mb-1">Waiver Process Completed</h3>
                        <p className="text-xs text-green-700">
                            The waiver has been successfully processed and approved.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default CompletedStep;