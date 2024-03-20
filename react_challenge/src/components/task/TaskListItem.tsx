import { CalendarDays, Circle } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { type Task } from "@/lib/schema";
import { priorities } from "@/lib/consts";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useAppDispatch } from "@/lib/hooks";
import { updateTask } from "@/lib/slices/task/taskSlice";


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
                    {props.due && (
                        <span>
                            <CalendarDays size={14} className= " inline mr-1"/> 
                            <span className=" text-xs"> {format(props.due, "PPP")}</span>
                        </span>
                    )}

                    {props.category && (
                        <span>
                            <Circle size={8} className=" inline mr-1" />
                            {props.category}
                        </span>
                    )}
                </div>
            </div>
            {props.priority && priority?.icon && (
                 <priority.icon size={16} className={cn("inline mr-1 ml-auto",
                    priority.value === 1 && " text-muted-foreground",
                    priority.value === 2 && " text-accent-foreground",
                    priority.value === 3 && " text-destructive"
                 )} />
                 
            )}
        </div>
    )
};
