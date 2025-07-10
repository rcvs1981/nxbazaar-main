"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import DeleteBtn from "../Actions/DeleteBtn";
import EditBtn from "../Actions/EditBtn";
import type { Row } from "@tanstack/react-table";

interface ActionColumnProps<T> {
  row: Row<T>;
  title: string;
  endpoint: string;
  editEndpoint: string;
}

const ActionColumn = <T,>({
  
  title,
  endpoint,
  editEndpoint,
}: ActionColumnProps<T>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <DeleteBtn title={title} endpoint={endpoint} />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <EditBtn title={title} editEndpoint={editEndpoint} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionColumn;
