import { DataTable } from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import React from "react";
import { columns } from "./columns";
import { Sale } from "@/types/Sales";

export default async function Sales({ params }: { params: { id: string } }) {
  const allSales: Sale[] = await getData("sales");
  const farmerSales = allSales.filter((sale) => sale.vendorId === params.id);

  return <DataTable data={farmerSales} columns={columns} />;
}
