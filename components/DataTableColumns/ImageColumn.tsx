

"use client";

import Image from "next/image";
import { Row } from "@tanstack/react-table";

interface ImageColumnProps<T> {
  row: Row<T>;
  accessorKey: keyof T;
}

export default function ImageColumn<T>({
  row,
  accessorKey,
}: ImageColumnProps<T>) {
  const key = accessorKey as string;
  const value = row.getValue(key) as string | undefined;

  if (!value) {
    return (
      <div className="w-12 h-12 flex items-center justify-center bg-gray-100 text-muted-foreground text-xs italic rounded">
        No image
      </div>
    );
  }

  return (
    <div className="w-12 h-12 relative rounded overflow-hidden">
      <Image
        src={value}
        alt="Item image"
        fill
        sizes="48px" // ✅ Important for "fill" layout
        className="object-cover"
        placeholder="empty" // Optional: remove blur warning
      />
    </div>
  );
}
