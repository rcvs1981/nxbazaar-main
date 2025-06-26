"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import DeleteBtn from "../Actions/DeleteBtn";
import EditBtn from "../Actions/EditBtn";
import { Row } from "@tanstack/react-table";
import { ProductType } from "../../types";

type ActionColumnProps = {
  row: Row<ProductType>;
  title: string;
  endpoint: string;      // base endpoint like 'products'
  editEndpoint: string;  // base edit path like 'products/update'
};

export default function ActionColumn({
  row,
  title,
  endpoint,
  editEndpoint,
}: ActionColumnProps) {
  const product = row.original;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <DeleteBtn title={`${title} (${product.title})`} endpoint={`${endpoint}/${product.id}`} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <EditBtn title={title} editEndpoint={`${editEndpoint}/${product.id}`} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
