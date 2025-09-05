
import PageHeader from "@/components/backoffice/PageHeader";
import type { Product } from "@/types/Product";
import {DataTable} from "@/components/data-table-components/DataTable";


import React from "react";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
export default async function page() {
 const products: Product[] = await getData("products");
  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Products"
        href="/dashboard/products/new"
        linkTitle="Add Product"
      />

      <div className="py-0">
       <DataTable columns={columns} data={products}  />;
      </div>
    </div>
  );
}
