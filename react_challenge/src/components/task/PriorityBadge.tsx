import { cn } from "@/lib/utils"
import { Badge } from "../ui/badge"

interface PriorityBadgeProps {
    priority: {
        value: number,
        label: string
    }
}
export default function PriorityBadge({
    priority
}:PriorityBadgeProps) {
    return (
        <Badge className={cn(" h-4 rounded-full align-middle",
            priority.value === 3 && "bg-destructive" 
        )}
            variant={priority.value == 1 ? "outline": "default"}
        >
            {priority.label}
        </Badge>
    )
}
