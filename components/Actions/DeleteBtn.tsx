// components/Actions/DeleteBtn.tsx
import React from "react";

interface DeleteBtnProps {
  title: string;
  endpoint: string;
  className?: string;
  onSuccess?: () => void;
}

export default function DeleteBtn({
  title,
  endpoint,
  className = "",
  onSuccess
}: DeleteBtnProps) {
  const handleDelete = async () => {
    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
      });
      if (response.ok) {
        onSuccess?.();
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className={`text-destructive ${className}`}
    >
      Delete {title}
    </button>
  );
}