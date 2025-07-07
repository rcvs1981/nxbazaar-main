// components/DataTableColumns/DateColumn.tsx

import { Row } from "@tanstack/react-table";
import { format } from "date-fns"; // make sure date-fns is installed

interface DateColumnProps<T> {
  row: Row<T>;
  accessorKey: keyof T;
}

export default function DateColumn<T>({ row, accessorKey }: DateColumnProps<T>) {
  const key = accessorKey as string;
  const rawValue = row.getValue(key) as string | Date | undefined;

  if (!rawValue) return <span className="text-xs italic text-muted-foreground">No date</span>;

  const date =
    typeof rawValue === "string" ? new Date(rawValue) : rawValue;

  return (
    <span className="text-sm text-muted-foreground">
      {format(date, "dd MMM yyyy")}
    </span>
  );
}
