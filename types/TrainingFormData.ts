export interface TrainingFormData {
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  categoryId: string;
  isActive: boolean;
  slug?: string;
  
  [key: string]: unknown;
  
}

export interface CategoryOption {
  id: string;
  title: string;
}
