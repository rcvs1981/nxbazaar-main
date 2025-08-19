import { Category } from "./category";
export type SubCategory = {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  description?: string;
  isActive: boolean;
  categoryId: string;
  category?: Category;   // relation
  createdAt?: string;
  updatedAt?: string;
};