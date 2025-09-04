"use client";

import { SelectInput } from "./SelectInput";
import { STATE_NAMES } from "@/utils/states";

interface StateSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function StateSelect({ value, onChange }: StateSelectProps) {
  return (
    <SelectInput
      value={value}
      onChange={onChange}
      options={STATE_NAMES}
      placeholder="Select state..."
      searchPlaceholder="Search states..."
      emptyText="No state found."
    />
  );
}