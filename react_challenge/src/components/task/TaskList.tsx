"use client";
import { 
    ColumnDef, 
    ColumnFiltersState, 
    SortingState, 
    getCoreRowModel, 
    getFacetedRowModel, 
    getFacetedUniqueValues, 
    getFilteredRowModel, 
    getPaginationRowModel, 
    getSortedRowModel, 
    useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import TaskListToolbar from "./TaskListToolbar";
import TaskListItem from "./TaskListItem";
import { Task } from "@/lib/schema";

interface TaskListProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}


export default function TaskList<TData,TValue>({
    columns,
    data
}: TaskListProps<TData,TValue>) {

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
      []
    )
    const [sorting, setSorting] = useState<SortingState>([])
  
    const table = useReactTable({
      data,
      columns,
      state: {
        sorting,
        columnFilters,
      },
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFacetedRowModel: getFacetedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
    })


    return (
        <div className="space-y-4 w-full">
            <TaskListToolbar table={table} />
            <div className="w-full space-y-2">
                {table.getRowModel().rows?.length? (
                    table.getRowModel().rows.map((row, index) => (
                        <TaskListItem key={index} {...row.original as Task}  />
                    ))
                ) : (
                    <div className="w-full text-center">
                        No tasks found
                    </div>
                )}
            </div>

        </div>
    )
};
