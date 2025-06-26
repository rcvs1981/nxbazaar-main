import FormHeader from "@/components/backoffice/FormHeader";
import NewCategoryForm from "@/components/backoffice/Forms/NewCategoryForm";
import { getData } from "@/lib/getData";
import { notFound } from "next/navigation";

interface Category {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  description?: string;
  isActive: boolean;
  // Add other category properties as needed
}

export default async function UpdateCategory({ 
  params 
}: { 
  params: { id: string } 
}) {
  try {
    const category: Category = await getData(`categories/${params.id}`);
    
    if (!category) {
      return notFound();
    }

    return (
      <div className="space-y-6">
        <FormHeader title="Update Category" />
        <NewCategoryForm updateData={category} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching category:", error);
    return notFound();
  }
}