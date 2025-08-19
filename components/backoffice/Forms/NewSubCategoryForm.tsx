"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import TextInput from "@/components/FormInputs/TextInput";
import TextareaInput from "@/components/FormInputs/TextAreaInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import ImageInput from "@/components/FormInputs/ImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import SelectInput from "@/components/FormInputs/SelectInput";

import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { getData } from "@/lib/getData";

interface SubCategoryFormValues {
  id?: string;
  title: string;
  description?: string;
  isActive: boolean;
  imageUrl?: string;
  slug?: string;
  categoryId: string;
  [key: string]: any;
}

export default function NewSubCategoryForm({
  updateData,
}: {
  updateData?: Partial<SubCategoryFormValues>;
}) {
  const initialImageUrl = updateData?.imageUrl ?? "";
  const id = updateData?.id ?? "";
  const [imageUrl, setImageUrl] = useState<string>(initialImageUrl);
  const [categories, setCategories] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SubCategoryFormValues>({
    defaultValues: {
      isActive: true,
      ...updateData,
    },
  });

  const isActive = watch("isActive");
  const router = useRouter();

  // Fetch parent categories
  useEffect(() => {
    async function fetchCategories() {
      const data = (await getData("categories")) as { id: string; title: string }[] | undefined;
      setCategories(data || []);
    }
    fetchCategories();
  }, []);

  async function onSubmit(data: SubCategoryFormValues) {
    data.slug = data.slug || generateSlug(data.title);
    data.imageUrl = imageUrl;

    if (id) {
      // Update
      await makePutRequest<SubCategoryFormValues>({
        setLoading,
        endpoint: `api/subcategories/${id}`,
        data,
        resourceName: "SubCategory",
        redirect: () => router.push("/dashboard/subcategories"),
      });
    } else {
      // Create
      await makePostRequest<SubCategoryFormValues>({
        setLoading,
        endpoint: "api/subcategories",
        data,
        resourceName: "SubCategory",
        reset: () => reset(),
        redirect: () => router.push("/dashboard/subcategories"),
      });
    }

    setImageUrl("");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput label="SubCategory Title" name="title" register={register} errors={errors} />
        <TextareaInput label="SubCategory Description" name="description" register={register} errors={errors} />

        <SelectInput<SubCategoryFormValues>
          label="Parent Category"
          name="categoryId"
          register={register}
          errors={errors}
          options={categories}
        />

        <ImageInput
          label="SubCategory Image"
          imageUrl={imageUrl}
          setImageUrlAction={setImageUrl}
          endpoint="subcategoryImageUploader"
        />

        <ToggleInput
          label="Publish your SubCategory"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
        {isActive ? (
          <p className="text-green-500">This subcategory is active</p>
        ) : (
          <p className="text-red-500">This subcategory is inactive</p>
        )}
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle={id ? "Update SubCategory" : "Create SubCategory"}
        loadingButtonTitle={`${id ? "Updating" : "Creating"} SubCategory please wait...`}
      />
    </form>
  );
}
