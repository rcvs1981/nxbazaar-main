{/** 
import React from "react";
import { notFound } from "next/navigation";
import FormHeader from "@/components/backoffice/FormHeader";
import NewCategoryForm from "@/components/backoffice/Forms/NewCategoryForm";
import { getData } from "@/lib/getData";
import type { Category } from "@/types/category";

export const dynamic = "force-dynamic"; // ensures SSR on every load

interface PageProps {
  params: { id: string };
}

export default async function UpdateCategory({ params }: PageProps) {
  if (!params?.id || typeof params.id !== "string") return notFound();

  try {
    const category = await getData<Category>(`categories/${params.id}`);
    if (!category) return notFound();

    return (
      <div>
        <FormHeader title="Update category" />
        <NewCategoryForm updateData={category} />
      </div>
    );
  } catch (error) {
    console.error("UpdateCategory error:", error);
    return notFound();
  }
}
  */}
import { getData } from "@/lib/getData";
import FormHeader from "@/components/backoffice/FormHeader";
import NewCategoryForm from "@/components/backoffice/Forms/NewCategoryForm";
import { Category } from "@/types/category"; // आपकी टाइप जहां पर भी defined हो

type UpdateCategoryPageProps = {
  params: {
    id: string;
  };
};

export default async function UpdateCategory({ params }: UpdateCategoryPageProps) {
  
  const category = await getData<Partial<Category>>(`categories/${params.id}`);

  return (
    <div className="p-4">
      <FormHeader title="Update category" />
      <NewCategoryForm updateData={category} />
    </div>
  );
}
