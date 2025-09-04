import { Info } from "lucide-react";

const InfoAlert = () => {
    return (
        <div className="bg-blue-50 rounded-xl border border-blue-100 p-5">
            <div className="flex gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                    <p className="text-sm font-semibold text-blue-900">
                        Purpose Management
                    </p>
                    <p className="text-xs leading-relaxed text-blue-700">
                        Add and manage purposes for sporting events. Active purposes
                        will be available for selection when creating new events.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InfoAlert;