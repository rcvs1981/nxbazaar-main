"use client";

import React, { useState, useTransition } from "react";
import toast from "react-hot-toast";

interface StatusProps {
  row: {
    getValue: (key: string) => boolean;
    original: { id: string };
  };
  accessorKey: string;
}

export default function Status({ row, accessorKey }: StatusProps) {
  const savedStatus = row.getValue(accessorKey);
  const userId = row.original.id;

  const [status, setStatus] = useState<boolean>(savedStatus);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value === "true";
    setStatus(newStatus);

    const data = {
      status: newStatus,
      emailVerified: true,
    };

    startTransition(async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const response = await fetch(`${baseUrl}/api/farmers/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          toast.success("Farmer status updated successfully");
        } else {
          toast.error("Failed to update status");
        }
      } catch (error) {
        console.error("Error updating status:", error);
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <div>
      {isPending ? (
        <p className="text-sm text-muted-foreground">Updating...</p>
      ) : (
        <select
          id="status"
          className="bg-gray-50 border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white focus:outline-none"
          style={{ borderColor: status ? "green" : "red" }}
          value={status.toString()}
          onChange={handleChange}
        >
          <option value="true">APPROVED</option>
          <option value="false">PENDING</option>
        </select>
      )}
    </div>
  );
}
