"use client";

import Image from "next/image";
import { Row } from "@tanstack/react-table";
import React from "react";

interface ImageColumnProps<TData> {
  row: Row<TData>;
  accessorKey: keyof TData;
  width?: number;
  height?: number;
}

export default function ImageColumn<TData>({
  row,
  accessorKey,
  width = 40,
  height = 40,
}: ImageColumnProps<TData>) {
  const imageUrl =
    typeof accessorKey === "string"
      ? (row.getValue(accessorKey) as string | undefined)
      : undefined;

  return (
    <div className="shrink-0">
      {imageUrl ? (
        <Image
          src={imageUrl}
          width={width}
          height={height}
          alt={accessorKey.toString()}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
          N/A
        </div>
      )}
    </div>
  );
}
