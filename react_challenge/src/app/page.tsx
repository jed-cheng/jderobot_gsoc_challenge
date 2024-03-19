
"use client";

import AddTask from "@/components/task/AddTask";
import TaskList from "@/components/task/TaskList";
import { columns } from "@/components/task/colums";
import { useAppSelector } from "@/lib/hooks";

import { selectTasks } from "@/lib/slices/task/taskSlice";


export default function Home() {
  const tasks = useAppSelector(selectTasks)

  return (
    <main className="flex min-h-screen max-w-screen-md mx-auto flex-col items-center justify-between p-24">
      <TaskList columns={columns} data={tasks}/>
      <AddTask/>
    </main>
  );
}
