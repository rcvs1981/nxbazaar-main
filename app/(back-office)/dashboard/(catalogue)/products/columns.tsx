"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@/types/Product"; 
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import DateColumn from "@/components/DataTableColumns/DateColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";


export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
  },
  {
    accessorKey: "imageUrl",
    header: "Category Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="imageUrl" />,
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return <div>{isActive ? "Yes" : "No"}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => (
      <DateColumn row={row} accessorKey="createdAt" />
    ),
  },
 {
  id: "actions",
  cell: ({ row }) => {
    const product = row.original;
    return (
        <ActionColumn
          row={row}
          title="Product"
          editEndpoint={`products/update/${product.id}`}
          endpoint={`products/${product.id}`}
        />
      );
    },
  },
];
