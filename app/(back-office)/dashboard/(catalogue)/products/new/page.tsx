import NewProductForm from "@/components/backoffice/NewProductForm";
import FormHeader from "@/components/backoffice/FormHeader";
import { getData } from "@/lib/getData";

export default async function NewProduct() {
  const categories = await getData("categories");
  const farmers = await getData("farmers");

  return (
    <div>
      <FormHeader title="New Product" />
      <NewProductForm categories={categories} farmers={farmers} />
    </div>
  );
}
