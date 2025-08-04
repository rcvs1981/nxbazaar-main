

import PageHeader from "@/components/backoffice/PageHeader";
import React from "react";
import { columns } from "./columns";
import { getData } from "@/lib/getData";
import { DataTable } from "@/components/data-table-components/DataTable";
import { Training } from "@/types/Training"; // ✅ Define this if not already

export default async function Page() {
 const trainings = (await getData<Training[]>("trainings")) ?? [];
  return (
    <div>
      {/* Page Header */}
      <PageHeader
        heading="Community Trainings"
        href="/dashboard/community/new"
        linkTitle="Add Training"
      />

      {/* Table */}
      <div className="py-0">
         <DataTable data={trainings} columns={columns} />
      </div>
    </div>
  );
}
