
import TaskList from "@/components/task/TaskList";
import { columns } from "@/components/task/colums";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {"User's Tasks"}
      <TaskList columns={columns} data={[]}/>

    </main>
  );
}
