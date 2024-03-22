"use client";

import { useSortable } from "@dnd-kit/sortable"
import { CSSProperties } from "react";
import { CSS } from '@dnd-kit/utilities'
import { type UniqueIdentifier } from "@dnd-kit/core";

interface DraggableItemProps
    extends React.HTMLAttributes<HTMLDivElement>{
    customId: UniqueIdentifier
}

export default function DraggableItem({
    customId,
    ...props
}: DraggableItemProps) {
    const { transform, transition, setNodeRef, isDragging } = useSortable({
        id: customId
    })

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
        transition: transition,
        opacity: isDragging ? 0.8 : 1,
        zIndex: isDragging ? 1 : 0,
        position: 'relative',
    }

    return (
        <div
            ref={setNodeRef}
            style={style} 
            {...props}
        />
    )
};
