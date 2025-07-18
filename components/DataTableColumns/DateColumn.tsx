"use client";

import { format } from "date-fns";
import type { Row } from "@tanstack/react-table";

export interface DateColumnProps<TData> {
  row: Row<TData>;
  accessorKey: keyof TData;
}

export default function DateColumn<TData>({ row, accessorKey }: DateColumnProps<TData>) {
  const rawValue = row.original[accessorKey];

  const date = rawValue ? new Date(rawValue as string) : null;

  return <div>{date ? format(date, "dd MMM yyyy") : "—"}</div>;
}
