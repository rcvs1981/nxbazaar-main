"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ImageColumn from "@/components/DataTableColumns/ImageColumn";
import DateColumn from "@/components/DataTableColumns/DateColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";

type SubCategory = {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  description?: string;
  isActive: boolean;
  categoryId: string;
  category?: {
    id: string;
    title: string;
  };
  createdAt: string;
  updatedAt?: string;
};

export const columns: ColumnDef<SubCategory>[] = [
  // ✅ Row selection
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

  // ✅ Title
  {
    accessorKey: "title",
    header: ({ column }) => <SortableColumn column={column} title="Title" />,
  },

  // ✅ Category Title (show category relation)
  {
    accessorKey: "category.title",
    header: ({ column }) => (
      <SortableColumn column={column} title="Parent Category" />
    ),
    cell: ({ row }) => {
      const category = row.original.category;
      return <span>{category?.title ?? "—"}</span>;
    },
  },

  // ✅ Image
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => <ImageColumn row={row} accessorKey="imageUrl" />,
  },

  // ✅ Active Status
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean;
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {isActive ? "Yes" : "No"}
        </span>
      );
    },
  },

  // ✅ Created Date
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },

  // ✅ Actions
  {
    id: "actions",
    cell: ({ row }) => {
      const subcategory = row.original;
      return (
        <ActionColumn
          row={row}
          title="SubCategory"
          editEndpoint={`/subcategories/update/${subcategory?.id}`}
          endpoint={`/subcategories/${subcategory?.id}`}
        />
      );
    },
  },
];
