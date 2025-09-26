import FormHeader from "@/components/backoffice/FormHeader";
import NewCategoryForm from "@/components/backoffice/Forms/NewCategoryForm";
import { getData } from "@/lib/getData";
import React from "react";

interface UpdateCategoryProps {
  params: {
    id: string;
  };
}

export default async function UpdateCategory({ params }: UpdateCategoryProps) {
  const category = await getData(`categories/${params.id}`);

  if (!category) {
    return (
      <div className="p-4 text-red-500">
        Category not found or failed to load.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <FormHeader title="Update category" />
      <NewCategoryForm updateData={category} />
    </div>
  );
}
