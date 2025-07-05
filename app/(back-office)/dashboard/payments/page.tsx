import { columns, Payment } from "./columns";
import { getData } from "@/lib/getData";
import { DataTable } from "./data-table";

export default async function DemoPage() {
  const data: Payment[] = await getData("categories");

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
