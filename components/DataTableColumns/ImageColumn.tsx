// components/DataTableColumns/ImageColumn.tsx

import Image from "next/image";
import { Row } from "@tanstack/react-table";

interface ImageColumnProps<T> {
  row: Row<T>;
  accessorKey: keyof T;
}

export default function ImageColumn<T>({ row, accessorKey }: ImageColumnProps<T>) {
  const key = accessorKey as string; // ✅ Cast to string to avoid TS error
  const value = row.getValue(key) as string | undefined;

  if (!value) {
    return <div className="text-muted-foreground text-xs italic">No image</div>;
  }

  return (
    <div className="w-12 h-12 relative rounded overflow-hidden">
      <Image src={value} alt="Image" fill className="object-cover" />
    </div>
  );
}
