"use client";

import { Checkbox } from "../ui/checkbox";
import { priorities } from "@/lib/consts";
import { cn,  } from "@/lib/utils";
import { useAppDispatch } from "@/lib/hooks";
import { updateTask } from "@/lib/slices/task/taskSlice";
import DragHandle from "./DragHandle";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import TaskForm from "./TaskForm";
import { Task } from "@/lib/types";
import DueBadge from "./DueBadge";
import PriorityBadge from "./PriorityBadge";



export default function TaskListItem(props: Task) {
    const dispatch = useAppDispatch();
    const priority = priorities.find((p) => p.value === props.priority)

    const handleCheckedChange = (checked: boolean) => {
        dispatch(updateTask({...props, isComplete: checked}))
    }

    return (
        <div className=" flex items-center px-4 py-2 cursor-pointer min-w-64  min-h-16 border rounded-md hover:bg-primary-foreground">
            <Checkbox className="mr-4 rounded-full" checked={props.isComplete} onCheckedChange={handleCheckedChange}/>
            <Dialog >
                <DialogTrigger asChild>
                    <div className="mr-4" >
                        <span>{props.title}</span>
                        <div className=" flex items-center flex-wrap gap-x-2 leading-tight  ">
                            {priority && (
                                <PriorityBadge priority={priority}/>
                            )}
                            {props.due && (
                                <DueBadge due={props.due}/>
                            )}
                            {props.category && (
                                <Badge className=" h-4 rounded-full  align-middle" variant={"outline"}>
                                    {props.category}
                                </Badge>
                            )}
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <TaskForm task={props} />
                </DialogContent>
            </Dialog>
            
            <DragHandle customId={props.id} className="ml-auto"/>
        </div>
    )
};
