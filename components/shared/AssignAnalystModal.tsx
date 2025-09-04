"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Search } from "lucide-react";

interface AssignAnalystModalProps {
    isOpen: boolean;
    onClose: () => void;
    waiver: any;
    analysts: any[];
    onAssign: (waiverId: number, analystName: string) => void;
}

export default function AssignAnalystModal({
    isOpen,
    onClose,
    analysts,
    waiver,
    onAssign,
}: AssignAnalystModalProps) {
    const [open, setOpen] = useState(false);
    const [selectedAnalyst, setSelectedAnalyst] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const searchRef = useRef<HTMLInputElement>(null);

    // Filter analysts based on search term
    const filteredAnalysts = analysts.filter(analyst =>
        analyst.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Reset search when popover opens
    useEffect(() => {
        if (open) {
            setSearchTerm("");
            setTimeout(() => {
                searchRef.current?.focus();
            }, 100);
        }
    }, [open]);

    const handleAssign = () => {
        if (selectedAnalyst) {
            onAssign(waiver.confirmation, selectedAnalyst.name);
            onClose();
            setSelectedAnalyst(null);
        }
    };

    const handleAnalystSelect = (analyst: any) => {
        setSelectedAnalyst(analyst);
        setOpen(false);
    };

    const handleModalClose = () => {
        onClose();
        setSelectedAnalyst(null);
        setSearchTerm("");
        setOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleModalClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-base">Assign Analyst</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full justify-between text-sm"
                            >
                                {selectedAnalyst
                                    ? `${selectedAnalyst.name} (Assigned: ${selectedAnalyst.assignedCount})`
                                    : "Select analyst..."}
                                <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="start">
                            {/* Search Input */}
                            <div className="flex items-center border-b px-3">
                                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                                <input
                                    ref={searchRef}
                                    placeholder="Search analysts..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex h-9 w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-400"
                                />
                            </div>

                            {/* Analysts List */}
                            <div className="max-h-[200px] overflow-y-auto">
                                {filteredAnalysts.length === 0 ? (
                                    <div className="py-6 text-center text-sm text-slate-500">
                                        No analysts found.
                                    </div>
                                ) : (
                                    <div className="p-1">
                                        {filteredAnalysts.map((analyst) => (
                                            <div
                                                key={analyst.id}
                                                onClick={() => handleAnalystSelect(analyst)}
                                                className="relative flex w-full select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-slate-100 cursor-pointer"
                                            >
                                                <Check
                                                    className={`mr-2 h-3 w-3 ${selectedAnalyst?.id === analyst.id
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                        }`}
                                                />
                                                <span className="flex-1">
                                                    {analyst.name} (Assigned: {analyst.assignedCount})
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
                <DialogFooter className="flex space-x-2 justify-end">
                    <Button variant="outline" size="sm" onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button size="sm" onClick={handleAssign} disabled={!selectedAnalyst}>
                        Assign
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}