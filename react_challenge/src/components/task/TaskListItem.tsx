import { CalendarDays, Circle } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { type Task } from "@/lib/schema";


export default function TaskListItem(props: Task) {
    console.log("task props:",props)
    return (
        <div className=" flex items-center px-4 py-2 cursor-pointer min-w-64 max-w-80 min-h-16 border rounded-md hover:bg-primary-foreground">
            <Checkbox className="mr-4"/>
            <div className="mr-4">
                <span>todo</span>
                <div className=" flex items-center flex-wrap gap-x-2 leading-tight  ">
                    <span className="">
                        <CalendarDays size={14} className= " inline mr-1"/> 
                        <span className=" text-xs"> {new Date().toLocaleDateString()}</span>
                    </span>
                    <span>
                        <Circle size={10} className=" inline mr-1" />
                        category
                    </span>
                </div>
            </div>
            <Badge className=" rounded-full h-5 ml-auto"> priority </Badge>
        </div>
    )
};
