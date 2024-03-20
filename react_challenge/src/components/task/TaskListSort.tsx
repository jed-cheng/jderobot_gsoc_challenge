import { Column } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDown } from "lucide-react"

interface TaskListSortProps<TData, TValue> {
    column?: Column<TData, TValue>
    title: string
}

export function TaskListSort<TData, TValue>({
    column,
    title,
  }: TaskListSortProps<TData, TValue>) {
    
    if (!column || !column.getCanSort()) {
        return <div >{title}</div>
    }

    const handleSort = (direction: boolean) =>{
        const directionMapped = direction ?  "desc":"asc"
        if(column.getIsSorted() === directionMapped ){
            column.clearSorting()
        } else {
            column.toggleSorting(direction)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button
                variant="ghost"
                size="sm"
                className="-ml-3 h-8 data-[state=open]:bg-accent"
            >
                <span>{title}</span>
                {column.getIsSorted() === "desc" ? (
                    <ArrowDownIcon className="ml-2 h-4 w-4" />
                ) : column.getIsSorted() === "asc" ? (
                    <ArrowUpIcon className="ml-2 h-4 w-4" />
                ) : (
                    <ChevronsUpDown className="ml-2 h-4 w-4" />
                )}
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => handleSort(false)}>
                    <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                    Asc
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() =>  handleSort(true)}>
                    <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                    Desc
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
};
