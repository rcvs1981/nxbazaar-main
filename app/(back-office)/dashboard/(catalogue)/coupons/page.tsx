import React from "react";
import PageHeader from "@/components/backoffice/PageHeader";
import { DataTable } from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
import {Coupon} from "@/types/Coupon"


export default async function Coupons() {
  let allCoupons: Coupon[] = [];

  try {
    allCoupons = await getData("coupons");
  } catch (error) {
    console.error("Error fetching coupons:", error);
  }

  return (
    <div>
      <PageHeader
        heading="Coupons"
        href="/dashboard/coupons/new"
        linkTitle="Add Coupon"
      />
      <div className="py-8">
        <DataTable data={allCoupons} columns={columns} />
      </div>
    </div>
  );
}
