"use client"

import React from "react";
import { Input } from "@/components/ui/input";

type Props = {
    value: string;
    placeHolder?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const SearchFilter = ({ value, onChange, placeHolder }: Props) => {
    return (
        <Input
            type="text"
            placeholder={placeHolder || "Search in all fields..."}
            value={value}
            onChange={onChange}
            className="w-full h-8 text-xs"
        />
    );
};

export default SearchFilter;