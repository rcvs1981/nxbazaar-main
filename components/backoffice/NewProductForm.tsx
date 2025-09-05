"use client";
  
import ArrayItemsInput from "@/components/FormInputs/ArrayItemsInput";
import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { generateUserCode } from "@/lib/generateUserCode";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MultipleImageInput from "../FormInputs/MultipleImageInput";

type NewProductFormProps = {
  categories: {
    id: string;
    name: string;
    subcategories?: { id: string; name: string }[];
  }[];
  
  updateData?: any;
};

export default function NewProductForm({
  categories,
  
  updateData = {},
}: NewProductFormProps) {
  //const initialImageUrl = updateData?.imageUrl ?? "";
  const initialTags = updateData?.tags ?? [];
  const id = updateData?.id ?? "";

  //const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [tags, setTags] = useState(initialTags);
  const [loading, setLoading] = useState(false);
  const [productImages, setProductImages] = useState<string[]>([]);

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isActive: true,
      isWholesale: false,
      ...updateData,
    },
  });

  const router = useRouter();

  const isWholesale = watch("isWholesale");
  

  // Dynamically filter subcategories based on chosen category
  


  async function onSubmit(data: any) {
    const slug = generateSlug(data.title);
    const productCode = generateUserCode("LLP", data.title);

    data.slug = slug;
    data.productImages = productImages;
    data.tags = tags;
    data.qty = 1;
    data.productCode = productCode;

    if (id) {
      await makePutRequest<NewProductFormProps>({
        setLoading,
        endpoint: `api/products/${id}`,
        data,
        resourceName: "Product",
        redirect: () => router.push("/dashboard/products"),
      });
    } else {
      await makePostRequest<NewProductFormProps>({
        setLoading,
        endpoint: "api/products",
        data,
        resourceName: "Product",
        reset: () => reset(),
        redirect: () => router.push("/dashboard/products"),
      });
    }

    setProductImages([]);
    setTags([]);
  };


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3 "
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {/* Product Info */}
        <TextInput label="Product Title" name="title" register={register} errors={errors} />
        <TextInput label="Product SKU" name="sku" register={register} errors={errors} />
        <TextInput label="Product Barcode" name="barcode" register={register} errors={errors} />

        {/* Prices & Stock */}
        <TextInput label="Product Price (Before Discount)" name="productPrice" type="number" register={register} errors={errors} />
        <TextInput label="Product Sale Price (Discounted)" name="salePrice" type="number" register={register} errors={errors} />
        <TextInput label="Product Stock" name="productStock" type="number" register={register} errors={errors} />
        <TextInput label="Unit of Measurement (e.g. Kilograms)" name="unit" register={register} errors={errors} />

        {/* Category & Subcategory */}
        <SelectInput
         label="Select Category"
          name="categoryId"
           register={register}
            errors={errors} 
            options={categories} />
            
      
          <SelectInput
  label="Select Subcategory"
   name="subCategoryId"
   register={register}
   errors={errors}
   className="w-full"
   options={
    categories
      
      
   }
/>
        

       

        {/* Wholesale Toggle */}
        <ToggleInput label="Supports Wholesale Selling" name="isWholesale" trueTitle="Supported" falseTitle="Not Supported" register={register} />
        {isWholesale && (
          <>
            <TextInput label="Wholesale Price" name="wholesalePrice" type="number" register={register} errors={errors} />
            <TextInput label="Minimum Wholesale Qty" name="wholesaleQty" type="number" register={register} errors={errors} />
          </>
        )}

        {/* Images */} 
        <MultipleImageInput
          imageUrls={productImages}
          setImageUrls={setProductImages}
          endpoint="multipleProductsUploader"
          label="Product Images"
        />

        {/* Tags */}
        <ArrayItemsInput setItems={setTags} items={tags} itemTitle="Tag" />

        {/* Description */}
        <TextareaInput label="Product Description" name="description" register={register} errors={errors} />

        {/* Active / Draft */}
        <ToggleInput label="Publish your Product" name="isActive" trueTitle="Active" falseTitle="Draft" register={register} />
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle={id ? "Update Product" : "Create Product"}
        loadingButtonTitle={`${id ? "Updating" : "Creating"} Product please wait...`}
      />
    </form>
  );
}

