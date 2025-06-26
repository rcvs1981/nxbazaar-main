"use client";

import React from "react";
import { Row } from "@tanstack/react-table";

interface DateColumnProps<TData> {
  row: Row<TData>;
  accessorKey: keyof TData;
}

export default function DateColumn<TData>({ row, accessorKey }: DateColumnProps<TData>) {
  const rawValue =
 
    typeof accessorKey === "string"
      ? (row.getValue(accessorKey) as string | undefined)
      : undefined;
  if (!rawValue) return <div className="text-muted-foreground">No date</div>;

  const date = new Date(rawValue as string);
  if (isNaN(date.getTime())) return <div className="text-red-500">Invalid date</div>;

  const formatted = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);

  return <div>{formatted}</div>;
}
