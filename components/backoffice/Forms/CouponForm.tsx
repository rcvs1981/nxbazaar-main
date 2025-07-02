"use client";

import { useForm } from "react-hook-form";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { useRouter } from "next/navigation";
import { useState } from "react";

type CouponFormValues = {
  id?: string;
  title: string;
  couponCode: string;
  expiryDate: string;
  isActive: boolean;
};

function formatDateForInput(date: string | Date) {
  return new Date(date).toISOString().split("T")[0];
}

export default function CouponForm({ initialData }: { initialData?: CouponFormValues }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CouponFormValues>({
    defaultValues: initialData
      ? {
          ...initialData,
          expiryDate: formatDateForInput(initialData.expiryDate),
        }
      : {
          title: "",
          couponCode: "",
          expiryDate: "",
          isActive: true,
        },
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: CouponFormValues) => {
    if (initialData?.id) {
      await makePutRequest(setLoading, `api/coupons/${initialData.id}`, data, "Coupon", () =>
        router.push("/dashboard/coupons")
      );
    } else {
      await makePostRequest(setLoading, "api/coupons", data, "Coupon", reset, () =>
        router.push("/dashboard/coupons")
      );
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
          label="Coupon Code"
          name="couponCode"
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
        buttonTitle={initialData?.id ? "Update Coupon" : "Create Coupon"}
        loadingButtonTitle={`${
          initialData?.id ? "Updating" : "Creating"
        } Coupon please wait...`}
      />
    </form>
  );
}
