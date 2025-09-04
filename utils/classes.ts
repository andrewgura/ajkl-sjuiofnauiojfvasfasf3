import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function classes(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export { classes as cn }