"use client";

// React and third-party libraries
import { useState, useEffect, useCallback } from "react";
import { FormProvider } from "react-hook-form";
import { useSearchParams } from "next/navigation";

// Internal components and server actions
import { Card } from "@/components/ui/card";
import { SimpleTabs } from "@/components/ui/tabs";
import { getWaiverProcessSteps, upsertWaiverAction } from "@/lib/actions/waiver/waiver-actions";
import { WaiverTypeEnum, type WaiverData, type WaiverProcessData } from "@/lib/actions/waiver/waiver-types";

// Local configuration and validation
import { useWaiverForm } from "./waiver-config";
import { WaiverFormData } from "./waiver-validation";

// Main form components
import Aircraft from "./Aircraft";
import Documents from "./Documents";
import InfoBox from "./InfoBox";
import Manifest from "./Manifest";
import Proponent from "./Proponent";
import Security from "./Security";
import Summary from "./Summary";

// Itinerary components
import DasspItinerary from "./itineraries/DasspItinerary";
import DisneyItinerary from "./itineraries/DisneyItinerary";
import DomesticItinerary from "./itineraries/DomesticItinerary";
import InternationalItinerary from "./itineraries/InternationalItinerary";
import SportItinerary from "./itineraries/SportItinerary";
import UasItinerary from "./itineraries/UasItinerary";

// Process step components
import CertifiedStep from "./processSteps/CertifiedStep";
import CompletedStep from "./processSteps/CompletedStep";
import DeterminedStep from "./processSteps/DeterminedStep";
import ProcessingStep from "./processSteps/ProcessingStep";
import QaStep from "./processSteps/QaStep";
import RejectedStep from "./processSteps/RejectedStep";
import SentStep from "./processSteps/SentStep";
import VetStep from "./processSteps/VetStep";
import ProcessStatusBar from "./processSteps/components/ProcessStatusBar";
import { WaiverType } from "@/types/waivers";
import { fromWaiverFormData, mapBackendToForm } from "@/lib/utils/waiver-utils";
import { useWaiverStore } from "@/lib/stores/useWaiverStore";
import UnmannedAircraft from "./UnmannedAircraft";
import { useSession } from "next-auth/react";

type Props = {
  id: string;
  currentProcessStep: string;
  waiver: WaiverData | null;
  process: WaiverProcessData | null;
}

function getItinerary(waiverType?: string) {
  console.log('>>>> itinerary waiverType waiverType waiverType waiverType', waiverType);
  switch (waiverType) {
    case WaiverTypeEnum.DASSP:
      return <DasspItinerary />;
    case WaiverTypeEnum.Disney:
      return <DisneyItinerary />;
    case WaiverTypeEnum.Domestic:
      return <DomesticItinerary />;
    case WaiverTypeEnum.International:
      return <InternationalItinerary />;
    case WaiverTypeEnum.UAS:
      return <UasItinerary />;
    case WaiverTypeEnum.Sport:
      return <SportItinerary />;
    default: // TODO: implement all other type itinerary, like Special Event, SGI, DASSP One Way....
      return null;
  }
};

function replaceWithUnmannedAircraftTab(waiverType?: string): boolean {
  return waiverType === WaiverTypeEnum.UAS;
}

const tabs = [
  { value: "summary", label: "Summary", content: <Summary /> },
  { value: "proponent", label: "Proponent", content: <Proponent /> },
  { value: "aircraft", label: "Aircraft", content: <Aircraft /> },
  { value: "manifest", label: "Manifest", content: <Manifest /> },
  { value: "security", label: "Security", content: <Security /> },
  { value: "documents", label: "Documents", content: <Documents /> },
];

export function WaiverContainer({ id, currentProcessStep, waiver, process }: Props) {
  const waiverTypeFromParams = (decodeURIComponent(useSearchParams().get("type") ?? '') as WaiverType);
  const [isProcessVisible, setIsProcessVisible] = useState<boolean>(false);
  const [selectedStep, setSelectedStep] = useState<string>(currentProcessStep);
  const [stepsData, setStepsData] = useState<Array<{
    state: string;
    label: string;
    user: string | null;
    date: string | null;
  }>>([]);
  const [stepsLoading, setStepsLoading] = useState(false);
  const methods = useWaiverForm({mode: 'onChange'});
  const [currentWaiver, setCurrentWaiver] = useState<WaiverData | null>(
    (waiver && typeof waiver === 'object' && 'status' in waiver) ? {
      ...waiver,
      waiverType: waiver?.waiverType ? waiver?.waiverType : waiverTypeFromParams
    } : waiver
  );
  const { data: session, status } = useSession();

  const { setCurrentStoreWaiver } = useWaiverStore();

  // Check if waiver is ready for process workflow
  const isProcessReady = currentWaiver?.status === 'PROCESSING' ||
    currentWaiver?.status === 'REJECTED' ||
    currentWaiver?.status === 'COMPLETED';

  useEffect(() => {
    if (currentWaiver) {
      console.log('>>>>> currentWaiver', currentWaiver);
      // 1. Map the backend data to your form's data structure
      const formData = mapBackendToForm(currentWaiver);
      console.log('>>>>> formData', formData);

      // 2. Use the `reset` method to populate all fields
      methods.reset(formData);
      setCurrentStoreWaiver(currentWaiver);
    }
  }, [currentWaiver, methods, setCurrentStoreWaiver]);

  // Refresh
  const loadStepsData = useCallback(async () => {
    if (!isProcessVisible) return;

    setStepsLoading(true);
    try {
      const result = await getWaiverProcessSteps(id);
      if (result.error) {
        console.error('Error loading steps data:', result.error);
        setStepsData([]);
      } else {
        setStepsData(result.stepsData);
      }
    } catch (error) {
      console.error('Error loading steps data:', error);
      setStepsData([]);
    } finally {
      setStepsLoading(false);
    }
  }, [id, isProcessVisible]);

  // Load steps data when process view is opened OR when currentProcessStep changes
  useEffect(() => {
    loadStepsData();
  }, [loadStepsData, currentProcessStep]);

  const onSubmit = (data: WaiverFormData) => {
    console.log("Waiver form submitted: ", data);
    // TODO: Handle form submission
  };

  const handleSubmission = (data: WaiverFormData, action: string) => {
    // ... submission logic remains the same
    if (action === "submit") {
      console.log("Final Submission:", data);
    } else if (action === "draft") {
      console.log("Saving Draft:", data);
    }
  };

  const handleSaveDraft = async () => {
    const waiverData = {
      ...currentWaiver,
      ...fromWaiverFormData(methods.getValues())
    };
    // waiverData.waiverType = currentWaiver?.waiverType;
    console.log('Waiver Data', waiverData);
    const result = await upsertWaiverAction(waiverData);
    const confirmation = result.waiver?.confirmation;
    console.log('>>>> upsert result ui, confirmation, result', confirmation, result, userId, userName);
    setCurrentWaiver(result.waiver ?? waiver);
    if (/\d+/.test(confirmation ?? '')) {
      // router.push(`/waiver/${confirmation}`);
      // TODO: we have to use window api to replace the url here for a quite replacement
      // NextJS router.push will trigger a Server Side refetch of the waiver, therefore it forces a page reload!
      // UGH! this is a single page application, why a reload? That is just ugly!
      // How can we achieve this with NextJS and not Vanilla JS?
      window.history.replaceState({}, '', `/waiver/${confirmation}`);
    }
  };

  const handleProcessClick = () => {
    // Check if waiver is ready for process workflow
    const isProcessReady = currentWaiver?.status === 'PROCESSING' ||
      currentWaiver?.status === 'REJECTED' ||
      currentWaiver?.status === 'COMPLETED';

    if (!isProcessReady) {
      return;
    }

    const wasVisible = isProcessVisible;
    setIsProcessVisible(!isProcessVisible);

    // When opening process view, set to current step
    if (!wasVisible) {
      // Handle rejected steps - if current step is REJECTED_SOMETHING, 
      // we want to show that specific step (e.g., DETERMINED for REJECTED_DETERMINED)
      let targetStep = currentProcessStep;
      if (currentProcessStep.startsWith('REJECTED_')) {
        targetStep = currentProcessStep.replace('REJECTED_', '');
      }
      setSelectedStep(targetStep);
    }
  };

  const handleStepNavigation = (step: string) => {
    setSelectedStep(step);
  };

  const getProcessStep = (step: string) => {
    const isReadOnly = step.toLowerCase() !== currentProcessStep.toLowerCase();
    const upperStep = step.toUpperCase();

    const commonProps = {
      waiverId: id,
      readOnly: isReadOnly,
      process: process,
    };

    // Handle rejected states - show the appropriate step component
    if (currentProcessStep.toUpperCase().startsWith('REJECTED_')) {
      const rejectedStep = currentProcessStep.replace(/^REJECTED_/, '');
      if (upperStep === rejectedStep.toUpperCase()) {
        // Show the rejected step component in read-only mode
        return getStepComponent(rejectedStep.toUpperCase(), { ...commonProps, readOnly: true });
      }
    }

    return getStepComponent(upperStep, commonProps);
  };

  const getStepComponent = (upperStep: string, props: any) => {
    switch (upperStep) {
      case "CERTIFIED":
        return <CertifiedStep {...props} />;
      case "COMPLETED":
        return <CompletedStep {...props} />;
      case "DETERMINED":
        return <DeterminedStep {...props} />;
      case "PROCESSING":
        return <ProcessingStep {...props} />;
      case "QA":
        return <QaStep {...props} />;
      case "REJECTED":
      case "REJECTED_PROCESSING":
      case "REJECTED_DETERMINED":
      case "REJECTED_VETTED":
      case "REJECTED_QA":
      case "REJECTED_CERTIFIED":
      case "REJECTED_SENT":
        return <RejectedStep />;
      case "SENT":
        return <SentStep {...props} />;
      case "VETTED":
        return <VetStep {...props} />;
      default:
        return <ProcessingStep {...props} />;
    }
  };

  useEffect(() => {
    const itinerary = getItinerary(currentWaiver?.waiverType);
    console.log('waiverType ?? currentWaiver?.waiverType, itinerary', currentWaiver?.waiverType, itinerary);
    if (itinerary) {
      const itineraryExists = tabs?.find(tab => tab.value === "itinerary");
      if (itineraryExists) {
          tabs?.splice(2, 1, { value: "itinerary", label: "Itinerary", content: itinerary });
      } else {
          tabs?.splice(2, 0, { value: "itinerary", label: "Itinerary", content: itinerary });
      }
    }
    if (replaceWithUnmannedAircraftTab(currentWaiver?.waiverType)) {
      const currentAircraftTab = tabs?.find(tab => tab.value === "aircraft");
      if (currentAircraftTab) {
        currentAircraftTab.content = <UnmannedAircraft />;
      }
    }
  }, [currentWaiver?.waiverType]);

  // Show a loading state while the session is being checked
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-slate-900">
        <p className="text-gray-600 dark:text-gray-400 text-lg animate-pulse">Loading...</p>
      </div>
    );
  }

  // If the user is not authenticated, show a message
  if (status === "unauthenticated") {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-slate-900">
        <p className="text-gray-600 dark:text-gray-400 text-lg">Please log in to view your user ID.</p>
      </div>
    );
  }

  // Once authenticated, you can access the user data from the session object
  const userId = session?.user?.id;
  const userName = session?.user?.name;


  // Only show process view if waiver is ready and process view is enabled
  if (isProcessVisible && isProcessReady) {
    return (
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        <InfoBox
          confirmation={currentWaiver?.confirmation ?? '-'}
          waiverId={id}
          currentProcessStep={currentProcessStep}
          waiver={currentWaiver}
          process={process}
          onProcessClick={handleProcessClick}
          onSaveDraftClick={handleSaveDraft}
        />

        <Card className="p-4">
          <ProcessStatusBar
            key={`${currentProcessStep}-${currentWaiver?.status}-${process?.updatedDate}`}
            currentStep={currentProcessStep}
            selectedStep={selectedStep}
            stepsData={stepsData}
            onStepNavigation={handleStepNavigation}
            loading={stepsLoading}
          />
        </Card>

        {getProcessStep(selectedStep)}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => handleSubmission(data, 'submit'))}>
          <div className="space-y-6">
            <InfoBox
              confirmation={currentWaiver?.confirmation ?? '-'}
              waiverId={id}
              currentProcessStep={currentProcessStep}
              waiver={currentWaiver}
              process={process}
              onProcessClick={handleProcessClick}
              onSaveDraftClick={handleSaveDraft}
            />

            <Card className="p-6">
              <SimpleTabs tabs={tabs} />
            </Card>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}