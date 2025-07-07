// types/category.ts

export type Category = {
   id: string;
    title: string;
    slug: string;
    imageUrl?: string;
    description?: string;
    isActive: boolean;
    createdAt: string | Date;
};
