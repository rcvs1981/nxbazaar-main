"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import ImageInput from "@/components/FormInputs/ImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import ArrayItemsInput from "@/components/FormInputs/ArrayItemsInput";


import { makePostRequest } from "@/lib/apiRequest";
import { generateUserCode } from "@/lib/generateUserCode";

// --------------------
// ✅ Type Definitions
// --------------------
type FarmerFormValues = {
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
  profileImageUrl?: string;
  products?: string[];
};

interface NewFarmerFormProps {
  user: {
    id: string;
  };
}

// --------------------
// ✅ Component
// --------------------
export default function NewFarmerForm({ user }: NewFarmerFormProps) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [products, setProducts] = useState<string[]>([]);
  const router = useRouter();

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FarmerFormValues>({
    defaultValues: {
      isActive: true,
      ...user,
    },
  });

  const redirect = () => router.push("/login");

  const isActive = watch("isActive");
console.log("Current Farmer Status:", isActive ? "Active" : "Draft");

  const onSubmit = async (data: FarmerFormValues) => {
    const code = generateUserCode("LFF", data.name);
    const payload: FarmerFormValues = {
      ...data,
      code,
      userId: user.id,
      products,
      profileImageUrl: imageUrl,
    };

    console.log(payload);

   await makePostRequest(
  setLoading,
  "farmers",
  payload,
  "Farmer Profile",
  reset,
  redirect
);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 mx-auto my-3 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Farmer's Full Name"
          name="name"
          register={register}
          errors={errors}
        />
        <TextInput
          label="Farmer's Phone"
          name="phone"
          type="tel"
          register={register}
          errors={errors}
        />
        <TextInput
          label="Farmer's Email Address"
          name="email"
          register={register}
          errors={errors}
        />
        <TextInput
          label="Farmer's Physical Address"
          name="physicalAddress"
          register={register}
          errors={errors}
        />
        <TextInput
          label="Farmer's Contact Person"
          name="contactPerson"
          register={register}
          errors={errors}
        />
        <TextInput
          label="Farmer's Contact Person Phone"
          name="contactPersonPhone"
          type="tel"
          register={register}
          errors={errors}
        />
        <TextInput
          label="What is the Size of Your Land in Acres"
          name="landSize"
          type="number"
          register={register}
          errors={errors}
        />
        <TextInput
          label="What is your main Crop that you Cultivate"
          name="mainCrop"
          type="text"
          register={register}
          errors={errors}
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
      
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle="Create Farmer"
        loadingButtonTitle="Creating Farmer, please wait..."
      />
    </form>
  );
}
