"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";

interface AnalystSelectProps {
    selectedAnalyst: string;
    setSelectedAnalyst: (analyst: string) => void;
    analysts: string[];
}

const AnalystSelect: React.FC<AnalystSelectProps> = ({
    selectedAnalyst,
    setSelectedAnalyst,
    analysts
}) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="h-8 px-3 justify-between bg-white hover:bg-gray-50/75 w-48"
                >
                    <span className="text-sm truncate">{selectedAnalyst}</span>
                    <ChevronsUpDown className="h-3.5 w-3.5 ml-2 text-gray-500" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0">
                <Command>
                    <CommandInput placeholder="Search analysts..." className="h-9" />
                    <CommandEmpty>No analyst found.</CommandEmpty>
                    <CommandGroup>
                        {analysts.map((analyst) => (
                            <CommandItem
                                key={analyst}
                                onSelect={() => {
                                    setSelectedAnalyst(analyst);
                                    setOpen(false);
                                }}
                                className="text-sm"
                            >
                                {analyst}
                                {selectedAnalyst === analyst && (
                                    <Check className="ml-auto h-4 w-4" />
                                )}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

export default AnalystSelect;