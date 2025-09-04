import React from "react";
import { AlertTriangle, Info, MessageSquare } from "lucide-react";

// TODO: Get banner message and if it should be displayed or not from server

export default function MaintenanceBanner() {
  const bannerTypes = {
    warning: {
      bgColor: "bg-red-500/80",
      borderColor: "border-red-400/40",
      textColor: "text-white",
      iconColor: "text-red-300",
      icon: <AlertTriangle className="h-4 w-4" />,
    },
    info: {
      bgColor: "bg-amber-500/20",
      borderColor: "border-amber-400/20",
      textColor: "text-amber-200",
      iconColor: "text-amber-300",
      icon: <Info className="h-4 w-4" />,
    },
    general: {
      bgColor: "bg-slate-500",
      borderColor: "border-slate-400/20",
      textColor: "text-slate-200",
      iconColor: "text-slate-300",
      icon: <MessageSquare className="h-4 w-4" />,
    },
  };

  const currentType = "info"; // TODO: From DB as well

  return (
    <div className="relative z-10 backdrop-blur-sm border-b border-amber-400/20 m-5">
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
              <span className="font-bold text-amber-100">
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