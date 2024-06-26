import { Table } from "@tanstack/react-table"
import { Input } from "../ui/input"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"
import { TaskListFilter } from "./TaskListFilter"
import { categories, status } from "@/lib/consts"
import { TaskListSort } from "./TaskListSort"

interface TaskListToolbarProps <TData> {
    table: Table<TData>
}

export default function TaskListToolbar<TData>({
    table,
  }: TaskListToolbarProps<TData>){

    const isFiltered = table.getState().columnFilters.length > 0

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center  flex-wrap gap-2">
            <Input
                placeholder="Filter tasks..."
                value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                onChange={(evt) =>
                table.getColumn("title")?.setFilterValue(evt.target.value)
                }
                className="h-8 w-[150px] lg:w-[250px]"
            />
            {table.getColumn("categories") && (
                <TaskListFilter
                column={table.getColumn("categories")}
                title="Category"
                options={categories}
                />
            )}
            {table.getColumn("isComplete") && (
                <TaskListFilter
                column={table.getColumn("isComplete")}
                title="Status"
                options={status}
                />
            )}
            {table.getColumn("priority") && (
                <TaskListSort column={table.getColumn("priority")} title="Priority" />
            )}
            {isFiltered && (
                <Button
                variant="ghost"
                onClick={() => table.resetColumnFilters()}
                className="h-8 px-2 lg:px-3"
                >
                Reset
                <Cross2Icon className="ml-2 h-4 w-4" />
                </Button>
            )}
            </div>
      </div>
    )
};
