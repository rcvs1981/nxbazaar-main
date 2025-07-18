// app/(dashboard)/dashboard/banners/page.tsx
import React from "react";
import PageHeader from "@/components/backoffice/PageHeader";
import { DataTable } from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
import { Banner } from "@/types/Banner"; // ✅ import the interface

export default async function Page() {
  const banners = await getData<Banner>("banners");

  return (
    <div>
      <PageHeader
        heading="Banners"
        href="/dashboard/banners/new"
        linkTitle="Add Banner"
      />
      <div className="py-8">
        <DataTable<Banner> data={banners} columns={columns} />
      </div>
    </div>
  );
}
