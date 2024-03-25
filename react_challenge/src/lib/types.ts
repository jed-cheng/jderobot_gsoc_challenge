export type Task = {
    id: string
    title: string
    due?: number
    category?: string
    priority: number
    isComplete: boolean
}