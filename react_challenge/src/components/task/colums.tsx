"use client"

import { Task } from "@/lib/schema"
import { ColumnDef } from "@tanstack/react-table"


export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: "Title",
    filterFn: (row, id, value) => {
      const title = row.getValue(id) as string
      const target = value.toLowerCase()
      return title.toLowerCase().startsWith(target)
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
]
