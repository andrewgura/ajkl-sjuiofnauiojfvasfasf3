import { useState, useEffect, useRef } from "react";
import { Check, ChevronsUpDown, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export interface MultiSelectInputProps {
    values: string[];
    onChange: (values: string[]) => void;
    options: string[];
    placeholder: string;
    searchPlaceholder: string;
    emptyText: string;
    maxDisplay?: number;
}

export function MultiSelectInput({
    values = [],
    onChange,
    options,
    placeholder,
    searchPlaceholder,
    emptyText,
    maxDisplay = 3,
}: MultiSelectInputProps) {
    const [search, setSearch] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [open, setOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const listRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    // Filter options based on search term and exclude already selected options
    useEffect(() => {
        let filtered = options;

        if (search) {
            filtered = options.filter(option =>
                option.toLowerCase().includes(search.toLowerCase())
            );
        }

        setFilteredOptions(filtered);
        setFocusedIndex(-1);
    }, [search, options, values]);

    useEffect(() => {
        if (open) {
            setFocusedIndex(-1);
            if (searchRef.current) {
                searchRef.current.focus();
            }
        }
    }, [open]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setFocusedIndex(prev =>
                prev < filteredOptions.length - 1 ? prev + 1 : prev
            );
            ensureOptionVisible(focusedIndex + 1);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setFocusedIndex(prev => prev > 0 ? prev - 1 : prev);
            ensureOptionVisible(focusedIndex - 1);
        } else if (e.key === "Enter" && focusedIndex >= 0) {
            e.preventDefault();
            toggleOption(filteredOptions[focusedIndex]);
        }
    };

    const ensureOptionVisible = (index: number) => {
        if (index < 0 || !listRef.current) return;
        const listElement = listRef.current;
        const optionElement = listElement.children[0]?.children[index] as HTMLElement;
        if (optionElement) {
            const listRect = listElement.getBoundingClientRect();
            const optionRect = optionElement.getBoundingClientRect();
            if (optionRect.bottom > listRect.bottom) {
                listElement.scrollTop += optionRect.bottom - listRect.bottom;
            } else if (optionRect.top < listRect.top) {
                listElement.scrollTop -= listRect.top - optionRect.top;
            }
        }
    };

    const toggleOption = (option: string) => {
        const newValues = values.includes(option)
            ? values.filter(v => v !== option)
            : [...values, option];

        onChange(newValues);
        setSearch("");
        setFocusedIndex(-1);

        // Keep the popover open for multi-select
        if (searchRef.current) {
            searchRef.current.focus();
        }
    };

    const removeValue = (value: string, e?: React.MouseEvent) => {
        e?.stopPropagation();
        onChange(values.filter(v => v !== value));
    };

    const getDisplayValues = () => {
        if (values.length === 0) return null;

        const displayItems = values.slice(0, maxDisplay);
        const hiddenCount = values.length - displayItems.length;

        return (
            <div className="flex flex-wrap gap-1 items-center">
                {displayItems.map(value => (
                    <div
                        key={value}
                        className="flex items-center bg-blue-100 text-blue-800 rounded px-1.5 py-0.5 text-xs"
                    >
                        <span className="truncate max-w-[100px]">{value}</span>
                        <div
                            onClick={(e) => removeValue(value, e)}
                            className="ml-1 cursor-pointer"
                            role="button"
                            tabIndex={-1}
                            aria-label={`Remove ${value}`}
                        >
                            <X className="h-3 w-3 text-blue-500 hover:text-blue-700" />
                        </div>
                    </div>
                ))}
                {hiddenCount > 0 && (
                    <span className="text-xs text-slate-500">+{hiddenCount} more</span>
                )}
            </div>
        );
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className={`
                        w-full justify-between text-sm bg-white border-slate-200 hover:bg-slate-100
                        focus-visible:ring-1 focus-visible:ring-blue-500
                        h-auto min-h-10 px-3 mt-1, 
                        overflow-hidden
                        ${values.length === 0 ? "text-slate-500" : ""}
                    `}
                >
                    <div className="flex-1 text-left">
                        {getDisplayValues() || <span className="truncate block text-xs">{placeholder}</span>}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-[280px] p-0">
                <div className="flex items-center border-b px-3">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <input
                        ref={searchRef}
                        placeholder={searchPlaceholder}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex h-9 w-full bg-transparent py-3 text-sm outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                <div
                    ref={listRef}
                    onKeyDown={handleKeyDown}
                    className="max-h-[200px] overflow-y-auto outline-none"
                    tabIndex={0}
                    role="listbox"
                    aria-multiselectable="true"
                >
                    {filteredOptions.length === 0 ? (
                        <p className="py-6 text-center text-sm text-slate-500">
                            {emptyText}
                        </p>
                    ) : (
                        <div className="p-1">
                            {filteredOptions.map((option, index) => {
                                const isSelected = values.includes(option);
                                return (
                                    <div
                                        key={option}
                                        role="option"
                                        aria-selected={isSelected}
                                        onClick={() => toggleOption(option)}
                                        onMouseEnter={() => setFocusedIndex(index)}
                                        className={`
                                            relative flex w-full select-none items-center rounded-sm px-2 py-1.5 text-xs outline-none
                                            hover:bg-blue-100 hover:text-blue-900
                                            ${(focusedIndex === index) ? "bg-slate-100" : ""}
                                            ${isSelected ? "bg-blue-50" : ""}
                                            cursor-pointer whitespace-nowrap
                                        `}
                                    >
                                        <Check
                                            className={`
                                                mr-2 h-4 w-4 flex-shrink-0
                                                ${isSelected ? "opacity-100" : "opacity-0"}
                                            `}
                                        />
                                        <span className="truncate">{option}</span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}