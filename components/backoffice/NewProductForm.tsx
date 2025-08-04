"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm} from "react-hook-form";

import ArrayItemsInput from "@/components/FormInputs/ArrayItemsInput";
import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import MultipleImageInput from "@/components/FormInputs/MultipleImageInput";
import type { Option } from "@/types/Option";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { generateUserCode } from "@/lib/generateUserCode";



export type ProductFormValues = {
  id?: string;
  title: string;
  sku?: string;
  barcode?: string;
  productPrice: number;
  salePrice: number;
  productStock: number;
  unit?: string;
  categoryId: string;
  farmerId: string;
  description?: string;
  isActive: boolean;
  isWholesale: boolean;
  wholesalePrice?: number;
  wholesaleQty?: number;
  slug?: string;
  tags?: string[];
  productImages?: string[];
  productCode?: string;
  qty?: number;
};


type Props = {
   categories: Option[];
  farmers: Option[];
  updateData?: Partial<ProductFormValues>;
};

export default function NewProductForm({
  
  categories,
  farmers,
  updateData = {},
}: Props) {
  const id = updateData?.id ?? "";
  const initialImageUrl = updateData?.productImages ?? [];
  const initialTags = updateData?.tags ?? [];

  const [imageUrls, setImageUrls] = useState<string[]>(initialImageUrl);
  
  const [tags, setTags] = useState<string[]>(initialTags);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: {
      isActive: true,
      isWholesale: false,
      ...updateData,
    },
  });

  const isActive = watch("isActive");
  const isWholesale = watch("isWholesale");

  const router = useRouter();


async function onSubmit(data:ProductFormValues) {
    const slug = generateSlug(data.title);
    const productCode = generateUserCode("LLP", data.title);
    data.slug = slug;
  
    data.tags = tags;
    data.qty = 1;
    data.productCode = productCode;
    console.log(data);
if (id) {
  data.id = id;

  await makePutRequest<ProductFormValues>({
    setLoading,
    endpoint: `api/products/${id}`,
    data,
    resourceName: "Product",
    reset: () => reset(),
    redirect: () => router.push("/dashboard/products"),
  });

  console.log("Update Request: ", data);
} else {
 await makePostRequest<ProductFormValues>({
    setLoading,
    endpoint: "api/products",
    data,
    resourceName: "Product",
    reset: () => reset(),
    redirect: () => router.push("/dashboard/products"),
  });

  console.log("Update Request: ", data);
};
     
      setTags([]);
    
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        <TextInput
          label="Product Title"
          name="title"
          register={register}
          errors={errors}
        />
        <TextInput
          label="Product SKU"
          name="sku"
          register={register}
          errors={errors}
        />
        <TextInput
          label="Product Barcode"
          name="barcode"
          register={register}
          errors={errors}
        />
        <TextInput
          label="Product Price (Before Discount)"
          name="productPrice"
          type="number"
          register={register}
          errors={errors}
        />
        <TextInput
          label="Product Sale Price(Discounted)"
          name="salePrice"
          type="number"
          register={register}
          errors={errors}
        />
        <TextInput
          label="Product Stock"
          name="productStock"
          type="number"
          register={register}
          errors={errors}
        />
        <TextInput
          label="Unit of Measurement(eg Kilograms)"
          name="unit"
          register={register}
          errors={errors}
        />
   <SelectInput<ProductFormValues>
  label="Select Category"
  name="categoryId"
  options={categories}
  register={register}
  errors={errors}
/>

<SelectInput<ProductFormValues>
  label="Select Farmer"
  name="farmerId"
  options={farmers}
  register={register}
  errors={errors}
/>

        <ToggleInput
          label="Supports Wholesale Selling"
          name="isWholesale"
          trueTitle="Supported"
          falseTitle="Not Supported"
          register={register}
          
        />

        {isWholesale && (
          <>
            <TextInput
              label="Wholesale Price"
              name="wholesalePrice"
              type="number"
              register={register}
              errors={errors}
            />
            <TextInput
              label="Minimum Wholesale Qty"
              name="wholesaleQty"
              type="number"
              register={register}
              errors={errors}
            />
          </>
        )}

    <MultipleImageInput
  label="Upload Product Images"
  imageUrls={imageUrls}
  setImageUrls={setImageUrls}
  endpoint="multipleProductsUploader"
/>

        <ArrayItemsInput setItems={setTags} items={tags} itemTitle="Tag" />

        <TextareaInput
          label="Product Description"
          name="description"
          register={register}
          errors={errors}
        />

        <ToggleInput
          label="Publish your Product"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
        {!isActive && <p>This item is inactive</p>}
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle={id ? "Update Product" : "Create Product"}
        loadingButtonTitle={`${
          id ? "Updating" : "Creating"
        } Product please wait...`}
      />
    </form>
  );
}
