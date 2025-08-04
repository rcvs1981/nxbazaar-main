// app/dashboard/products/new/page.tsx

import FormHeader from "@/components/backoffice/FormHeader";
import NewProductForm from "@/components/backoffice/NewProductForm";
import { getData } from "@/lib/getData";
import type { Option } from "@/types/Option";
import React from "react";

type Category = {
  id: string;
  title: string;
};

type User = {
  id: string;
  name: string;
};

export default async function NewProduct() {
  const categoriesData = await getData<Category[]>("categories");
  const usersData = await getData<User[]>("users");

  console.log("usersData:", usersData);

  const categories: Option[] = Array.isArray(categoriesData)
    ? categoriesData.map((category) => ({
        id: category.id,
        title: category.title,
      }))
    : [];

  const farmers: Option[] = Array.isArray(usersData)
    ? usersData.map((farmer) => ({
        id: farmer.id,
        title: farmer.name,
      }))
    : [];

  return (
    <div>
      <FormHeader title="New Product" />
      <NewProductForm categories={categories} farmers={farmers} />
    </div>
  );
}
