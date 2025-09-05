"use client";
import ImageInput from "@/components/FormInputs/ImageInput";

import SubmitButton from "@/components/FormInputs/SubmitButton";

import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";

import { makePostRequest, makePutRequest } from "@/lib/apiRequest";

import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { useForm } from "react-hook-form";


interface BannerFormValues {
  title: string;
  description?: string;
  isActive: boolean;
  imageUrl?: string;
  slug?: string;
  id?: string;
}


export default function BannerForm({ updateData = {} }: { updateData?: Partial<BannerFormValues> }) {
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
  } = useForm<BannerFormValues>({
    defaultValues: {
      isActive: true,
      ...updateData,
    },
  });
  const router = useRouter();
 
  const isActive = watch("isActive");
 async function onSubmit(data: BannerFormValues) {
    data.imageUrl = imageUrl;
    console.log(data);
   if (id) {
  data.id = id;
      await makePutRequest<BannerFormValues>({
    setLoading,
    endpoint: `api/banners/${id}`,
    data,
    resourceName: "Banner",
    reset: () => reset(),
    redirect: () => router.push("/dashboard/banners"),
  });

  console.log("Update Request: ", data);
} else {
 await makePostRequest<BannerFormValues>({
    setLoading,
    endpoint: "api/banners",
    data,
    resourceName: "Banner",
    reset: () => reset(),
    redirect: () => router.push("/dashboard/banners"),
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
          label="Banner Title"
          name="title"
          register={register}
          errors={errors}
        />
        <TextInput
          label="Banner Link"
          name="link"
          type="url"
          register={register}
          errors={errors}
        />
        {/* Configure this endpoint in the core js */}
        <ImageInput
        label="Banner Image"
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        endpoint="bannerImageUploader"
      />
        <ToggleInput
          label="Publish your Banner"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
    {isActive ? (
  <p className="text-green-500">This banner is active</p>
) : (
  <p className="text-red-500">This banner is inactive</p>
)}
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle={id ? "Update Banner" : "Create Banner"}
        loadingButtonTitle={`${
          id ? "Updating" : "Creating"
        } Banner please wait...`}
      />
    </form>
  );
}
