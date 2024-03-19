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
import {  Circle, Star, Tag } from "lucide-react"
import DatePicker from "./DatePicker"
import { Task, taskSchema } from "@/lib/schema"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { cn } from "@/lib/utils"



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
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                      <SelectItem value="0" className=" h-3.5"></SelectItem>
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
          name="category"
          render={({ field }) => (
            <FormItem>
              <div className=" flex items-center">
                  <Tag className="mr-2" />
                  <FormControl>
                      <Input className="h-12" placeholder="Pick a category" {...field} />
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
