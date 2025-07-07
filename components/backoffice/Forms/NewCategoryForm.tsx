"use client";
import ImageInput from "@/components/FormInputs/ImageInput";

import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";

import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface CategoryFormValues {
  title: string;
  description?: string;
  isActive: boolean;
  imageUrl?: string;
  slug?: string;
  id?: string;
}

export default function NewCategoryForm({ updateData = {} }: { updateData?: Partial<CategoryFormValues> }) {
  const initialImageUrl = updateData?.imageUrl ?? "";
  const id = updateData?.id ?? "";
  const [imageUrl, setImageUrl] = useState<string>(initialImageUrl);
  // const markets = [];
  const [loading, setLoading] = useState(false);
 const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    defaultValues: {
      isActive: true,
      ...updateData,
    },
  });
  const isActive = watch("isActive");
  const router = useRouter();
  
   async function onSubmit(data: CategoryFormValues) {
  const slug = generateSlug(data.title);
  data.slug = slug;
  data.imageUrl = imageUrl;

  if (id) {
  data.id = id;

  await makePutRequest<CategoryFormValues>({
    setLoading,
    endpoint: `api/categories/${id}`,
    data,
    resourceName: "Category",
    reset: () => reset(),
    redirect: () => router.push("/dashboard/categories"),
  });

  console.log("Update Request: ", data);
} else {
 await makePostRequest<CategoryFormValues>({
    setLoading,
    endpoint: "api/categories",
    data,
    resourceName: "Category",
    reset: () => reset(),
    redirect: () => router.push("/dashboard/categories"),
  });

  console.log("Update Request: ", data);
}
  setImageUrl("");
}


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3 "
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Category Title"
          name="title"
          register={register}
          errors={errors}
        />

        <TextareaInput
          label="Category Description"
          name="description"
          register={register}
          errors={errors}
        />
        <ImageInput
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="categoryImageUploader"
          label="Category Image"
        />
        <ToggleInput
          label="Publish your Category"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
        {isActive ? (
  <p className="text-green-500">This category is active</p>
) : (
  <p className="text-red-500">This category is inactive</p>
)}
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle={id ? "Update Category" : "Create Category"}
        loadingButtonTitle={`${
          id ? "Updating" : "Creating"
        } Category please wait...`}
      />
    </form>
  );
}
