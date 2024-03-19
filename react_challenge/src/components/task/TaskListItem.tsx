import { CalendarDays, Circle } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { type Task } from "@/lib/schema";
import { priorities } from "@/lib/consts";
import { cn } from "@/lib/utils";


export default function TaskListItem(props: Task) {
    const priority = priorities.find((p) => p.value === props.priority)

    return (
        <div className=" flex items-center px-4 py-2 cursor-pointer min-w-40  min-h-16 border rounded-md hover:bg-primary-foreground">
            <Checkbox className="mr-4 rounded-full"/>
            <div className="mr-4">
                <span>{props.title}</span>
                <div className=" flex items-center flex-wrap gap-x-2 leading-tight  ">
                    {props.due && (
                        <span>
                            <CalendarDays size={14} className= " inline mr-1"/> 
                            <span className=" text-xs"> {props.due.toLocaleDateString()}</span>
                        </span>
                    )}

                    {props.category && (
                        <span>
                            <Circle size={10} className=" inline mr-1" />
                            category
                        </span>
                    )}
                </div>
            </div>
            {props.priority && (
                    <Badge variant={"outline"} className={cn(
                        priority?.value === "1" && "bg-primary-foreground text-primary-foreground",
                        priority?.value === "2" && "bg-primary-foreground text-primary-foreground",
                        priority?.value === "3" && " bg-destructive-foreground text-destructive-foreground",
                    
                    )}>
                        {priority?.icon && <priority.icon size={16} className="inline mr-1" />}
                        {priority?.label}
                    </Badge>
            )}
        </div>
    )
};
