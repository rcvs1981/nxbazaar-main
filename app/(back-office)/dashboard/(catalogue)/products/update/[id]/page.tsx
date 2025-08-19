import FormHeader from "@/components/backoffice/FormHeader";
import NewProductForm from "@/components/backoffice/NewProductForm";
import { getData } from "@/lib/getData";
import React from "react";

// Product, Category, and Farmer टाइप्स Define करें
interface Params {
  params: {
    id: string;
  };
}

interface User {
  id: string;
  name: string;
  role: string;
}

interface Category {
  id: string;
  title: string;
}

interface Product {
  id: string;
  title: string;
  slug: string;
  // Include बाकी फ़ील्ड्स जो आपके Product में हैं
}

export default async function UpdateProduct({ params: { id } }: Params) {
  const product: Product = await getData(`products/${id}`);

  const categoriesData: Category[] = await getData("categories");
  const usersData: User[] = await getData("users");

  const farmers = usersData
    .filter((user) => user.role === "FARMER")
    .map((farmer) => ({
      id: farmer.id,
      title: farmer.name,
    }));

  const categories = categoriesData.map((category) => ({
    id: category.id,
    title: category.title,
  }));

  return (
    <div>
      <FormHeader title="Update Product" />
      <NewProductForm
        updateData={product}
        categories={categories}
        farmers={farmers}
      />
    </div>
  );
}
