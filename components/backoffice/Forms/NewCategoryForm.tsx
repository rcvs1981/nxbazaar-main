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

type CategoryFormValues = {
  title: string;
  description: string;
  isActive: boolean;
  imageUrl?: string;
  slug?: string;
  id?: string;
};

interface NewCategoryFormProps {
  updateData?: Partial<CategoryFormValues>;
}

export default function NewCategoryForm({ updateData = {} }: NewCategoryFormProps) {
  const initialImageUrl = updateData?.imageUrl ?? "";
  const id = updateData?.id ?? "";
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
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

  const router = useRouter();
 const isActive = watch("isActive");
 console.log("isActive value: ", isActive);
  function redirect() {
    router.push("/dashboard/categories");
  }

  async function onSubmit(data: CategoryFormValues) {
    const slug = generateSlug(data.title);
    data.slug = slug;
    data.imageUrl = imageUrl;

    if (id) {
      data.id = id;
      makePutRequest(setLoading, `api/categories/${id}`, data, "Category", redirect);
    } else {
      makePostRequest(setLoading, "api/categories", data, "Category", reset, redirect);
      setImageUrl("");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
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
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle={id ? "Update Category" : "Create Category"}
        loadingButtonTitle={`${id ? "Updating" : "Creating"} Category please wait...`}
      />
    </form>
  );
}
