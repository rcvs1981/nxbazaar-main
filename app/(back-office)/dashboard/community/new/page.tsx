import FormHeader from "@/components/backoffice/FormHeader";
import NewTrainingForm from "@/components/backoffice/NewTrainingForm";
import { getData } from "@/lib/getData";
import React from "react";

type Category = {
  id: string;
  title: string;
};

export default async function NewTraining() {
  const categoriesData = await getData("categories") as Category[];

  const categories = categoriesData.map((category) => ({
    id: category.id,
    title: category.title,
  }));

  return (
    <div>
      <FormHeader title="New Training" />
      <NewTrainingForm categories={categories} />
    </div>
  );
}
