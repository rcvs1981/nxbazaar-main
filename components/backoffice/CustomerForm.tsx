"use client";

import ImageInput from "@/components/FormInputs/ImageInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextInput from "@/components/FormInputs/TextInput";
import { makePutRequest } from "@/lib/apiRequest";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Customer } from "@/types/Customers";

type CustomerFormProps = {
  user: Customer;
};

export default function CustomerForm({ user }: CustomerFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>(user?.profileImage ?? "");
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Customer>({
    defaultValues: { ...user },
  });

 

 const onSubmit: SubmitHandler<Customer> = async (data) => {
  const updatedData: Customer = { ...data, profileImage: imageUrl };

  console.log("Submitting:", updatedData);

  await makePutRequest<Customer>({
    setLoading,
    endpoint: `/api/users/${user.id}`,
    data: updatedData, // ✅ correct
    resourceName: "Customer Profile",
    redirect: () => router.push("/dashboard/customers"),
    reset,
  });
};
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-3xl mx-auto p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <h2 className="text-xl font-semibold mb-4 dark:text-lime-400">
        Personal Details
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 border-b border-gray-700 pb-10">
        <TextInput label="Full Name" name="name" register={register} errors={errors} />
        <TextInput label="Username" name="username" register={register} errors={errors} />
        <TextInput label="Date of Birth" name="dateOfBirth" type="date" register={register} errors={errors} />
        <TextInput label="First Name" name="firstName" register={register} errors={errors} />
        <TextInput label="Last Name" name="lastName" register={register} errors={errors} />
        <TextInput label="Email Address" name="email" type="email" register={register} errors={errors} />
        <TextInput label="Phone Number" name="phone" register={register} errors={errors} />
        <ImageInput
  imageUrl={imageUrl}
  setImageUrl={setImageUrl}
  endpoint="customerProfileUploader" // ✅ now valid
  label="Customer Profile Image"
/>
      </div>

      <h2 className="text-xl font-semibold mb-4 dark:text-lime-400 pt-10">
        Shipping Details
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput label="Street Address" name="streetAddress" register={register} errors={errors} />
        <TextInput label="City" name="city" register={register} errors={errors} />
        <TextInput label="Country" name="country" register={register} errors={errors} />
        <TextInput label="District" name="district" register={register} errors={errors} />
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle="Update Customer"
        loadingButtonTitle="Updating Customer..."
      />
    </form>
  );
}
