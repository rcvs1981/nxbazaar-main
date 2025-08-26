import { columns } from "./columns";
import { DataTable } from "@/components/data-table-components/DataTable";
import { getData } from "@/lib/getData";
import { Customer } from "@/types/Customers";

export default async function Customers() {
  const customers = await getData<Customer[]>("customers");

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Customers</h1>
      <DataTable
        columns={columns}
        data={customers}
        filterKeys={["name", "email", "role"]}
      />
    </div>
  );
}
