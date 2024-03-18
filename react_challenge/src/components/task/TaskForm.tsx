"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,

} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {  Circle, Tag } from "lucide-react"
import PrioritySelect from "./PrioritySelect"
import DatePicker from "./DatePicker"
import CategoryPicker from "./CategoryPicker"
import { Task, taskSchema } from "@/lib/schema"



interface TodoFormProps {
  todo?: Task  
}

export default function TaskForm({
  todo
}: TodoFormProps) {
  const form = useForm<Task>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: todo?.title,
      due: todo?.due,
      category: todo?.category,
      priority: todo?.priority,
    }
  })

  const title = form.watch("title")
 
  function onSubmit(values: Task) {

    console.log(values)
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
              <DatePicker 
                mode="single"
                onSelect={field.onChange} 
                selected={field.value} 
                disabled={(date) =>
                  date < new Date("1900-01-01")
                }
                initialFocus
              />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field: {ref,onChange, ...rest} }) => (
            <FormItem>
                <PrioritySelect onValueChange={onChange} {...rest} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field:{ref, ...rest} }) => (
            <FormItem>
              <CategoryPicker {...rest} />
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
