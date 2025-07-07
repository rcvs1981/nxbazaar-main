
import FormHeader from "@/components/backoffice/FormHeader";
import NewCategoryForm from "@/components/backoffice/Forms/NewCategoryForm";
import  {getData}  from "@/lib/getData";
import { notFound } from "next/navigation";
import React from "react";

interface UpdateCategoryProps {
  params: {
    id: string;
  };
}

export default async function UpdateCategory({ params: { id } }: UpdateCategoryProps) {
  const category = await getData(`categories/${id}`);

  if (!category) return notFound(); // Fallback if category not found

  return (
    <div className="space-y-4">
      <FormHeader title="Update Category" />
      <NewCategoryForm updateData={category} />
    </div>
  );
}
