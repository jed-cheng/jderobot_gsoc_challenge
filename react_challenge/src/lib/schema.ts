import { z } from "zod"


export const taskSchema = z.object({
  title: z.string(),
  due: z.date().optional().transform((val)=>val?.getTime()),
  category: z.string().optional(),
  priority: z.number().min(1).max(3),
})

export type Task = z.infer<typeof taskSchema>
