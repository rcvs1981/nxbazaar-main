'use client';

import { UploadDropzone } from "@/lib/uploadthing";
import { XCircle } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import React from "react";


interface MultipleImageInputProps {
  label: string;
  imageUrls: string[];
  setImageUrlsAction: (urls: string[]) => void;
  className?: string;
  endpoint: string;
}
export default function MultipleImageInput({
  label,
  imageUrls,
  setImageUrlsAction,
  className = "col-span-full",
  endpoint,
}: MultipleImageInputProps) {
  function handleImageRemove(index: number) {
    const updated = imageUrls.filter((_, i) => i !== index);
    setImageUrlsAction(updated);
  }
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="multiple-image-input"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2"
        >
          {label}
        </label>
      </div>

      {imageUrls.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imageUrls.map((url, i) => (
            <div key={i} className="relative mb-6">
              <button
                type="button"
                onClick={() => handleImageRemove(i)}
                className="absolute -top-4 -right-2 bg-slate-100 text-slate-900 rounded-full"
              >
                <XCircle />
              </button>
              <Image
                src={url}
                alt={`Image ${i + 1}`}
                width={1000}
                height={667}
                className="w-full h-32 object-cover rounded"
              />
            </div>
          ))}
        </div>
      ) : (
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            const urls = res.map((item) => item.url);
            setImageUrls(urls);
            toast.success("Images uploaded successfully!");
          }}
          onUploadError={(error) => {
            toast.error("Image Upload Failed, Try Again");
            console.error("Upload Error:", error);
          }}
        />
      )}
    </div>
  );
}
