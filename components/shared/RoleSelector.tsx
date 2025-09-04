"use client";

import React, { useState, useRef, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Plus, X, Check } from "lucide-react";

interface RoleSelectorProps {
    selectedRoles: string[];
    availableRoles: string[];
    onRoleToggle: (role: string) => void;
    label?: string;
    defaultRole?: string;
    placeholder?: string;
    searchPlaceholder?: string;
    noResultsText?: string;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({
    selectedRoles,
    availableRoles,
    onRoleToggle,
    label = "User Roles",
    defaultRole,
    placeholder = "Add roles...",
    searchPlaceholder = "Search roles...",
    noResultsText = "No roles found"
}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const filteredRoles = availableRoles.filter(role =>
        searchText === "" ||
        role.toLowerCase().includes(searchText.toLowerCase())
    );

    // Reset search when dropdown opens
    useEffect(() => {
        if (dropdownOpen) {
            setSearchText("");
            setFocusedIndex(-1);
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
    }, [dropdownOpen]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!dropdownOpen) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setFocusedIndex(prev =>
                    prev < filteredRoles.length - 1 ? prev + 1 : 0
                );
                break;
            case "ArrowUp":
                e.preventDefault();
                setFocusedIndex(prev =>
                    prev > 0 ? prev - 1 : filteredRoles.length - 1
                );
                break;
            case "Enter":
                e.preventDefault();
                if (focusedIndex >= 0 && focusedIndex < filteredRoles.length) {
                    onRoleToggle(filteredRoles[focusedIndex]);
                }
                break;
            case "Escape":
                e.preventDefault();
                setDropdownOpen(false);
                break;
        }
    };

    const handleRemoveRole = (role: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onRoleToggle(role);
    };

    return (
        <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-900">
                {label}
                <span className="text-red-500 ml-1">*</span>
            </Label>

            {/* Selected Roles Display */}
            {selectedRoles.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    {selectedRoles.map((role) => (
                        <Badge
                            key={role}
                            variant="secondary"
                            className="bg-white border border-blue-300 text-blue-800 hover:bg-blue-50 px-3 py-1.5 text-sm font-medium"
                        >
                            {role}
                            {!(defaultRole && role === defaultRole) && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => handleRemoveRole(role, e)}
                                    className="ml-2 h-4 w-4 p-0 hover:bg-red-100 hover:text-red-600 rounded-full"
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            )}
                        </Badge>
                    ))}
                </div>
            )}

            {/* Role Selector Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full justify-between bg-white hover:bg-gray-50 h-10"
                >
                    <div className="flex items-center">
                        <Plus className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-gray-600">{placeholder}</span>
                    </div>
                    <ChevronsUpDown className="h-4 w-4 text-gray-400" />
                </Button>

                {dropdownOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                        {/* Search Input */}
                        <div className="p-2 border-b border-gray-100">
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder={searchPlaceholder}
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Role Options */}
                        <div className="max-h-60 overflow-auto">
                            {filteredRoles.length === 0 ? (
                                <div className="p-4 text-center text-sm text-gray-500">
                                    {noResultsText}
                                </div>
                            ) : (
                                <div className="p-1">
                                    {filteredRoles.map((role, index) => {
                                        const isSelected = selectedRoles.includes(role);
                                        const isFocused = focusedIndex === index;

                                        return (
                                            <div
                                                key={role}
                                                className={`
                                                    flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer transition-colors
                                                    ${isFocused ? 'bg-blue-50' : 'hover:bg-gray-50'}
                                                    ${isSelected ? 'text-blue-700 bg-blue-50' : 'text-gray-700'}
                                                `}
                                                onClick={() => {
                                                    onRoleToggle(role);
                                                    if (!isSelected) {
                                                        setDropdownOpen(false);
                                                    }
                                                }}
                                                onMouseEnter={() => setFocusedIndex(index)}
                                            >
                                                <span className="flex-1">{role}</span>
                                                {isSelected && (
                                                    <Check className="h-4 w-4 text-blue-600 ml-2" />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {selectedRoles.length === 0 && (
                <p className="text-sm text-red-500">At least "AAP User" role must be selected</p>
            )}
        </div>
    );
};

export default RoleSelector;