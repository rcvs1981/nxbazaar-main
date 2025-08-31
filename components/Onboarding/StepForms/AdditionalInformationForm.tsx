"use client";

import TextInput from "@/components/FormInputs/TextInput";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import NavButtons from "../NavButtons";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import ImageInput from "@/components/FormInputs/ImageInput";
import TextareaInput from "@/components/FormInputs/TextAreaInput";
import {
  setCurrentStep,
  updateOnboardingFormData,
} from "@/redux/slices/onboardingSlice";
import type { RootState, AppDispatch } from "@/redux/store";

// Define form input types
interface AdditionalInformationFormInputs {
  terms?: string;
  notes?: string;
  profileImageUrl?: string;
}

export default function AdditionalInformationForm() {
  const [imageUrl, setImageUrl] = useState<string>("");

  const currentStep = useSelector(
    (store: RootState) => store.onboarding.currentStep
  );

  const existingFormData = useSelector(
    (store: RootState) => store.checkout.checkoutFormData
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdditionalInformationFormInputs>({
    defaultValues: {
      ...existingFormData,
    },
  });

  const dispatch = useDispatch<AppDispatch>();

  const processData: SubmitHandler<AdditionalInformationFormInputs> = (
    data
  ) => {
    // Attach uploaded profile image URL
    data.profileImageUrl = imageUrl;

    // Update Redux form data
    dispatch(updateOnboardingFormData(data));

    // Move to next step
    dispatch(setCurrentStep(currentStep + 1));
  };

  return (
    <form onSubmit={handleSubmit(processData)}>
      <h2 className="text-xl font-semibold mb-4 dark:text-lime-400">
        Additional Information
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <ImageInput
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          endpoint="farmerProfileUploader"
          label="Farmer Profile Image"
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
      </div>
      <NavButtons />
    </form>
  );
}
