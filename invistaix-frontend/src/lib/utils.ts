import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeUserType(userType: string | null): string {
  if (!userType) return '';
  return userType; // Preserva o caso (maiúsculas/minúsculas)
}
