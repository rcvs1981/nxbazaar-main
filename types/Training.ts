export interface Training {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  description?: string;
  content?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  categoryId?: string;
}