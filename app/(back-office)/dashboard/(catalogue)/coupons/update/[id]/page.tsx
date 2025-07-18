import FormHeader from "@/components/backoffice/FormHeader";
import CouponForm from "@/components/backoffice/Forms/CouponForm";
import { getData } from "@/lib/getData";
import type { Coupon } from "@/types/Coupon";
import type { Metadata } from "next";
import React from "react";

// ✅ Optionally add page metadata
export const metadata: Metadata = {
  title: "Update Coupon",
};

interface UpdateCouponPageProps {
  params: {
    id: string;
  };
}

export default async function UpdateCoupon({ params }: UpdateCouponPageProps) {
  const coupon = await getData<Coupon>(`coupons/${params.id}`);

  return (
    <div>
      <FormHeader title="Update Coupon" />
      <CouponForm updateData={coupon} />
    </div>
  );
}
