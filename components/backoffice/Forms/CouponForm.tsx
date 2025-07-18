"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";

import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { convertIsoDateToNormal } from "@/lib/convertIsoDatetoNormal";
import { generateCouponCode } from "@/lib/generateCouponCode";
import { generateIsoFormattedDate } from "@/lib/generateIsoFormattedDate";

type CouponFormData = {
  title: string;
  expiryDate: string;
  isActive: boolean;
  couponCode?: string;
};

type CouponFormProps = {
  updateData?: {
    id?: string;
    title?: string;
    expiryDate?: string;
    isActive?: boolean;
  };
};

export default function CouponForm({ updateData = {} }: CouponFormProps) {
  const router = useRouter();
  const id = updateData?.id ?? "";
  const defaultExpiryDate = updateData?.expiryDate
    ? convertIsoDateToNormal(updateData.expiryDate)
    : "";

  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CouponFormData>({
    defaultValues: {
      title: updateData?.title ?? "",
      expiryDate: defaultExpiryDate,
      isActive: updateData?.isActive ?? true,
    },
  });

  const onSubmit = async (data: CouponFormData) => {
    const couponCode = generateCouponCode(data.title, data.expiryDate);
    const isoFormattedDate = generateIsoFormattedDate(data.expiryDate);

    const payload: CouponFormData = {
      ...data,
      expiryDate: isoFormattedDate,
      couponCode,
    };

    if (id) {
      await makePutRequest<CouponFormData>({
        setLoading,
        endpoint: `api/coupons/${id}`,
        data: payload,
        resourceName: "Coupon",
        reset: () => reset(),
        redirect: () => router.push("/dashboard/coupons"),
      });

      console.log("Update Request: ", payload);
    } else {
      await makePostRequest<CouponFormData>({
        setLoading,
        endpoint: "api/coupons",
        data: payload,
        resourceName: "Coupon",
        reset: () => reset(),
        redirect: () => router.push("/dashboard/coupons"),
      });

      console.log("Create Request: ", payload);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Coupon Title"
          name="title"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="Coupon Expiry Date"
          name="expiryDate"
          type="date"
          register={register}
          errors={errors}
          className="w-full"
        />
        <ToggleInput
          label="Publish your Coupon"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle={id ? "Update Coupon" : "Create Coupon"}
        loadingButtonTitle={id ? "Updating Coupon..." : "Creating Coupon..."}
      />
    </form>
  );
}
