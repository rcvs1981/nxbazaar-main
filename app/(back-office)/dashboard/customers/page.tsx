// app/dashboard/customers/page.tsx

import { DataTable } from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { columns } from "./columns";
import { Customer } from "@/types/Customers";

export default async function Customers() {
  const customers = await getData<Customer>("customers");

  return (
    <div className="py-8">
      <DataTable<Customer> data={customers} columns={columns} />
    </div>
  );
}
