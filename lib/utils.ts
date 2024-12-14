import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateVideoCredits(duration: number): number {
  // Base cost is 20 credits for 5 seconds
  const baseCost = 20;
  const baseSeconds = 5;
  
  // Calculate additional seconds beyond base
  const additionalSeconds = Math.max(0, duration - baseSeconds);
  
  // Each additional 5 seconds costs 10 more credits
  const additionalCost = Math.ceil(additionalSeconds / 5) * 10;
  
  return baseCost + additionalCost;
}