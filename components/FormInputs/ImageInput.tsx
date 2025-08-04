'use client';

import { UploadDropzone } from "@/lib/uploadthing";
import { Pencil } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

type UploadthingEndpoint =
  | "categoryImageUploader"
  | "bannerImageUploader"
  | "farmerProfileUploader"
  | "marketLogoUploader"
  | "trainingImageUploader";

interface ImageInputProps {
  label: string;
  imageUrl?: string;
  setImageUrlAction: (url: string) => void;
  className?: string;
  endpoint: UploadthingEndpoint;
}

export default function ImageInput({
  imageUrl,
  setImageUrlAction,
  endpoint,
  label,
  className,
}: ImageInputProps) {
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50">
          {label}
        </label>
        {imageUrl && (
          <button
            onClick={() => setImageUrlAction("")}
            type="button"
            className="flex items-center space-x-2 bg-slate-900 text-white px-4 py-2 rounded-md"
          >
            <Pencil className="w-5 h-5" />
            <span>Change Image</span>
          </button>
        )}
      </div>

      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="Uploaded image"
          width={1000}
          height={667}
          className="w-full h-64 object-contain"
        />
      ) : (
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            setImageUrlAction(res[0].url);
            toast.success("Image uploaded");
          }}
          onUploadError={(error) => {
            toast.error("Upload failed");
            console.error("Upload Error:", error);
          }}
        />
      )}
    </div>
  );
}
