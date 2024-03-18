import { Tag } from "lucide-react";
import { FormControl } from "../ui/form";
import { Input, InputProps } from "../ui/input";

interface CategoryPickerProps extends InputProps {
}

export default function CategoryPicker({
    ...props
}: CategoryPickerProps) {
    return (
        <div className=" flex items-center">
            <Tag className="mr-2" />
            <FormControl>
                <Input className="h-12" placeholder="Pick a category" {...props} />
            </FormControl>
        </div>
    )
};
