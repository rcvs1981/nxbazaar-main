export type Category = {
  id: string;
  title: string;
  imageUrl: string | null;
  description?: string | null;
  isActive: boolean;   // ✅ यह add करो
  createdAt: Date;
};