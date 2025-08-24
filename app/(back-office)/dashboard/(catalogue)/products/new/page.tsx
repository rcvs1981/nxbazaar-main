import FormHeader from "@/components/backoffice/FormHeader";
import NewProductForm from "@/components/backoffice/NewProductForm";
import { getData } from "@/lib/getData";
import React from "react";

// ✅ TypeScript interfaces
interface Category {
  id: string;
  title: string;
}

interface Subcategory {
  id: string;
  title: string;
  categoryId: string;
}

interface User {
  id: string;
  name: string;
  role: string;
}

interface Farmer {
  id: string;
  title: string;
}

export default async function NewProduct() {
  // Fetch categories, subcategories, and users
  const categoriesData: Category[] = await getData("categories") || [];
  const subcategoriesData: Subcategory[] = await getData("subcategories") || [];
  const usersData: User[] = await getData("users") || [];

  // Example loading state
  if (!categoriesData.length || !subcategoriesData.length || !usersData.length) {
    return <div>Loading...</div>;
  }

  // Filter farmers
  const farmersData = usersData.filter((user) => user.role === "FARMER");
  const farmers: Farmer[] = farmersData.map((farmer) => ({
    id: farmer.id,
    title: farmer.name,
  }));

  // Map categories
  const categories: Category[] = categoriesData.map((category) => ({
    id: category.id,
    title: category.title,
  }));

  // Map subcategories
  const subcategories: Subcategory[] = subcategoriesData.map((sub) => ({
    id: sub.id,
    title: sub.title,
    categoryId: sub.categoryId,
  }));

  return (
    <div>
      <FormHeader title="New Product" />
      <NewProductForm
        categories={categories}
        subcategories={subcategories}
        farmers={farmers}
      />
    </div>
  );
}
