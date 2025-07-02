"use client";
import ImageInput from "@/components/FormInputs/ImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface BannerData {
  id?: string;
  title: string;
  link: string;
  imageUrl: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BannerFormProps {
  updateData?: BannerData;
}

export default function BannerForm({ updateData }: BannerFormProps) {
  const initialImageUrl = updateData?.imageUrl ?? "";
  const id = updateData?.id;
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<BannerData>({
    defaultValues: updateData || {
      title: "",
      link: "",
      imageUrl: "",
      isActive: true,
    },
  });
  
  const router = useRouter();
  const isActive = watch("isActive");

  function redirect() {
    router.push("/dashboard/banners");
  }

  async function onSubmit(data: BannerData) {
    const payload = {
      ...data,
      imageUrl: imageUrl,
    };
    
    try {
      setLoading(true);
      if (id) {
        await makePutRequest({
          setLoading,
          endpoint: `api/banners/${id}`,
          data: payload,
          resourceName: "Banner",
          redirect,
        });
      } else {
        await makePostRequest({
          setLoading,
          endpoint: "api/banners",
          data: payload,
          resourceName: "Banner",
          redirect,
        });
        reset();
        setImageUrl("");
      }
    } catch (error) {
      console.error("Error submitting banner:", error);
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Banner Title"
          name="title"
          register={register}
          errors={errors}
          isRequired={true}
        />
        <TextInput
          label="Banner Link"
          name="link"
          type="url"
          register={register}
          errors={errors}
        />
        <ImageInput
  imageUrl={imageUrl}
  setImageUrl={setImageUrl}
  endpoint="bannerImageUploader"
  label="Banner Image"
  
/>

        <ToggleInput
          label={`Banner Status: ${isActive ? 'Active' : 'Draft'}`}
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
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