
import PageHeader from "@/components/backoffice/PageHeader";
import type { Category } from "@/types/category";
import {DataTable} from "@/components/data-table-components/DataTable";


import React from "react";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
export default async function page() {
 const categories: Category[] = await getData("categories");
  return (
    <div>
      {/* Header */}
      <PageHeader
        heading="Categories"
        href="/dashboard/categories/new"
        linkTitle="Add Category"
      />

      <div className="py-0">
       <DataTable columns={columns} data={categories}  />;
      </div>
    </div>
  );
}
