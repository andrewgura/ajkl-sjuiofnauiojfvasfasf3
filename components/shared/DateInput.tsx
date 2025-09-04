"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "../ui/input"
import { Calendar } from "lucide-react"
import { format } from "date-fns"

interface DateInputProps {
  value: Date | null
  onChange: (date: Date | null) => void
  placeholder?: string
  disabled?: boolean
}

export default function DateInput({
  value,
  onChange,
  placeholder = "Select date",
  disabled = false
}: DateInputProps) {
  // For the input string representation
  const [dateString, setDateString] = useState<string>("")
  const [isPickerOpen, setIsPickerOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Update the input value when the date prop changes
  useEffect(() => {
    if (value) {
      setDateString(format(value, "yyyy-MM-dd"))
    } else {
      setDateString("")
    }
  }, [value])

  // Handle date change from input
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDateString = e.target.value
    setDateString(newDateString)

    if (newDateString) {
      // Create date at noon to avoid timezone issues
      const newDate = new Date(`${newDateString}T12:00:00`)
      onChange(newDate)
    } else {
      onChange(null)
    }
  }

  // Open date picker when clicking anywhere in the container
  const openDatePicker = () => {
    if (inputRef.current) {
      inputRef.current.showPicker()
      setIsPickerOpen(true)
    }
  }

  return (
    <div
      className="relative flex items-center cursor-pointer"
      onClick={openDatePicker}
    >
      <div className="absolute left-2 text-gray-400 pointer-events-none">
        <Calendar size={14} />
      </div>
      <Input
        ref={inputRef}
        type="date"
        value={dateString}
        onChange={handleDateChange}
        onFocus={() => setIsPickerOpen(true)}
        onBlur={() => setIsPickerOpen(false)}
        disabled={disabled}
        className="h-8 text-xs pl-7 cursor-pointer"
        // Hide the native calendar icon with an empty string for webkit appearance
        style={{
          // Reset browser-specific styling
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
          // Show placeholder when empty AND picker is not open
          ...((dateString === "" && !isPickerOpen) && {
            color: "transparent"
          })
        }}
      />
      {/* Only show placeholder when there's no date AND the picker is not open */}
      {dateString === "" && !isPickerOpen && (
        <div className="absolute left-7 text-gray-400 pointer-events-none text-xs">
          {placeholder}
        </div>
      )}
    </div>
  )
}