"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

import ArrayItemsInput from "@/components/FormInputs/ArrayItemsInput";
import SelectInput from "@/components/FormInputs/SelectInput";
import SubmitButton from "@/components/FormInputs/SubmitButton";
import TextareaInput from "@/components/FormInputs/TextAreaInput";
import TextInput from "@/components/FormInputs/TextInput";
import ToggleInput from "@/components/FormInputs/ToggleInput";
import MultipleImageInput from "@/components/FormInputs/MultipleImageInput";

import { makePostRequest, makePutRequest } from "@/lib/apiRequest";
import { generateSlug } from "@/lib/generateSlug";
import { generateUserCode } from "@/lib/generateUserCode";

// ✅ Types
type Category = { id: string; title: string };
type SubCategory = { id: string; title: string; categoryId: string };
type Farmer = { id: string; title: string };
interface NewProductFormProps {
  farmers: Farmer[];
}
export interface ProductFormValues extends Record<string, any> {
  id?: string;
  title: string;
  sku: string;
  barcode: string;
  productPrice: number;
  salePrice: number;
  productStock: number;
  unit: string;
  categoryId: string;
  subCategoryId: string;
  farmerId: string;
  wholesalePrice?: number;
  wholesaleQty?: number;
  description?: string;
  isActive: boolean;
  isWholesale: boolean;
  slug?: string;
  productCode?: string;
  qty?: number;
  productImages?: string[];
  tags?: string[];
  price: number;
  
}

interface NewProductFormProps {
  categories: Category[];
  subcategories: SubCategory[];
  farmers: Farmer[];
  updateData?: Partial<ProductFormValues>;
}

export default function NewProductForm({
  categories,
  subcategories,
  farmers,
  updateData = {},
}: NewProductFormProps) {
  const id = updateData?.id ?? "";
  const [tags, setTags] = useState<string[]>(updateData?.tags ?? []);
  const [loading, setLoading] = useState(false);
  const [productImages, setProductImages] = useState<string[]>(
    updateData?.productImages ?? []
  );

  const router = useRouter();

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

  const isWholesale = watch("isWholesale");
  const selectedCategoryId = watch("categoryId");

  // ✅ Filter subcategories based on selected category
  const filteredSubcategories = useMemo(
    () =>
      subcategories.filter((sc) => sc.categoryId === selectedCategoryId),
    [subcategories, selectedCategoryId]
  );

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    data.slug = generateSlug(data.title);
    data.productCode = generateUserCode("LLP", data.title);
    data.qty = 1;
    data.productImages = productImages;
    data.tags = tags;

    if (id) {
      await makePutRequest<ProductFormValues>({
        setLoading,
        endpoint: `api/products/${id}`,
        data,
        resourceName: "Product",
        redirect: () => router.push("/dashboard/products"),
      });
    } else {
      await makePostRequest<ProductFormValues>({
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
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {/* Product Info */}
        <TextInput label="Product Title" name="title" register={register} errors={errors} />
        <TextInput label="Product SKU" name="sku" register={register} errors={errors} />
        <TextInput label="Product Barcode" name="barcode" register={register} errors={errors} />
        <TextInput label="Product Price (Before Discount)" name="productPrice" type="number" register={register} errors={errors} />
        <TextInput label="Product Sale Price (Discounted)" name="salePrice" type="number" register={register} errors={errors} />
        <TextInput label="Product Stock" name="productStock" type="number" register={register} errors={errors} />
        <TextInput label="Unit of Measurement (eg: Kilograms)" name="unit" register={register} errors={errors} />

        {/* Category */}
        <SelectInput<ProductFormValues>
          label="Select Category"
          name="categoryId"
          register={register}
          errors={errors}
          options={categories}
        />

        {/* Subcategory */}
        <SelectInput<ProductFormValues>
          label="Select Subcategory"
          name="subCategoryId"
          register={register}
          errors={errors}
          options={filteredSubcategories}
        />

        {/* Farmer */}
        <SelectInput<ProductFormValues>
          label="Select Farmer"
          name="farmerId"
          register={register}
          errors={errors}
          options={farmers}
        />

        {/* Wholesale */}
        <ToggleInput
          label="Supports Wholesale Selling"
          name="isWholesale"
          trueTitle="Supported"
          falseTitle="Not Supported"
          register={register}
        />

        {isWholesale && (
          <>
            <TextInput label="Wholesale Price" name="wholesalePrice" type="number" register={register} errors={errors} />
            <TextInput label="Minimum Wholesale Qty" name="wholesaleQty" type="number" register={register} errors={errors} />
          </>
        )}

        {/* Images + Tags */}
        <MultipleImageInput
          imageUrls={productImages}
          setImageUrls={setProductImages}
          endpoint="multipleProductsUploader"
          label="Product Images"
        />

        <ArrayItemsInput setItems={setTags} items={tags} itemTitle="Tag" />

        {/* Description */}
        <TextareaInput label="Product Description" name="description" register={register} errors={errors} />

        {/* Status */}
        <ToggleInput
          label="Publish your Product"
          name="isActive"
          trueTitle="Active"
          falseTitle="Draft"
          register={register}
        />
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle={id ? "Update Product" : "Create Product"}
        loadingButtonTitle={`${id ? "Updating" : "Creating"} Product please wait...`}
      />
    </form>
  );
}
