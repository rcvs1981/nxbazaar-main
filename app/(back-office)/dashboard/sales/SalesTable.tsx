"use client";

import { DataTable } from "@/components/data-table-components/DataTable";
import { columns } from "./columns";
import { Sale } from "@/types/Sales";

export default function SalesTable({ data }: { data: Sale[] }) {
  return <DataTable data={data} columns={columns} />;
}
