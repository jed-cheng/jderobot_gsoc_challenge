import { CalendarIcon } from "lucide-react"
import { FormControl } from "../ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { format, set } from "date-fns"
import { Calendar, CalendarProps } from "../ui/calendar"
import { useState } from "react"



export default function DatePicker({
  ...props
}: CalendarProps) {
  
  const [isOpen, setIsOpen] = useState(false)

  return (
      <Popover open={isOpen} onOpenChange={(open)=>setIsOpen(open)}>
          <PopoverTrigger asChild onClick={()=>setIsOpen(true)}>
          <FormControl>
              <div className=" flex items-center">
              <CalendarIcon className="mr-2" />
                  <Button
                    variant={"outline"}
                    className={cn(
                      "h-12 w-full pl-3 text-left font-normal justify-start",
                      !props.selected && "text-muted-foreground"
                    )}
                  >
                    {props.selected ? (
                      format(props.selected as Date, "PPP") // Fix: Pass a valid format string as the second argument
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
              </div>
          </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
                {...props}
            />
            <Button
              className="w-full" 
              onClick={()=>setIsOpen(false)}>
              Save
            </Button>
          </PopoverContent>
    </Popover>
    )
};
