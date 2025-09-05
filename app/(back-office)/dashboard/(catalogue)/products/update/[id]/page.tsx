import React from "react";
import FormHeader from "@/components/backoffice/FormHeader";
import NewProductForm from "@/components/backoffice/NewProductForm";
import { getData } from "@/lib/getData";

// Types
interface Params {
  id: string;
}

interface Product {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  productImages: string[];
  description?: string;
  isActive: boolean;
  isWholesale: boolean;
  sku?: string;
  barcode?: string;
  productCode?: string;
  unit?: string;
  productPrice: number;
  salePrice: number;
  categoryId?: string;
  farmerId?: string;
}

interface CategoryAPI {
  id: string;
  title: string;
  subcategories?: {
    id: string;
    title: string;
  }[];
}

interface CategoryForm {
  id: string;
  name: string;
  subcategories?: { id: string; name: string }[];
}

//interface Farmer {
//  id: string;
//  name: string;
//}

//interface User {
//  id: string;
//  name: string;
//  role: string;
//}

export default async function UpdateProduct({ params }: { params: Params }) {
  const { id } = params;
  const product: Product = await getData(`products/${id}`);
  const categoriesData: CategoryAPI[] = await getData("categories");
  //const usersData: User[] = await getData("users");


  // Map categories to form shape
 const categories: CategoryForm[] = categoriesData.map((category) => ({
    id: category.id,
    name: category.title,
    subcategories: category.subcategories?.map((sub) => ({
      id: sub.id,
      name: sub.title,
    })),
  }));

  // Map farmers

//const farmersForForm: Farmer[] = usersData
//  .filter((user) => user.role === "FARMER")
//  .map((user) => ({
  //  id: user.id,
  //  name: user.name,
  //}));
  return (
    <div>
      <FormHeader title="Update Product" />
      <NewProductForm
        updateData={product}
        categories={categories}
        // farmers={farmersForForm}
      />
    </div>
  );
}
