export type Task = {
    id: string
    title: string
    due?: number
    categories?: string[]
    priority: number
    isComplete: boolean
}