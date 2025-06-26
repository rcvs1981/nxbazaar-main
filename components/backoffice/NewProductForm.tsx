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

interface Category {
  id: string;
  title: string;
 
}

interface Farmer {
  id: string;
  name: string;
 
}

interface ProductFormData {
  id?: string;
  title: string;
  sku?: string;
  barcode?: string;
  productPrice: number;
  salePrice?: number;
  productStock: number;
  unit?: string;
  categoryId: string;
  farmerId?: string;
  isWholesale: boolean;
  wholesalePrice?: number;
  wholesaleQty?: number;
  description?: string;
  isActive: boolean;
  imageUrl?: string;
  tags?: string[];
  slug?: string;
  productCode?: string;
  qty?: number;
}

interface NewProductFormProps {
  categories: Category[];
  farmers?: Farmer[];
  updateData?: Partial<ProductFormData>;
}

export default function NewProductForm({
  categories,
  farmers = [],
  updateData = {},
}: NewProductFormProps) {
  const initialTags = updateData?.tags ?? [];
  const id = updateData?.id ?? "";
  const [tags, setTags] = useState<string[]>(initialTags);
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      isActive: true,
      isWholesale: false,
      ...updateData,
    },
  });

  const isWholesale = watch("isWholesale");
  const router = useRouter();
  const [productImages, setProductImages] = useState<string[]>([]);

  function redirect() {
    router.push("/dashboard/products");
  }

  async function onSubmit(data: ProductFormData) {
    const slug = generateSlug(data.title);
    const productCode = generateUserCode("LLP", data.title);
    
    const formData = {
      ...data,
      slug,
      productImages,
      tags,
      qty: 1,
      productCode,
      ...(id && { id }),
    };

    try {
      if (id) {
       await makePutRequest({
          setLoading,
          endpoint: `api/products/${id}`,
          data: formData,
          resourceName: "Product",
          redirect: redirect,
        });
      } else {
        await makePostRequest({
          setLoading,
          endpoint: "api/products",
          data: formData,
          resourceName: "Product",
          reset,
          redirect,
        });
        setProductImages([]);
        setTags([]);
      }
  } catch (error) {
      console.error("Form submission error:", error);
    }
  }
  

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto my-3"
    >
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
       <TextInput
  label="उत्पाद का शीर्षक"
  name="title"
  register={register}
  errors={errors}
  isRequired  // Changed from required to isRequired
/>
        <TextInput
          label="उत्पाद SKU"
          name="sku"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="उत्पाद बारकोड"
          name="barcode"
          register={register}
          errors={errors}
          className="w-full"
        />
        <TextInput
          label="उत्पाद मूल्य (छूट से पहले)"
          name="productPrice"
          type="number"
          register={register}
          errors={errors}
          className="w-full"
          isRequired  // Changed from required to isRequired
        />
        <TextInput
          label="उत्पाद बिक्री मूल्य (छूट के बाद)"
          name="salePrice"
          register={register}
          errors={errors}
          type="number"
          className="w-full"
        />
        <TextInput
          label="उत्पाद स्टॉक"
          name="productStock"
          register={register}
          errors={errors}
          type="number"
          className="w-full"
         isRequired  // Changed from required to isRequired
        />
        <TextInput
          label="माप की इकाई (जैसे किलोग्राम)"
          name="unit"
          register={register}
          errors={errors}
          className="w-full"
        />
        <SelectInput
          label="श्रेणी चुनें"
          name="categoryId"
          register={register}
          errors={errors}
          className="w-full"
          options={categories}
          required
        />
        {farmers && farmers.length > 0 && (
          <SelectInput
            label="किसान चुनें"
            name="farmerId"
            register={register}
            errors={errors}
            className="w-full"
            options={farmers}
          />
        )}
        <ToggleInput
          label="थोक बिक्री का समर्थन करता है"
          name="isWholesale"
          trueTitle="समर्थित"
          falseTitle="असमर्थित"
          register={register}
        />

        {isWholesale && (
          <>
            <TextInput
              label="थोक मूल्य"
              name="wholesalePrice"
              register={register}
              errors={errors}
              type="number"
              className="w-full"
            />
            <TextInput
              label="न्यूनतम थोक मात्रा"
              name="wholesaleQty"
              register={register}
              errors={errors}
              type="number"
              className="w-full"
            />
          </>
        )}

        <MultipleImageInput
          imageUrls={productImages}
          setImageUrls={setProductImages}
          endpoint="multipleProductsUploader"
          label="उत्पाद छवियाँ"
        />
        
        <ArrayItemsInput 
          setItems={setTags} 
          items={tags} 
          itemTitle="टैग" 
        />

        <TextareaInput
          label="उत्पाद विवरण"
          name="description"
          register={register}
          errors={errors}
        />
        <ToggleInput
          label="अपने उत्पाद को प्रकाशित करें"
          name="isActive"
          trueTitle="सक्रिय"
          falseTitle="ड्राफ्ट"
          register={register}
        />
      </div>

      <SubmitButton
        isLoading={loading}
        buttonTitle={id ? "उत्पाद अपडेट करें" : "उत्पाद बनाएं"}
        loadingButtonTitle={`${
          id ? "अपडेट किया जा रहा है" : "बनाया जा रहा है"
        } उत्पाद, कृपया प्रतीक्षा करें...`}
      />
    </form>
  );
}