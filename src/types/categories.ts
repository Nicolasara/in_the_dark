export type CategoryId = "food" | "household" | "jobs" | "cocktails";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: string;
}
