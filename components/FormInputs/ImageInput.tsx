"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { Pencil } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

interface ImageInputProps {
  label: string;
  imageUrl?: string;
  setImageUrl: (url: string) => void;
  className?: string;
  endpoint: keyof OurFileRouter; // ✅ TYPE FIXED HERE
}

const ImageInput: React.FC<ImageInputProps> = ({
  label,
  imageUrl = "",
  setImageUrl,
  className = "col-span-full",
  endpoint,
}) => {
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="upload-image"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2"
        >
          {label}
        </label>
        {imageUrl && (
          <button
            onClick={() => setImageUrl("")}
            type="button"
            className="flex items-center space-x-2 bg-slate-900 rounded-md shadow text-white py-2 px-4"
          >
            <Pencil className="w-5 h-5" />
            <span>Change Image</span>
          </button>
        )}
      </div>

      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Uploaded"
          width={1000}
          height={667}
          className="w-full h-64 object-contain"
        />
      ) : (
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            const uploadedUrl = res?.[0]?.url;
            if (uploadedUrl) {
              setImageUrl(uploadedUrl);
              toast.success("Image uploaded successfully!");
              console.log("Upload Complete: ", res);
            }
          }}
          onUploadError={(error) => {
            toast.error("Image Upload Failed, Try Again");
            console.error("Upload Error:", error);
          }}
        />
      )}
    </div>
  );
};

export default ImageInput;
