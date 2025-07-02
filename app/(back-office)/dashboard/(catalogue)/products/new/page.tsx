import FormHeader from "@/components/backoffice/FormHeader";
import NewProductForm from "@/components/backoffice/NewProductForm";

export default function NewProduct() {
  return (
    <div>
      <FormHeader title="New product" />
      <NewProductForm />
    </div>
  );
}
