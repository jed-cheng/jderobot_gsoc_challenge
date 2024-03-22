import { z } from "zod"


export const taskSchema = z.object({
  id:z.string(),
  title: z.string(),
  due: z.date().optional().transform((val)=>val?.getTime()),
  category: z.string().optional(),
  priority: z.number().min(1).max(3),
  isComplete: z.boolean()
})

export type Task = z.infer<typeof taskSchema>
