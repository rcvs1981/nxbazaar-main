"use client";

import SubmitButton from "@/components/FormInputs/SubmitButton";

import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";

import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { convertIsoDateToNormal } from "@/lib/convertIsoDatetoNormal";
import { generateCouponCode } from "@/lib/generateCouponCode";
import { generateIsoFormattedDate } from "@/lib/generateIsoFormattedDate";

import { useRouter } from "next/navigation";
import React, { useState} from "react";
import { useForm } from "react-hook-form";

export default function CouponForm({ updateData = {} }) {
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const id = updateData?.id ?? "";

  // Initialize form with default values
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
      ...updateData,
      expiryDate: updateData?.expiryDate 
        ? convertIsoDateToNormal(updateData.expiryDate) 
        : "",
    },
  });

  const isActive = watch("isActive");
  const router = useRouter();

  function redirect() {
    router.push("/dashboard/coupons");
  }

  async function onSubmit(data) {
    try {
      const couponCode = generateCouponCode(data.title, data.expiryDate);
      const isoFormattedDate = generateIsoFormattedDate(data.expiryDate);
      
      const payload = {
        ...data,
        expiryDate: isoFormattedDate,
        couponCode: couponCode,
      };

      console.log("Submitting coupon data:", payload);

      if (id) {
        await makePutRequest(
          setLoading,
          `api/coupons/${id}`,
          payload,
          "Coupon",
          redirect
        );
      } else {
        await makePostRequest(
          setLoading,
          "api/coupons",
          payload,
          "Coupon",
          reset,
          redirect
        );
      }
    } catch (error) {
      console.error("Error submitting coupon form:", error);
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
          label="Coupon Title"
          name="title"
          register={register}
          errors={errors}
          className="w-full"
          required
        />
        <TextInput
          label="Coupon Expiry Date"
          name="expiryDate"
          type="date"
          register={register}
          errors={errors}
          className="w-full"
          required
          min={new Date().toISOString().split('T')[0]} // Set min date to today
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
        loadingButtonTitle={`${
          id ? "Updating" : "Creating"
        } Coupon please wait...`}
      />
    </form>
  );
}