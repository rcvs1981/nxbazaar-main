import React from "react";
import FormHeader from "@/components/backoffice/FormHeader";
import BannerForm from "@/components/backoffice/Forms/BannerForm";
import { getData } from "@/lib/getData";
import { notFound } from "next/navigation";

interface UpdateBannerPageProps {
  params: {
    id: string;
  };
}

export default async function UpdateBanner({ params }: UpdateBannerPageProps) {
  const banner = await getData(`banners/${params.id}`);

  if (!banner) {
    notFound(); // shows 404 page
  }

  return (
    <div>
      <FormHeader title="Update Banner" />
      <BannerForm updateData={banner} />
    </div>
  );
}
