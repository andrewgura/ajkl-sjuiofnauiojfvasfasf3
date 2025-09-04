"use client";

import React from "react";

interface FilterFieldProps {
    label: string;
    children: React.ReactNode;
}

const FilterField: React.FC<FilterFieldProps> = ({ label, children }) => {
    return (
        <div>
            <label className="text-xs text-gray-600 mb-1 block">{label}</label>
            {children}
        </div>
    );
};

export default FilterField;