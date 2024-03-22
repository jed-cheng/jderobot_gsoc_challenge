"use client";

import { useSortable } from "@dnd-kit/sortable"
import { GripVertical } from "lucide-react";
import { type UniqueIdentifier } from "@dnd-kit/core";

interface DragHandleProps extends React.HTMLAttributes<HTMLButtonElement>{
    customId: UniqueIdentifier
}

export default function DragHandle({
    customId,
    ...props
}: DragHandleProps) {
    
    const { attributes, listeners } = useSortable({
        id: customId
    })
    

    return (
        <button
            {...props}
            {...attributes}
            {...listeners}
        >
            <GripVertical />
        </button>

    )
};
