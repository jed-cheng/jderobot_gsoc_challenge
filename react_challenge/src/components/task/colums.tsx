"use client"

import { Task } from "@/lib/types"
import { ColumnDef } from "@tanstack/react-table"


export const taskColumns: ColumnDef<Task>[] = [
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
    accessorKey: "categories",
    header: "Category",
    filterFn: (row, id, value) => {
      const categories = row.getValue(id)as string[] ?? [] 
      for (const category of categories) {
        if (value.includes(category)) {
          return true
        }
      }
      return false
    }
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
