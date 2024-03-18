import { SelectProps } from "@radix-ui/react-select";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { FormControl } from "../ui/form";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface PrioritySelectProps extends SelectProps {
}



export default function PrioritySelect({
    ...props
}: PrioritySelectProps) {
    return (
        <Select onValueChange={props.onValueChange} defaultValue={props.value}>
            <FormControl>
                <div className=" flex items-center">
                    <Star className="mr-2" />
                    <SelectTrigger  className={cn(
                        "h-12",
                        !props.value && "text-muted-foreground"
                    )} >
                        <SelectValue placeholder="Select a priority"  />
                    </SelectTrigger>
                </div>
            </FormControl>
            <SelectContent>
                <SelectItem value="0" className=" h-3.5"></SelectItem>
                <SelectItem value="1">High</SelectItem>
                <SelectItem value="2">Mid</SelectItem>
                <SelectItem value="3">Low</SelectItem>
            </SelectContent>
        </Select>
    )
    
};
