import PageHeader from "@/components/backoffice/PageHeader";
import { DataTable } from "@/components/data-table-components/DataTable";
import React from "react";
import { getData } from "@/lib/getData";
import { columns } from "./columns";

// Define the type inline
type SubCategory = {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  description?: string;
  isActive: boolean;
  categoryId: string;
  category: {
    id: string;
    title: string;
  };
  createdAt: string;
  updatedAt?: string;
};

export default async function Page() {
  // ✅ Make sure fetch works with App Router conventions
  const subcategories: SubCategory[] =
    (await getData("subcategories?includeCategory=true")) ?? [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        heading="Sub-Categories"
        href="/dashboard/subcategories/new"
        linkTitle="Add Sub-Category"
      />

      {/* Table */}
      <div className="py-0">
        <DataTable columns={columns} data={subcategories} />
      </div>
    </div>
  );
}
