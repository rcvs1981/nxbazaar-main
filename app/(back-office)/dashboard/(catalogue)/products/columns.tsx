"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import DateColumn from "@/components/DataTableColumns/DateColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";

// ✅ Define your product type based on your schema
export type ProductType = {
  id: string;
  title: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductType>[] = [
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
  header: "Product Image",
  cell: ({ row }) => <ImageColumn row={row} accessorKey="imageUrl" />,
},
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => (
      <div>{row.getValue("isActive") ? "✅" : "❌"}</div>
    ),
  },
 {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
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
