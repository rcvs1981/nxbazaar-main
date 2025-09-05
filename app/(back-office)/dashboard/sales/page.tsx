import React from "react";
import { DataTable } from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns, Sale } from "./columns";

export default async function Sales() {
  const allSales: Sale[] = await getData("sales");

  return (
    <div className="py-8">
    <DataTable data={allSales} columns={columns} filterKeys={["productTitle"]} />
    </div>
  );
}
