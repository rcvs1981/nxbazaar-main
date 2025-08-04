import PageHeader from "@/components/backoffice/PageHeader";
import { DataTable } from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import React from "react";
import { columns } from "./columns";
import { Product } from "@/types/Product"; // 

export default async function Page() {
 const products:Product[] = await getData("products");

  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Products"
        href="/dashboard/products/new"
        linkTitle="Add Product"
      />

      <div className="py-8">
       <DataTable<Product> columns={columns} data={products} />
      </div>
    </div>
  );
}
