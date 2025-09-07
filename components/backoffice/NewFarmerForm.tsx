"use client";
{/** 
import ImageInput from "@/components/FormInputs/ImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import ArrayItemsInput from "@/components/FormInputs/ArrayItemsInput";

import { makePostRequest } from "@/lib/apiRequest";
import { generateUserCode } from "@/lib/generateUserCode";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// ✅ Define Farmer data structure
interface FarmerFormValues {
  name: string;
  phone: string;
  email: string;
  physicalAddress: string;
  contactPerson: string;
  contactPersonPhone: string;
  landSize: number;
  mainCrop: string;
  terms?: string;
  notes?: string;
  isActive: boolean;
  code?: string;
  userId?: string;
  products?: string[];
  profileImageUrl?: string;
}

// ✅ Props for the form
interface NewFarmerFormProps {
  initialData?: Partial<FarmerFormValues> & { id?: string }; // optional for update mode
}

export function NewFarmerForm({ initialData }: NewFarmerFormProps) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(
    initialData?.profileImageUrl ?? ""
  );
  const [products, setProducts] = useState<string[]>(
    initialData?.products ?? []
  );

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FarmerFormValues>({
    defaultValues: {
      isActive: initialData?.isActive ?? true,
      ...initialData,
    },
  });

  const router = useRouter();
  const isActive = watch("isActive");

  const onSubmit: SubmitHandler<FarmerFormValues> = async (data) => {
    data.code = data.code ?? generateUserCode("LFF", data.name);
    data.products = products;
    data.profileImageUrl = imageUrl;

    console.log("Submitting Farmer:", data);

  
      await makePostRequest<FarmerFormValues>({
        setLoading,
        endpoint: "api/farmers",
        data,
        resourceName: "Farmer Profile",
        reset: () => reset(),
        redirect: () => router.push("/farmers"),
       
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3 "
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Farmer's Full Name"
          name="name"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Farmer's Phone"
          name="phone"
          type="tel"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Farmer's Email Address"
          name="email"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Farmer's Physical Address"
          name="physicalAddress"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Farmer's Contact Person"
          name="contactPerson"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Farmer's Contact Person Phone"
          name="contactPersonPhone"
          type="tel"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="What is the Size of Your Land in Acres"
          name="landSize"
          type="number"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="What is your main Crop that you Cultivate"
          name="mainCrop"
          type="text"
          register={register}
          errors={errors}
          className="w-full"
        />

        <ArrayItemsInput
          setItems={setProducts}
          items={products}
          itemTitle="Product"
        />

        <ImageInput
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="farmerProfileUploader"
          label="Farmer Profile Image"
        />

        <TextareaInput
          label="Farmer's Payment Terms"
          name="terms"
          register={register}
          errors={errors}
          isRequired={false}
        />
        <TextareaInput
          label="Notes"
          name="notes"
          register={register}
          errors={errors}
          isRequired={false}
        />

        <ToggleInput
          label="Farmer Status"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />

        {isActive ? (
          <p className="text-orange-400">This farmer is active</p>
        ) : (
          <p className="text-red-400">This farmer is inactive</p>
        )}
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle={initialData?.id ? "Update Farmer" : "Create Farmer"}
        loadingButtonTitle={
          initialData?.id
            ? "Updating Farmer please wait..."
            : "Creating Farmer please wait..."
        }
      />
    </form>
  );
}
*/}
import ImageInput from "@/components/FormInputs/ImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";

import { makePostRequest } from "@/lib/apiRequest";

import { generateUserCode } from "@/lib/generateUserCode";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ArrayItemsInput from "../FormInputs/ArrayItemsInput";

import { NewFarmerFormProps,FarmerFormInputs } from "@/types/Farmer";

export function NewFarmerForm({ user }: NewFarmerFormProps) {
  const [loading, setLoading] = useState(false);
  
  const [imageUrl, setImageUrl] = useState("");
  const [products, setProducts] = useState([]);
const { register, reset, watch, handleSubmit, formState: { errors } } =
  useForm<FarmerFormInputs>({
    defaultValues: {
      isActive: true,
      ...user,
    },
  });
  const router = useRouter();
  function redirect() {
    router.push("/login");
  }
  const isActive = watch("isActive");
  async function onSubmit(data: FarmerFormInputs) {
  const code = generateUserCode("LFF", data.name);
  data.code = code;
  data.userId = user.id;
  data.products = products;
  data.profileImageUrl = imageUrl;

  console.log(data);
 await makePostRequest<FarmerFormInputs>({
  setLoading,
  endpoint: "/api/farmers",
  data,
  resourceName: "Farmer Profile",
  reset,
  redirect,
});
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3 "
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Farmer's Full Name"
          name="name"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Farmer's Phone"
          name="phone"
          type="tel"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Farmer's Email Address"
          name="email"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Farmer's Physical Address"
          name="physicalAddress"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Farmer's Contact Person"
          name="contactPerson"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Farmer's Contact Person Phone"
          name="contactPersonPhone"
          type="tel"
          register={register}
          errors={errors}
          className="w-full"
        />
        {/* Accare */}
        <TextInput
          label="What is the Size of Your Land in Accres"
          name="landSize"
          type="number"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="What is your main Crop that you Cultivate"
          name="mainCrop"
          type="text"
          register={register}
          errors={errors}
          className="w-full"
        />
        <ArrayItemsInput
          setItems={setProducts}
          items={products}
          itemTitle="Product"
        />
        {/* Configure this endpoint in the core js */}
        <ImageInput
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="farmerProfileUploader"
          label="Farmer Profile Image"
        />
        <TextareaInput
          label="Farmer's Payment Terms"
          name="terms"
          register={register}
          errors={errors}
          isRequired={false}
        />
        <TextareaInput
          label="Notes"
          name="notes"
          register={register}
          errors={errors}
          isRequired={false}
        />
        <ToggleInput
          label="Farmer Status"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
          {isActive ? (
          <p className="text-orange-400">This farmer is active</p>
        ) : (
          <p className="text-red-400">This farmer is inactive</p>
        )}
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle="Create Farmer"
        loadingButtonTitle="Creating Farmer please wait..."
      />
    </form>
  );
}
