"use client";

import NewFarmerForm from "@/components/backoffice/NewFarmerForm";
import FormHeader from "@/components/backoffice/FormHeader";

export default function NewFarmer() {
  return (
    <div>
      <FormHeader title="New Farmer" />
      <NewFarmerForm />
    </div>
  );
}
