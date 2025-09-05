import React from "react";
import { AlertTriangle, Info, MessageSquare } from "lucide-react";

// TODO: Get banner message and if it should be displayed or not from server

export default function MaintenanceBanner() {
  const bannerTypes = {
    warning: {
      bgColor: "bg-red-700",
      borderColor: "border-red-500",
      textColor: "text-white",
      iconColor: "text-red-200",
      icon: <AlertTriangle className="h-4 w-4" />,
    },
    info: {
      bgColor: "bg-yellow-600",
      borderColor: "border-yellow-500",
      textColor: "text-yellow-100",
      iconColor: "text-yellow-200",
      icon: <Info className="h-4 w-4" />,
    },
    general: {
      bgColor: "bg-slate-700",
      borderColor: "border-slate-500",
      textColor: "text-slate-200",
      iconColor: "text-slate-300",
      icon: <MessageSquare className="h-4 w-4" />,
    },
  };

  const currentType = "warning"; // TODO: From DB as well

  return (
    <div className="relative z-10 border-b border-amber-500 m-5 w-auto">
      <div className={`${bannerTypes[currentType].bgColor} border-b ${bannerTypes[currentType].borderColor}`}>
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-center space-x-3">
            <div className="flex-shrink-0">
              <div className={bannerTypes[currentType].iconColor}>
                {bannerTypes[currentType].icon}
              </div>
            </div>
            <div className={`${bannerTypes[currentType].textColor} text-sm font-medium`}>
              AAP down for maintenance. Application will be available again at{" "}
              <span className="font-bold text-amber-50">
                (01/01/2025 12:00 CEST)
              </span>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}