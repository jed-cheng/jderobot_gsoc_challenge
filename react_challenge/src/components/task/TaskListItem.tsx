"use client";

import { CalendarDays, Circle } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { type Task } from "@/lib/schema";
import { priorities } from "@/lib/consts";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useAppDispatch } from "@/lib/hooks";
import { updateTask } from "@/lib/slices/task/taskSlice";
import DragHandle from "./DragHandle";
import { Badge } from "../ui/badge";


export default function TaskListItem(props: Task) {
    const dispatch = useAppDispatch();
    const priority = priorities.find((p) => p.value === props.priority)

    const handleCheckedChange = (checked: boolean) => {
        dispatch(updateTask({...props, isComplete: checked}))
    }

    return (
        <div className=" flex items-center px-4 py-2 cursor-pointer min-w-64  min-h-16 border rounded-md hover:bg-primary-foreground">
            <Checkbox className="mr-4 rounded-full" checked={props.isComplete} onCheckedChange={handleCheckedChange}/>
            <div className="mr-4">
                <span>{props.title}</span>
                <div className=" flex items-center flex-wrap gap-x-2 leading-tight  ">
                    {props.priority && priority?.icon && (
                        <Badge className={cn(" h-4 rounded-full align-middle",
                            priority.value === 3 && "bg-destructive" 
                        )}
                            variant={priority.value == 1 ? "outline": "default"}
                        
                        >
                            {priority.label}
                        </Badge>
                        )}
                    {props.due && (
                        <Badge variant={"outline"} className=" h-4 rounded-full  align-middle">
                            <CalendarDays size={14} className= " inline mr-1"/> 
                            <span className=" text-xs"> {format(props.due, "PPP")}</span>
                        </Badge>
                    )}

                    {props.category && (
                            <Badge className=" h-4 rounded-full  align-middle" variant={"outline"}>
                                {props.category}
                            </Badge>
                    )}
                </div>
            </div>
            <DragHandle customId={props.id} className="ml-auto"/>
        </div>
    )
};
