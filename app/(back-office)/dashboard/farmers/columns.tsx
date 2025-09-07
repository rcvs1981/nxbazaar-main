"use client";

import { Checkbox } from "@/components/ui/checkbox";
import DateColumn from "@/components/DataTableColumns/DateColumn";

import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import Status from "@/components/DataTableColumns/Status";
import { ColumnDef } from "@tanstack/react-table";

// ✅ Define the type for your data (Farmer/User)
export type Farmer = {
  id: string;
  name: string;
  email: string;
  role: string;
  plan: string;
  status: string;
  createdAt: string; // or Date if your API returns real dates
  profileImageUrl?: string | null;
  isActive?: boolean;
};

export const columns: ColumnDef<Farmer>[] = [
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
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} title="Name" />,
  },
  // Optional profile image column
  // {
  //   accessorKey: "profileImageUrl",
  //   header: "Profile Image",
  //   cell: ({ row }) => (
  //     <ImageColumn row={row} accessorKey="profileImageUrl" />
  //   ),
  // },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "plan",
    header: "Plan",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <Status row={row} accessorKey="status" />,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const farmer = row.original; // ✅ now fully typed as Farmer
      return (
        <ActionColumn
          row={row}
          title="Farmer"
          editEndpoint={`farmers/update/${farmer.id}`}
          endpoint={`farmers/${farmer.id}`}
        />
      );
    },
  },
];
