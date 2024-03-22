"use client";

import { 
    ColumnFiltersState, 
    SortingState, 
    getCoreRowModel, 
    getFacetedRowModel, 
    getFacetedUniqueValues, 
    getFilteredRowModel, 
    getPaginationRowModel, 
    getSortedRowModel, 
    useReactTable } from "@tanstack/react-table";
import {
    DndContext,
    KeyboardSensor,
    MouseSensor,
    TouchSensor,
    closestCenter,
    type DragEndEvent,
    type UniqueIdentifier,
    useSensor,
    useSensors,
    DragOverEvent,
    } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
    } from '@dnd-kit/sortable'

import { useMemo, useState } from "react";
import TaskListToolbar from "./TaskListToolbar";
import TaskListItem from "./TaskListItem";
import { Task } from "@/lib/schema";
import { taskColumns } from "./colums";
import DraggableItem from "./DraggableItem";
import { useAppDispatch } from "@/lib/hooks";
import { reorderTasks } from "@/lib/slices/task/taskSlice";

interface TaskListProps {
    data: Task[]
}


export default function TaskList({
    data
}: TaskListProps) {
    const dispatch = useAppDispatch();
    const dataIds = useMemo<UniqueIdentifier[]>(() =>
        data.map(({ id }) => id),[data])  
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [sorting, setSorting] = useState<SortingState>([])
    const table = useReactTable<Task>({
        data,
        columns: taskColumns,
        state: {
            sorting,
            columnFilters,
        },
        getRowId: (row) => row.id,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    // reorder rows after drag & drop
    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (active && over && active.id !== over.id) {
            const oldIndex = dataIds.indexOf(active.id)
            const newIndex = dataIds.indexOf(over.id)
            const newOrder = arrayMove(data, oldIndex, newIndex)
            dispatch(reorderTasks(newOrder))
        }
    }

    const sensors = useSensors(
        useSensor(MouseSensor, {}),
        useSensor(TouchSensor, {}),
        useSensor(KeyboardSensor, {})
    )

    return (
        <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
        <div className="space-y-4 w-full">
            <TaskListToolbar table={table} />
            <div className="w-full space-y-2">
                <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                >
                    {table.getRowModel().rows?.length&& (
                        table.getRowModel().rows.map((row) => (
                            <DraggableItem key={row.id} customId={row.id}>
                                <TaskListItem  {...row.original}  />
                            </DraggableItem>
                        ))
                    )}
                </SortableContext>
            </div>
        </div>
        </DndContext>
    )
};
