import { Badge } from "../ui/badge"

interface CategoryBadgeProps {
    category: string
}

export default function CategoryBadge({
    category
}:CategoryBadgeProps) {
    return (
        <Badge className=" h-4 rounded-full  align-middle" variant={"outline"}>
            {category}
        </Badge>
    )
}