"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Column } from "@tanstack/react-table";

interface SortableColumnProps<TData> {
  column: Column<TData, unknown>;
  title: string;
}

export default function SortableColumn<TData>({
  column,
  title,
}: SortableColumnProps<TData>) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
