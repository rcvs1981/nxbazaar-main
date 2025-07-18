import React from "react";
import NewMarketForm from "@/components/backoffice/NewMarketForm";
import { getData } from "@/lib/getData";
import { Category } from "@/types/category";

type CategoryOption = {
  id: string;
  title: string;
};

export default async function NewMarket() {
  const categoriesData = await getData("categories") as Category[];

  const categories: CategoryOption[] = categoriesData.map((category) => ({
    id: category.id,
    title: category.title,
  }));

  return <NewMarketForm categories={categories} />;
}
