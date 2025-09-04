"use client"

import React from "react";
import { CheckCircle, Loader2, X } from "lucide-react";

// TODO
export type ProcessState = "processing" | "determined" | "vetted" | "qa" | "certified" | "sent" | "completed" | "rejected";

interface StepData {
    state: string;
    label: string;
    user?: string | null;
    date?: string | null;
    completed?: boolean;
}

interface ProcessStatusBarProps {
    currentStep: string;
    selectedStep?: string;
    stepsData: StepData[];
    onStepNavigation?: (step: string) => void;
    loading?: boolean;
}

const ProcessStatusBar: React.FC<ProcessStatusBarProps> = ({
    currentStep,
    selectedStep,
    stepsData = [],
    onStepNavigation,
    loading = false
}) => {
    const defaultSteps: StepData[] = [
        { state: "processing", label: "Processing" },
        { state: "determined", label: "Determined" },
        { state: "vetted", label: "Vetted" },
        { state: "qa", label: "QA" },
        { state: "certified", label: "Certified" },
        { state: "sent", label: "Sent" }
    ];

    const normalizedCurrentStep = currentStep.toLowerCase();

    // Check if current step is a rejection and extract which step was rejected
    // Now we check the processing step (currentStep) for rejections, not the status
    const isRejected = normalizedCurrentStep.startsWith('rejected_');
    const rejectedStepName = isRejected ? normalizedCurrentStep.replace('rejected_', '') : null;

    // Create a map of the provided step data by state for easy lookup
    const stepsDataMap = stepsData.reduce((acc, step) => {
        acc[step.state.toLowerCase()] = step;
        return acc;
    }, {} as Record<string, StepData>);

    // Merge default steps with provided data and determine current position
    const steps = defaultSteps.map((defaultStep, index) => {
        const providedStepData = stepsDataMap[defaultStep.state];
        const merged = { ...defaultStep, ...providedStepData };

        // Calculate if this step is completed based on current step
        let stepIndex = defaultSteps.findIndex(s => s.state === normalizedCurrentStep);

        // Handle rejection cases
        if (isRejected && rejectedStepName) {
            const rejectedIndex = defaultSteps.findIndex(s => s.state === rejectedStepName);
            stepIndex = rejectedIndex;
        }

        // unknown steps
        let currentIndex = stepIndex;
        if (stepIndex === -1) {
            // If current step is "completed", all steps should be completed
            if (normalizedCurrentStep === "completed") {
                currentIndex = defaultSteps.length;
            } else {
                currentIndex = defaultSteps.length;
            }
        }

        // A step is completed if it has data (date and/or user) or if we're past it in the process
        merged.completed = (providedStepData?.date != null || providedStepData?.user != null) || index < currentIndex;

        return merged;
    });

    // Find the current step index
    let currentStepIndex = steps.findIndex(step => step.state === normalizedCurrentStep);

    // Handle rejection cases for current step index
    if (isRejected && rejectedStepName) {
        currentStepIndex = steps.findIndex(step => step.state === rejectedStepName);
    }

    const handleStepClick = (step: StepData, idx: number) => {
        if (!onStepNavigation || loading) return;

        // Don't allow clicking on steps after the rejected step
        if (isRejected && idx > currentStepIndex) return;

        // Allow clicking on completed steps and current step only
        const isClickable = step.completed || idx === currentStepIndex;
        if (isClickable) {
            onStepNavigation(step.state);
        }
    };

    // Show loading state
    if (loading) {
        return (
            <div className="w-full mb-6">
                <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                    <span className="ml-2 text-sm text-slate-600">Loading process steps...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full mb-6">
            {/* Container for the progress bar and steps */}
            <div className="relative">
                {/* Background line (gray) - spans full width */}
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200"></div>

                {/* Progress line (blue) - spans from start to current step, but stops at rejection */}
                {currentStepIndex > 0 && (
                    <div
                        className="absolute top-5 left-0 h-0.5 bg-blue-500"
                        style={{
                            width: `${(currentStepIndex / (steps.length - 1)) * 100}%`
                        }}
                    ></div>
                )}

                {/* If current step is "completed", fill the entire progress bar */}
                {normalizedCurrentStep === "completed" && (
                    <div className="absolute top-5 left-0 right-0 h-0.5 bg-blue-500"></div>
                )}

                {/* Steps container */}
                <div className="flex justify-between">
                    {steps.map((step, idx) => {
                        const isCompleted = step.completed || (normalizedCurrentStep === "completed");
                        const isCurrent = idx === currentStepIndex;
                        const isRejectedStep = isRejected && idx === currentStepIndex;
                        const isAfterRejection = isRejected && idx > currentStepIndex;
                        const isClickable = (isCompleted || isCurrent) && !isAfterRejection;

                        // Check if this step is currently selected/viewed
                        // Handle both normal steps and rejected steps (e.g., "REJECTED_DETERMINED" should highlight "DETERMINED")
                        let normalizedSelectedStep = selectedStep?.toLowerCase() || "";
                        if (normalizedSelectedStep.startsWith('rejected_')) {
                            normalizedSelectedStep = normalizedSelectedStep.replace('rejected_', '');
                        }
                        const isSelected = normalizedSelectedStep === step.state.toLowerCase();

                        // Determine step styling
                        let stepClasses = "z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all";
                        let iconColor = "";
                        let labelColor = "";
                        let containerClasses = "flex flex-col items-center relative";

                        if (isRejectedStep) {
                            // Red styling for rejected steps
                            stepClasses += " bg-red-500 border-red-500 text-white";
                            iconColor = "text-white";
                            labelColor = "text-red-600";
                        } else if (isAfterRejection) {
                            // Greyed out styling for steps after rejection
                            stepClasses += " bg-gray-100 border-gray-200 text-gray-300";
                            iconColor = "text-gray-300";
                            labelColor = "text-gray-400";
                        } else if (isCompleted) {
                            // Normal completed styling
                            stepClasses += " bg-blue-500 border-blue-500 text-white hover:shadow-md";
                            iconColor = "text-white";
                            labelColor = "text-blue-600";
                        } else if (isCurrent) {
                            // Current step styling
                            stepClasses += " bg-white border-blue-500 text-blue-500 hover:shadow-md";
                            iconColor = "text-blue-500";
                            labelColor = "text-blue-600";
                        } else {
                            // Default inactive styling
                            stepClasses += " bg-white border-gray-300 text-gray-400";
                            iconColor = "text-gray-400";
                            labelColor = "text-gray-500";
                        }

                        // Add selected step styling
                        if (isSelected) {
                            containerClasses += " bg-blue-50 px-3 py-2 rounded-lg border-2 border-blue-200";
                            stepClasses += " ring-2 ring-blue-300 ring-offset-2";
                            if (!isRejectedStep && !isAfterRejection) {
                                labelColor = "text-blue-700 font-semibold";
                            }
                        }

                        // Add cursor styling
                        if (isClickable) {
                            stepClasses += " cursor-pointer";
                        } else {
                            stepClasses += " cursor-default";
                        }

                        return (
                            <div
                                key={step.state}
                                className={containerClasses}
                                onClick={() => handleStepClick(step, idx)}
                            >
                                {/* Step icon */}
                                <div className={stepClasses}>
                                    {isRejectedStep ? (
                                        <X className="w-5 h-5" />
                                    ) : (isCompleted && !isAfterRejection) ? (
                                        <CheckCircle className="w-5 h-5" />
                                    ) : (
                                        <span className="font-medium text-sm">{idx + 1}</span>
                                    )}
                                </div>

                                <span className={`mt-1.5 text-xs font-medium ${labelColor}`}>
                                    {step.label}
                                </span>

                                {/* User info - only show for completed steps or current step with data */}
                                {(isCompleted || isCurrent) && (step.user || step.date) && !isAfterRejection && (
                                    <div className="mt-0.5 text-center">
                                        {step.user && (
                                            <div className="text-xs text-gray-500">{step.user}</div>
                                        )}
                                        {step.date && (
                                            <div className="text-xs text-gray-400">{step.date}</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProcessStatusBar;