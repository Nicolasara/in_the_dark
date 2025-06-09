import { Category, CATEGORIES } from "../types/categories";

export const categories: Category[] = [
  {
    id: CATEGORIES.FOOD,
    name: "Food & Drinks",
    description: "Guess different types of food and beverages",
    icon: "🍔",
  },
  {
    id: CATEGORIES.HOUSEHOLD,
    name: "Household Items",
    description: "Common items found around the house",
    icon: "🏠",
  },
  {
    id: CATEGORIES.JOBS,
    name: "Jobs & Professions",
    description: "Different occupations and careers",
    icon: "💼",
  },
  {
    id: CATEGORIES.COCKTAILS,
    name: "Cocktails & Drinks",
    description: "Classic cocktails and mixed drinks",
    icon: "🍸",
  },
];
