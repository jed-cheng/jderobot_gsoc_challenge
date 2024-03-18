"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Circle, Tag } from "lucide-react"
import PrioritySelect from "./PrioritySelect"
import { TodoProps } from "@/lib/types"
import DatePicker from "./DatePicker"
import CategoryPicker from "./CategoryPicker"

const formSchema = z.object({
  name: z.string().max(100).optional(),
  due: z.date().optional(),
  priority: z.string().optional(),
  category: z.string().optional(),
})


interface TodoFormProps {
  todo?: TodoProps  
}

export default function TodoForm({
  todo
}: TodoFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: todo?.name,
      due: todo?.due,
      category: todo?.category,
      priority: todo?.priority,
    }
  })

  const name = form.watch("name")
 
  function onSubmit(values: z.infer<typeof formSchema>) {

    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
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
          disabled = {!name}
        >
          Save
        </Button>
      </form>
    </Form>
  )
}
