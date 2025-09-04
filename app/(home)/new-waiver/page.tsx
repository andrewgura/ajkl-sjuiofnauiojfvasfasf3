"use client"

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { useRouter } from 'next/navigation'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import UASGuidelinesModal from "./UASGuidelinesModal";
import SportingEventModal from "./SportingEventModal";
import PageRootContainer from "@/components/shared/PageRootContainer";
import { WaiverType } from "@/types/waivers";
import { WaiverTypeEnum } from "@/lib/actions/waiver/waiver-types";


type WaiverItem = {
  title: WaiverType;
  content: string;
};

interface RequestCardProps {
  title: WaiverType;
  content: string;
}

//TODO: Get WaiverTypes from DB

export default function NewWaiver() {
  const [newWaiverType, setNewWaiverType] = useState<WaiverType | "">("");
  const [showSportingModal, setShowSportingModal] = useState<boolean>(false);
  const [selectedSportingValue, setSelectedSportingValue] = useState<string>("");
  const [showUASGuidelines, setShowUASGuidelines] = useState<boolean>(false);
  const router = useRouter();

  const items: WaiverItem[] = [
    {
      title: WaiverTypeEnum.DASSP,
      content:
        "For authorized participants in the DCA Access Standard Security Program (DASSP) only, to request a TSA Flight Authorization to access Ronald Reagan Washington National Airport detailed in FDC NOTAM 4/2565 and PURSUANT TO 14 CODE OF FEDERAL REGULATIONS (CFR) SECTIONS 93.335, 93.337, 93.339, 93.341, 93.343, 93.345, AND 99.7, AND 49 UNITED STATES CODE (USC) SECTION 40103(B)(3).",
    },
    {
      title: WaiverTypeEnum.Disney,
      content:
        "Request a waiver to access restricted airspace detailed in FDC NOTAM 4/3634 or 4/3635 pertaining to Walt Disney Theme Parks.",
    },
    {
      title: WaiverTypeEnum.Domestic,
      content:
        "Request a waiver to access the Washington DC Special Flight Rules Area (SFRA) Flight Restricted Zone (FRZ), including non-DASSP applications for access to Ronald Reagan Washington National Airport, detailed in FDC NOTAM 4/2565 and PURSUANT TO 14 CODE OF FEDERAL REGULATIONS (CFR) SECTIONS 93.335, 93.337, 93.339, 93.341, 93.343, 93.345, AND 99.7, AND 49 UNITED STATES CODE (USC) SECTION 40103(B)(3).",
    },
    {
      title: WaiverTypeEnum.International,
      content:
        "Request a waiver for access to Territorial United States airspace pursuant to the temporary flight restrictions detailed in FDC NOTAM 1/5060.",
    },
    {
      title: WaiverTypeEnum.Moored,
      content:
        "Request a waiver for moored balloons to access the Washington DC Special Flight Rules Area (SFRA) Flight Restricted Zone (FRZ) detailed in FDC NOTAM 4/2565 and PURSUANT TO 14 CODE OF FEDERAL REGULATIONS (CFR) SECTIONS 93.335, 93.337, 93.339, 93.341, 93.343, 93.345, AND 99.7, AND 49 UNITED STATES CODE (USC) SECTION 40103(B)(3).",
    },
    {
      title: WaiverTypeEnum.Special,
      content:
        "Request a waiver to access restricted airspace over a short duration special event.",
    },
    {
      title: WaiverTypeEnum.Sport,
      content:
        "Request a waiver to access restricted airspace over major sporting events detailed in FDC NOTAM 0/0367.",
    },
    {
      title: WaiverTypeEnum.UAS,
      content:
        "Request a waiver for unmanned aircraft systems to access the Washington DC Special Flight Rules Area (SFRA) Flight Restricted Zone (FRZ) detailed in FDC NOTAM 4/2565 and PURSUANT TO 14 CODE OF FEDERAL REGULATIONS (CFR) SECTIONS 93.335, 93.337, 93.339, 93.341, 93.343, 93.345, AND 99.7, 49 UNITED STATES CODE (USC) SECTION 40103(B)(3).",
    },
  ];

  const handleWaiverTypeUpdate = (waiverType: WaiverType) => {
    setNewWaiverType(waiverType);
    router.push(`/waiver/new?type=${encodeURIComponent(waiverType)}`);
  }

  // TODO: Create new waiver based on newWaiverType state, redirect to form page
  // Sporting Event & Unmanned Aircraft System handled below since they have confirmation modals.
  const handleItemClick = (waiverType: WaiverType): void => {
    if (waiverType === WaiverTypeEnum.Sport) {
      setShowSportingModal(true);
    } else if (waiverType === WaiverTypeEnum.UAS) {
      setShowUASGuidelines(true);
    } else {
      handleWaiverTypeUpdate(waiverType);
    }
  };

  // TODO: Create new Sporting Event waiver, redirect to form page
  const handleSportModalConfirm = (): void => {
    if (selectedSportingValue) {
      const waiverType: WaiverType = "Sporting Event";
      setShowSportingModal(false);
      handleWaiverTypeUpdate(waiverType);
    }
  };

  // TODO: Create new Unmanned Aircraft System waiver, redirect to form page
  const handleUASGuidelines = (): void => {
    const waiverType: WaiverType = WaiverTypeEnum.UAS;
    setShowUASGuidelines(false);
    handleWaiverTypeUpdate(waiverType);
  };

  const RequestCard: React.FC<RequestCardProps> = ({ title, content }) => {
    const mainDescription = content.split("detailed in")[0].trim();
    const regulations = content.includes("detailed in")
      ? content.split("detailed in")[1]
      : "";

    return (
      <Card
        onClick={() => handleItemClick(title)}
        className="p-5 shadow-lg border-t-4 border-t-blue-600 bg-white rounded-lg hover:shadow-xl hover:bg-slate-100 transition-shadow duration-300 cursor-pointer group w-md flex flex-col h-full overflow-hidden"
      >
        <CardHeader className="pb-2 px-0 pt-0">
          <CardTitle className="flex justify-between items-center text-lg font-semibold text-slate-800">
            <span>{title}</span>
            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pt-2 flex-1 flex flex-col">
          <p className="text-slate-700 leading-relaxed text-sm mb-2">
            {mainDescription}
          </p>
          {regulations && (
            <p className="text-slate-500 text-xs leading-relaxed mt-auto">
              detailed in {regulations}
            </p>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <PageRootContainer title="New Waiver">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto overflow-y-auto">
        {items.map((item, index) => (
          <RequestCard
            key={index}
            title={item.title}
            content={item.content}
          />
        ))}
      </div>

      <SportingEventModal
        open={showSportingModal}
        onOpenChange={setShowSportingModal}
        selectedValue={selectedSportingValue}
        onValueChange={setSelectedSportingValue}
        onConfirm={handleSportModalConfirm}
      />

      <UASGuidelinesModal
        open={showUASGuidelines}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setShowUASGuidelines(false);
          }
        }}
        onConfirm={handleUASGuidelines}
      />
    </PageRootContainer>
  );
}