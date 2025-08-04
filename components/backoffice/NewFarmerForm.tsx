"use client";
import ImageInput from "@/components/FormInputs/ImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";

import { makePostRequest } from "@/lib/apiRequest";

import { generateUserCode } from "@/lib/generateUserCode";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast"; 
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ArrayItemsInput from "../FormInputs/ArrayItemsInput";

interface User {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  physicalAddress?: string;
  contactPerson?: string;
  contactPersonPhone?: string;
  // Add other optional fields if needed
}

interface NewFarmerFormProps {
  user: User;
}
 type FarmerFormData = {
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
export default function NewFarmerForm({ user }: NewFarmerFormProps) {
  const [loading, setLoading] = useState(false);
const [imageUrl, setImageUrl] = useState<string>("");
const [products, setProducts] = useState<string[]>([]);
  const {
  register,
  reset,
  watch,
  handleSubmit,
  formState: { errors },
} = useForm<FarmerFormData>({
  defaultValues: {
    isActive: true,
    ...user,
  },
});
  const router = useRouter();
   const isActive = watch("isActive");
async function onSubmit(data: FarmerFormData) {
    const code = generateUserCode("LFF", data.name);
    data.code = code;
   
    data.products = products;
    data.profileImageUrl = imageUrl;
    console.log(data);
    try {
       await makePostRequest<FarmerFormData>({ 
   
  setLoading,
  endpoint: "api/farmers",
   data,
  resourceName: "Farmer Profile",
   reset: () => reset(),
    redirect: () => router.push("/dashboard/farmers"),
       });
   
       toast.success("Farmer created successfully!");
     } catch (error) {
     console.error("Farmer creation error:", error);
     toast.error("Failed to create farmer.");
   
     } finally {
       setImageUrl("");
     }
   }
   <ArrayItemsInput items={products} setItems={setProducts} itemTitle="Product" />
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
                label="Farmer Profile Image"
                imageUrl={imageUrl}
                setImageUrlAction={setImageUrl}
                endpoint="farmerProfileUploader"
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
  <p className="text-green-600">Farmers will be Active</p>
) : (
  <p className="text-yellow-600">Farmers will be in Draft</p>
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
