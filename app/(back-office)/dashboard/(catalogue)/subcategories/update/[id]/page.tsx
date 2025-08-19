import { getData } from "@/lib/getData";
import FormHeader from "@/components/backoffice/FormHeader";
import NewSubCategoryForm from "@/components/backoffice/Forms/NewSubCategoryForm";

// src/types/subcategory.ts
export type SubCategory = {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  description?: string;
  isActive: boolean;
  categoryId: string;
  createdAt?: Date;
  updatedAt?: Date;
};


type UpdateNewSubCategory = {
  params: {
    id: string;
  };
};

export default async function UpdateNewSubCategory({ params }: UpdateNewSubCategory) {
  // Fetch subcategory, fallback to undefined if not found
  const subcategory: Partial<SubCategory> | undefined =
    (await getData<SubCategory>(`subcategories/${params.id}`)) ?? undefined;

  return (
    <div className="p-4">
      {/* Header */}
      <FormHeader title="Update SubCategory" />

      {/* Form */}
      <NewSubCategoryForm updateData={subcategory} />
    </div>
  );
}
