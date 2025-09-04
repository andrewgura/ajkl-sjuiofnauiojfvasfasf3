import { useState, useEffect, useRef } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { classes } from "@/utils/classes";

export interface SelectInputProps {
    value: string;
    onChange: (value: string) => void;
    options: string[];
    placeholder: string;
    searchPlaceholder?: string;
    emptyText?: string;
    className?: string;
    disabled?: boolean;
    error?: boolean;
}

export function SelectInput({
    value,
    onChange,
    options,
    placeholder,
    searchPlaceholder = "Search options...",
    emptyText = "No options found.",
    className = "",
    disabled = false,
    error = false,
}: SelectInputProps) {
    const [search, setSearch] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [open, setOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const listRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!search) {
            setFilteredOptions(options);
            return;
        }

        const filtered = options.filter(option =>
            option.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredOptions(filtered);
        setFocusedIndex(-1);
    }, [search, options]);

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
            selectOption(filteredOptions[focusedIndex]);
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

    const selectOption = (option: string) => {
        onChange(option);
        setOpen(false);
        setSearch("");
        setFocusedIndex(-1);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    disabled={disabled}
                    className={classes(
                        "w-full justify-between text-sm bg-white border",
                        "focus-visible:ring-1 focus-visible:ring-blue-500",
                        "h-8 px-3", // Adjusted height to match admin interface
                        "overflow-hidden",
                        !value && "text-slate-500",
                        error ? "border-red-300" : "border-slate-200 hover:border-slate-300",
                        disabled && "opacity-50 cursor-not-allowed",
                        className
                    )}
                >
                    <span className="truncate block text-left">
                        {value || <span className="text-slate-400">{placeholder}</span>}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="start"
                className="w-[280px] p-0 border border-slate-200 shadow-lg rounded-md overflow-hidden"
                sideOffset={4}
            >
                <div className="flex items-center border-b border-slate-100 px-3">
                    <Search className="mr-2 h-4 w-4 shrink-0 text-slate-400" />
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
                    onWheel={(e) => {
                        if (listRef.current) {
                            listRef.current.scrollTop += e.deltaY;
                        }
                    }}
                    className="max-h-[200px] overflow-y-auto outline-none scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-slate-50 hover:scrollbar-thumb-slate-300"
                    tabIndex={0}
                    role="listbox"
                >
                    {filteredOptions.length === 0 ? (
                        <p className="py-6 text-center text-sm text-slate-500">
                            {emptyText}
                        </p>
                    ) : (
                        <div className="p-1">
                            {filteredOptions.map((option, index) => (
                                <button
                                    key={option}
                                    role="option"
                                    aria-selected={value === option}
                                    onClick={() => selectOption(option)}
                                    onMouseEnter={() => setFocusedIndex(index)}
                                    className={classes(
                                        "relative flex w-full select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
                                        "hover:bg-blue-50 hover:text-blue-700",
                                        focusedIndex === index && "bg-slate-100",
                                        value === option && "bg-blue-50 text-blue-700",
                                        "cursor-pointer whitespace-nowrap transition-colors duration-150"
                                    )}
                                >
                                    <Check
                                        className={classes(
                                            "mr-2 h-4 w-4 flex-shrink-0 text-blue-600",
                                            value === option ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    <span className="truncate">{option}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}