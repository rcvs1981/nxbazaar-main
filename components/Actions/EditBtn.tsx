// components/Actions/EditBtn.tsx
import { Pencil } from "lucide-react";
import Link from "next/link";
import React from "react";

interface UpdateOptions {
  title: string;
  editEndpoint: string;
  className?: string;
  onSuccess?: () => void; // Add this line
}

export default function EditBtn({
  title,
  editEndpoint,
  className = "",
  onSuccess
}: UpdateOptions) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const handleClick = (e: React.MouseEvent) => {
    if (onSuccess) {
      e.preventDefault();
      onSuccess();
    }
    // Otherwise, proceed with default link behavior
  };

  return (
    <Link
      href={`${baseUrl}/dashboard/${editEndpoint}`}
      className={`flex items-center text-lime-600 hover:text-lime-700 ${className}`}
      onClick={handleClick}
    >
      <Pencil className="mr-2 w-4 h-4" />
      <span>Edit {title}</span>
    </Link>
  );
}