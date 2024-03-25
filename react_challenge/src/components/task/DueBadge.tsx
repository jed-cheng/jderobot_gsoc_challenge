import { cn, daysFromNow } from "@/lib/utils"
import { Badge } from "../ui/badge"
import { CalendarDays } from "lucide-react"
import { format } from "date-fns"

interface DueBadgeProps {
    due: Date
}

export default function DueBadge({
    due
}:DueBadgeProps) {
    const days = daysFromNow(due)
    return (
        <Badge variant={"outline"} className={cn("h-4 rounded-full  align-middle",
            days <= 0 && "bg-destructive text-destructive-foreground",
            days == 1 && "bg-yellow-400",
        )}>
            <CalendarDays size={14} className= " inline mr-1"/>
                <span className=" text-xs">
                    {days < 0 && format(due, "PPP")}
                    {days == 0 && "Today"}
                    {days == 1 && "Tomorrow"}
                </span>
        </Badge>
    )
};
