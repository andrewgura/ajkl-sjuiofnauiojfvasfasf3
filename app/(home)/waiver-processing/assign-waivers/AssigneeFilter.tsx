"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { User } from "../types";

interface AssigneeFilterProps {
    assigneeFilters: string[];
    onToggleFilter: (assignee: string) => void;
    onClearFilters: () => void;
    popoverOpen: boolean;
    setPopoverOpen: (open: boolean) => void;
    users: User[];
}

const AssigneeFilter: React.FC<AssigneeFilterProps> = ({
    assigneeFilters,
    onToggleFilter,
    onClearFilters,
    popoverOpen,
    setPopoverOpen,
    users,
}) => {
    const getFullName = (user: User) => `${user.firstName} ${user.lastName}`;

    return (
        <div className="space-y-1.5">
            <div className="relative">
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={popoverOpen}
                            className="w-full justify-between text-xs h-8 px-2"
                        >
                            {assigneeFilters.length === 0
                                ? "Filter by assignee..."
                                : `${assigneeFilters.length} selected`}
                            <ChevronsUpDown className="ml-1 h-3 w-3 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                        <Command>
                            <CommandInput
                                placeholder="Search assignees..."
                                className="text-xs h-8"
                            />
                            <CommandEmpty className="text-xs p-2">
                                No assignee found.
                            </CommandEmpty>
                            <CommandGroup>
                                {users.map((user) => {
                                    const fullName = getFullName(user);
                                    return (
                                        <CommandItem
                                            key={user.id}
                                            onSelect={() => onToggleFilter(fullName)}
                                            className="text-xs py-1.5"
                                        >
                                            <div className="mr-2 flex h-3 w-3 items-center justify-center">
                                                {assigneeFilters.includes(fullName) ? (
                                                    <Check className="h-3 w-3" />
                                                ) : null}
                                            </div>
                                            <span>{fullName}</span>
                                            <span className="ml-2 text-gray-400">
                                                ({user.assignedWaivers})
                                            </span>
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
            {assigneeFilters.length > 0 && (
                <div className="flex flex-wrap gap-1">
                    {assigneeFilters.map((fullName) => (
                        <Badge
                            key={fullName}
                            variant="secondary"
                            className="text-[10px] py-0.5 pl-1.5 pr-1 flex items-center gap-1"
                        >
                            {fullName}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-3 w-3 p-0 hover:bg-transparent"
                                onClick={() => onToggleFilter(fullName)}
                            >
                                <X className="h-2.5 w-2.5" />
                            </Button>
                        </Badge>
                    ))}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-[10px] h-4 px-1.5 hover:bg-transparent"
                        onClick={onClearFilters}
                    >
                        Clear all
                    </Button>
                </div>
            )}
        </div>
    );
};

export default AssigneeFilter;