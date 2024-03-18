import AddTodo from "@/components/todo/AddTodo";
import TodoListItem from "@/components/todo/TodoListItem";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AddTodo/>
      <TodoListItem/>
    </main>
  );
}
