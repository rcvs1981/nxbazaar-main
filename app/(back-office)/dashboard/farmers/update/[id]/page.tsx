import React from "react";
import FormHeader from "@/components/backoffice/FormHeader";
import { NewFarmerForm } from "@/components/backoffice/NewFarmerForm";
import { getData } from "@/lib/getData";

// ✅ Define the type for params
interface UpdateFarmerPageProps {
  params: {
    id: string;
  };
}

export default async function UpdateFarmer({ params }: UpdateFarmerPageProps) {
  const { id } = params;

  // Fetch farmer details
  const farmer = await getData(`farmers/${id}`);

  return (
    <div>
      <FormHeader title="Update Farmer" />
      {/* Pass initial data to form */}
      <NewFarmerForm initialData={farmer} />
    </div>
  );
}
