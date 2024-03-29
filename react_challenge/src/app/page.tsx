
"use client";

import AddTask from "@/components/task/AddTask";
import TaskList from "@/components/task/TaskList";
import { useAppSelector } from "@/lib/hooks";

import { selectTasks } from "@/lib/slices/task/taskSlice";


export default function Home() {
  const tasks = useAppSelector(selectTasks)

  return (
    <main className="flex flex-col h-screen items-center justify-center  m-auto ">
      <div className=" max-w-sm h-2/3 flex flex-col justify-between">
        <TaskList  data={tasks}/>
        <AddTask/>
      </div>
    </main>
  );
}
