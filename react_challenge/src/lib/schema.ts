import { z } from "zod"


export const taskSchema = z.object({
  title: z.string(),
  due: z.date().optional(),
  category: z.string().optional(),
  priority: z.string().optional(),
})

export type Task = z.infer<typeof taskSchema>