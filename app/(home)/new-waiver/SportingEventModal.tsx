import React from "react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedValue: string;
    onValueChange: (value: string) => void;
    onConfirm: () => void;
};

const SportingEventModal = ({
    open,
    onOpenChange,
    selectedValue,
    onValueChange,
    onConfirm,
}: Props) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="max-w-xl bg-white">
                <AlertDialogHeader className="space-y-3">
                    <AlertDialogTitle className="text-2xl font-semibold text-slate-900">
                        Select Aircraft Type
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-base text-slate-600">
                        What type of aircraft is going to be used in this waiver?
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="py-6">
                    <RadioGroup
                        value={selectedValue}
                        onValueChange={onValueChange}
                        className="space-y-4"
                    >
                        <label
                            className={`
                                block p-4 rounded-xl border cursor-pointer
                                ${selectedValue === 'unmanned'
                                    ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600'
                                    : 'border-slate-200 hover:border-blue-200 hover:bg-slate-50'
                                }
                                transition-all duration-200
                            `}
                        >
                            <div className="flex items-start">
                                <RadioGroupItem value="unmanned" id="unmanned" className="mt-1" />
                                <div className="ml-3 flex-1">
                                    <span className="text-lg font-medium text-slate-900 flex items-center gap-2">
                                        Unmanned Aircraft System or UAS-SPT
                                    </span>
                                </div>
                            </div>
                        </label>

                        <label
                            className={`
                                block p-4 rounded-xl border cursor-pointer
                                ${selectedValue === 'manned'
                                    ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-600'
                                    : 'border-slate-200 hover:border-blue-200 hover:bg-slate-50'
                                }
                                transition-all duration-200
                            `}
                        >
                            <div className="flex items-start">
                                <RadioGroupItem value="manned" id="manned" className="mt-1" />
                                <div className="ml-3 flex-1">
                                    <span className="text-lg font-medium text-slate-900 flex items-center gap-2">
                                        Manned Aircraft or SPT
                                    </span>
                                </div>
                            </div>
                        </label>
                    </RadioGroup>
                </div>

                <AlertDialogFooter className="gap-3 sm:gap-2">
                    <AlertDialogCancel className="h-11 px-5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-medium transition-colors">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        disabled={!selectedValue}
                        className={`
                            h-11 px-6 font-medium rounded-md
                            ${!selectedValue
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow transition-all duration-200'
                            }
                        `}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default SportingEventModal;