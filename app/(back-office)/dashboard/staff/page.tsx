

"use client";


import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import FormHeader from "@/components/backoffice/FormHeader";
import { makePostRequest } from "@/lib/apiRequest";
import { generateUserCode } from "@/lib/generateUserCode";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// Define the shape of the staff form
interface StaffFormData {
  name: string;
  nin: string;
  dob: string;
  password: string;
  email: string;
  phone: string;
  physicalAddress: string;
  notes?: string;
  isActive: boolean;
  code?: string; // generated later
}

export default function NewStaff() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<StaffFormData>({
    defaultValues: {
      isActive: true,
    },
  });

  const isActive = watch("isActive");
 
  const onSubmit: SubmitHandler<StaffFormData> = async (data) => {
    const code = generateUserCode("LSM", data.name);
    data.code = code;
    console.log(data);
   await makePostRequest<StaffFormData>({
      setLoading,
      endpoint: "api/staffs",
      data,
      resourceName: "Staff",
      reset: () => reset(),
      redirect: () => router.push("/dashboard/staff"),
    });
  };

  return (
    <div>
      <FormHeader title="New Staff" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
      >
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <TextInput
            label="Staff Full Name"
            name="name"
            register={register}
            errors={errors}
          />
          <TextInput
            label="NIN (Id Number)"
            name="nin"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Date of Birth"
            name="dob"
            type="date"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Staff's Email Address"
            name="email"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Staff's Phone"
            name="phone"
            type="tel"
            register={register}
            errors={errors}
          />
          <TextInput
            label="Staff's Physical Address"
            name="physicalAddress"
            register={register}
            errors={errors}
          />

          <TextareaInput
            label="Notes"
            name="notes"
            register={register}
            errors={errors}
            isRequired={false}
          />

          <ToggleInput
            label="Staff Member status"
            name="isActive"
            trueTitle="Active"
            falseTitle="Draft"
            register={register}
          />
           {isActive ? (
            <p className="text-green-600">Staff will be Active</p>
          ) : (
            <p className="text-yellow-600">Staff will be in Draft</p>
          )}
        </div>

        <SubmitButton
          isLoading={loading}
          buttonTitle="Create Staff"
          loadingButtonTitle="Creating Staff please wait..."
        />
      </form>
    </div>
  );
}
