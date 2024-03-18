
import TaskList from "@/components/task/TaskList";
import { columns } from "@/components/task/colums";
import { Task } from "@/lib/schema";

const tasks: Task[]  = [
  {
    title: "Task 1",
    category: "work",
    priority: undefined
  }
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TaskList columns={columns} data={tasks}/>

    </main>
  );
}
