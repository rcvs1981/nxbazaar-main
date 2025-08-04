"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import ImageInput from "@/components/FormInputs/ImageInput";
import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";


import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { CategoryOption, TrainingFormData } from "@/types/TrainingFormData";


// ✅ Props Type
interface NewTrainingFormProps {
  categories: CategoryOption[]; // { id: string; title: string }
  updateData?: Partial<TrainingFormData & { id: string }>;
}

export default function NewTrainingForm({ categories, updateData = {} }: NewTrainingFormProps) {
  const router = useRouter();

  const initialContent = updateData?.content ?? "";
  const initialImageUrl = updateData?.imageUrl ?? "";
  const id = updateData?.id ?? "";

  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TrainingFormData>({
    defaultValues: {
      isActive: true,
      ...updateData,
    },
  });

 
 const isActive = watch("isActive");
  const onSubmit = async (data: TrainingFormData) => {
    data.slug = generateSlug(data.title);
    data.imageUrl = imageUrl;
    data.content = content;

    if (id) {
        await makePutRequest<TrainingFormData & { id: string }>({
          setLoading,
          endpoint: `api/trainings/${id}`,
         data: { ...data, id },
          resourceName: "Training",
          reset: () => reset(),
          redirect: () => router.push("/dashboard/community"),
        });
      
        console.log("Update Request: ", data);
      } else {
       await makePostRequest<TrainingFormData>({
          setLoading,
          endpoint: `api/trainings`,
          data,
          resourceName: "Training",
          reset: () => reset(),
          redirect: () => router.push("/dashboard/community"),
        });
      
        console.log("Update Request: ", data);
      }
      setImageUrl("");
      setContent("");
    
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Training Title"
          name="title"
          register={register}
          errors={errors}
          className="w-full"
        />

        <SelectInput<TrainingFormData>
  label="Select Category"
  name="categoryId"
  register={register}
  errors={errors}
  className="w-full"
  options={categories}
/>

        <TextareaInput
          label="Training Description"
          name="description"
          register={register}
          errors={errors}
        />

      <ImageInput
  label="Training Thumbnail"
  imageUrl={imageUrl}
  setImageUrlAction={setImageUrl} // ✅ FIXED: correct prop name
  endpoint="trainingImageUploader"
/>

        <ToggleInput
          label="Publish your Training"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
        {isActive && <p className="text-green-500">This training will be published.</p>}
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle={id ? "Update Training" : "Create Training"}
        loadingButtonTitle={`${id ? "Updating" : "Creating"} Training please wait...`}
      />
    </form>
  );
}
