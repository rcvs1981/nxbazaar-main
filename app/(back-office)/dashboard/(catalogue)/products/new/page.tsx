import FormHeader from "@/components/backoffice/FormHeader";

import NewProductForm from "@/components/backoffice/NewProductForm";
//import { getData } from "@/lib/getData";
import React from "react";

export default async function NewProduct() {
   
   
   
  return (
    <div>
      <FormHeader title="New Product" />
      <NewProductForm   />
    </div>
  );
}
