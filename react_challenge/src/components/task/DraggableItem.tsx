"use client";

import { useSortable } from "@dnd-kit/sortable"
import { CSSProperties } from "react";
import { CSS } from '@dnd-kit/utilities'

interface DraggableItemProps
    extends React.HTMLAttributes<HTMLDivElement>{
    uid: string | number
}

export default function DraggableItem({
    uid,
    ...props
}: DraggableItemProps) {
    const { transform, transition, setNodeRef, isDragging, attributes, listeners } = useSortable({
        id: uid
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
            {...attributes}
            {...listeners}
        />
    )
};
