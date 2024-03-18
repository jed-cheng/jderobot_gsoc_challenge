import { Table } from "@tanstack/react-table"
import { Input } from "../ui/input"
import { Cross2Icon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"
import { TaskListFilter } from "./TaskListFilter"
import { categories, priorities } from "@/lib/consts"

interface TaskListToolbarProps <TData> {
    table: Table<TData>
}

export default function TaskListToolbar<TData>({
    table,
  }: TaskListToolbarProps<TData>){

    const isFiltered = table.getState().columnFilters.length > 0

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
            <Input
                placeholder="Filter tasks..."
                value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                onChange={(evt) =>
                table.getColumn("title")?.setFilterValue(evt.target.value)
                }
                className="h-8 w-[150px] lg:w-[250px]"
            />
            {table.getColumn("category") && (
                <TaskListFilter
                column={table.getColumn("category")}
                title="Category"
                options={categories}
                />
            )}
            {table.getColumn("priority") && (
                <TaskListFilter
                column={table.getColumn("priority")}
                title="Priority"
                options={priorities}
                />
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
