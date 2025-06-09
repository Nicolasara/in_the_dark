// Category constants for better type safety and consistency
export const CATEGORIES = {
  FOOD: "food" as const,
  HOUSEHOLD: "household" as const,
  JOBS: "jobs" as const,
  COCKTAILS: "cocktails" as const,
};

export type CategoryId = "food" | "household" | "jobs" | "cocktails";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: string;
}
