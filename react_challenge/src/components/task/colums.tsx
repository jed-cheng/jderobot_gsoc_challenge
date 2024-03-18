"use client"

import { Task } from "@/lib/schema"
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
]
