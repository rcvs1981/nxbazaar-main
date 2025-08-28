"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import ImageInput from "@/components/FormInputs/ImageInput";
import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import FormHeader from "@/components/backoffice/FormHeader";

import { makePostRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { toast } from "react-hot-toast"; 
interface CategoryOption {
  id: string;
  title: string;
}

interface NewMarketFormProps {
  categories: CategoryOption[];
}

interface FormData {
  title: string;
  description: string;
  isActive: boolean;
  categoryIds: string[];
  slug?: string;         // ✅ Optional, added manually
  logoUrl?: string;      // ✅ Optional, added manually
}

export default function NewMarketForm({ categories }: NewMarketFormProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      isActive: true,
      categoryIds: [],
    },
  });

  const isActive = watch("isActive");

async function onSubmit(data: FormData) {
  const slug = generateSlug(data.title);
  data.slug = slug;
  data.logoUrl = imageUrl;

  try {
    await makePostRequest<FormData>({
      setLoading,
      endpoint: "api/markets",
      data,
      resourceName: "Market",
      reset: () => reset(),
      redirect: () => router.push("/dashboard/markets"),
    });

    toast.success("Market created successfully!");
  } catch (error) {
  console.error("Market creation error:", error);
  toast.error("Failed to create market.");

  } finally {
    setImageUrl("");
  }
}


  return (
    <div>
      <FormHeader title="New Market" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Market Title"
            name="title"
            register={register}
            errors={errors}
            className="w-full"
          />
       <SelectInput<FormData>
  label="Select Categories"
  name="categoryIds"
  register={register}
  errors={errors}
  className="w-full"
  options={categories}
  multiple // ✅ जरूरी
/>


 <ImageInput
        label="Category Image"
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        endpoint="marketLogoUploader"
      />
          <TextareaInput
            label="Market Description"
            name="description"
            register={register}
            errors={errors}
          />
          <ToggleInput
            label="Market Status"
            name="isActive"
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
          />
          {isActive ? (
  <p className="text-green-600">Market will be Active</p>
) : (
  <p className="text-yellow-600">Market will be in Draft</p>
)}
        </div>

        <SubmitButton
          isLoading={loading}
          buttonTitle="Create Market"
          loadingButtonTitle="Creating Market please wait..."
        />
      </form>
    </div>
  );
}
