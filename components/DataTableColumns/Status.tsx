"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

interface StatusProps {
  row: {
    getValue: (key: string) => boolean | undefined;
    original: { id: string };
  };
  accessorKey: string;
}

export default function Status({ row, accessorKey }: StatusProps) {
  const savedStatus = row.getValue(accessorKey) ?? false; // fallback to false
  const userId = row.original.id;

  const [status, setStatus] = useState<boolean>(savedStatus);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value === "true";
    setStatus(newStatus);

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/farmers/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: newStatus,
            emailVerified: true,
          }),
        }
      );

      if (response.ok) {
        toast.success("Farmer status updated successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <p className="text-sm text-muted-foreground">Updating...</p>
  ) : (
    <select
      id="status"
      className={`bg-gray-50 border text-sm rounded-lg block w-full p-2.5
        dark:bg-gray-700 dark:text-white focus:outline-none
        ${status ? "border-green-500" : "border-red-500"}
      `}
      value={(status ?? false).toString()} // ✅ toString safe
      onChange={handleChange}
    >
      <option value="true">APPROVED</option>
      <option value="false">PENDING</option>
    </select>
  );
}
