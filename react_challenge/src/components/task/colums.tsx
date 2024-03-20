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
    accessorKey: "isComplete",
    header: "isComplete",
    filterFn: (row, id, value) => {
      const isComplete = row.getValue(id) ? "true" : "false"
      return value.includes(isComplete)
    }
  },
  {
    accessorKey: "priority",
    header: "Priority",
    sortingFn: (rowA, rowB, id) => {
      const valueA = rowA.getValue(id) ?? 0;
      const valueB = rowB.getValue(id) ?? 0;
      return valueA < valueB ? -1 : 1;
    }
  },
]
