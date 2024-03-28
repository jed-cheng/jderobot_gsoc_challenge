"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {  CalendarIcon, Circle, Star, Tag } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { cn } from "@/lib/utils"
import { useAppDispatch } from "@/lib/hooks"
import { addTask, updateTask } from "@/lib/slices/task/taskSlice"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { format } from "date-fns"
import { Calendar } from "../ui/calendar"
import { useState } from "react"
import { Task } from "@/lib/types"
import { categories } from "@/lib/consts"
import MultipleSelector, { Option } from "../ui/multi-select"


interface TaskFormProps {
  task?: Task
  postSubmit?: () => void
}

const taskSchema = z.object({
  title: z.string(),
  due: z.date().optional().transform((val)=>val?.getTime()),
  categories: z.string().array(),
  priority: z.number().min(1).max(3),
})

export default function TaskForm({
  task,
  postSubmit
}: TaskFormProps) {
  const dispatch = useAppDispatch();
  const form = useForm<Task>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title ?? "",
      due: task?.due ?? undefined,
      categories: task?.categories ?? [],
      priority: task?.priority ?? undefined,
    }
  })
  const [isOpen, setIsOpen] = useState(false)
  const title = form.watch("title")

 
  function onSubmit(values: Task) {
    console.log(values)
    if(task){
      dispatch(updateTask({...task, ...values}))
    } else {
      dispatch(addTask({...values}))
    }
    postSubmit?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem >
              <FormControl>
                <div className="flex items-center">
                    <Circle className="mr-2" />
                    <Input className="h-12" placeholder="Add a task"  {...field} />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="due"
          render={({ field }) => (
            <FormItem>
              <Popover open={isOpen} onOpenChange={(open)=>setIsOpen(open)}>
                <PopoverTrigger asChild>
                  <div className="flex items-center">
                  <CalendarIcon className="mr-2" />
                  <FormControl>
                    <Button
                      onClick={(evt)=>{evt.preventDefault(); setIsOpen(true)}}
                      variant={"outline"}
                      className={cn(
                        "h-12 w-full pl-3 text-left font-normal justify-start",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value? new Date(field.value): undefined}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                  <Button
                    className="w-full" 
                    onClick={()=>setIsOpen(false)}>
                    Save
                  </Button>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={(value)=>field.onChange(Number(value))} defaultValue={field.value? String(field.value): undefined}>
                  <FormControl>
                      <div className=" flex items-center">
                          <Star className="mr-2" />
                          <SelectTrigger  className={cn(
                              "h-12",
                              !field.value && "text-muted-foreground"
                          )} >
                              <SelectValue placeholder="Select a priority"  />
                          </SelectTrigger>
                      </div>
                  </FormControl>
                  <SelectContent>
                      <SelectItem value="1">High</SelectItem>
                      <SelectItem value="2">Mid</SelectItem>
                      <SelectItem value="3">Low</SelectItem>
                  </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <div className=" flex items-center">
                  <Tag className="mr-2" />
                  <FormControl>
                    <MultipleSelector
                      defaultOptions={categories}
                      placeholder="Select frameworks you like..."
                      value={field.value?.map((value)=>(categories.find((category)=>category.value === value) as Option)) ?? []}
                      
                      emptyIndicator={
                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                          no results found.
                        </p>
                      }
                      onChange={(options)=>field.onChange(options.map((option)=>option.value))}
                    />
                  </FormControl>
              </div>
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full h-12"
          disabled = {!title}
        >
          Save
        </Button>
      </form>
    </Form>
  )
}
