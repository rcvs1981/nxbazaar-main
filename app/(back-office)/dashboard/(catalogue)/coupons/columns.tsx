"use client";
import { Checkbox } from "@/components/ui/checkbox";
import SortableColumn from "@/components/DataTableColumns/SortableColumn";
import type { Coupon } from "@/types/Coupon";
import DateColumn from "@/components/DataTableColumns/DateColumn";
import ActionColumn from "@/components/DataTableColumns/ActionColumn";
import type { ColumnDef } from "@tanstack/react-table";
export const columns: ColumnDef<Coupon>[] = [
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
    accessorKey: "couponCode",
    header: "Coupon Code",
  },
{
  accessorKey: "expiryDate",
  header: "Expiry Date",
  cell: ({ row }) => <DateColumn row={row} accessorKey="expiryDate" />,
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
   const coupon = row.original;
    return (
     <ActionColumn
  row={row}
    title="Coupon"
          editEndpoint={`coupons/update/${coupon.id}`}
          endpoint={`coupons/${coupon.id}`}
/>
    );
  },
  },
];
