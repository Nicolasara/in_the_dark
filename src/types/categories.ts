export type CategoryId = "food" | "household" | "jobs";

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: string;
}
