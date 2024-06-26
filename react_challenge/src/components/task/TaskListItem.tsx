"use client";

import { Checkbox } from "../ui/checkbox";
import { priorities } from "@/lib/consts";
import { useAppDispatch } from "@/lib/hooks";
import { updateTask } from "@/lib/slices/task/taskSlice";
import DragHandle from "./DragHandle";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import TaskForm from "./TaskForm";
import { Task } from "@/lib/types";
import DueBadge from "./DueBadge";
import PriorityBadge from "./PriorityBadge";
import CategoryBadge from "./CategoryBadge";
import { useMemo, useState } from "react";



export default function TaskListItem(props: Task) {
    const dispatch = useAppDispatch();
    const priority = useMemo(()=>{
        return priorities.find((p) => p.value === props.priority)
    }, [props.priority])
    const [isOpen, setIsOpen] = useState(false)

    const handleCheckedChange = (checked: boolean) => {
        dispatch(updateTask({...props, isComplete: checked}))
    }

    return (
        <div className=" flex items-center px-4 py-2 cursor-pointer min-w-64  min-h-16 border rounded-md hover:bg-primary-foreground">
            <Checkbox className="mr-4 rounded-full" checked={props.isComplete} onCheckedChange={handleCheckedChange}/>
            <Dialog open={isOpen} onOpenChange={(open)=>setIsOpen(open)} >
                <DialogTrigger asChild>
                    <div className="mr-4 flex-1" >
                        <span>{props.title}</span>
                        <div className=" flex items-center flex-wrap gap-x-2 gap-y-1 leading-tight  ">
                            {priority && (
                                <PriorityBadge priority={priority}/>
                            )}
                            {props.due && (
                                <DueBadge due={props.due}/>
                            )}
                            {props.categories && props.categories.map((category) => (
                                <CategoryBadge key={category} category={category}/>
                            ))}
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <TaskForm task={props} postSubmit={()=>setIsOpen(false)}/>
                </DialogContent>
            </Dialog>
            
            <DragHandle customId={props.id} />
        </div>
    )
};
