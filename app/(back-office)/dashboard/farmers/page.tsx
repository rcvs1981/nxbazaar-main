import PageHeader from "@/components/backoffice/PageHeader";
import React from "react";
import { columns } from "./columns";
import { getData } from "@/lib/getData";
import { DataTable } from "@/components/data-table-components/DataTable";
import { User } from "@prisma/client";

type FarmerRow = Pick<User, "id" | "name" | "email" | "role" | "plan">;

export default async function Page() {
  // ✅ Fetch data safely with fallback
  const farmers: FarmerRow[] = (await getData<FarmerRow>("farmers")) || [];

  return (
    <div>
      <PageHeader
        heading="Farmers"
        href="/dashboard/farmers/new"
        linkTitle="Add Farmer"
      />

      <div className="py-0">
        <DataTable<FarmerRow>
          data={farmers}
          columns={columns}
          filterKeys={["name"]}
        />
      </div>
    </div>
  );
}
