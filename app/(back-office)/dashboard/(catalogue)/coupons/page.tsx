
import PageHeader from "@/components/backoffice/PageHeader";

import {DataTable} from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";


import React from "react";
import { columns } from "./columns";

export default async function Coupons() {
  
 
  const allCoupons = await getData("coupons");
  
  return (
    <div>
      {/* Header */}
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
