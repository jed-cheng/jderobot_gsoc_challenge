"use client";

import { CalendarDays, Circle, Plus } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import TaskForm from "./TaskForm";

export default function AddTask() {
    return (
        <Dialog>
            <DialogTrigger>
                <div className=" flex items-center px-4 py-2 cursor-pointer min-w-64 max-w-80 min-h-16 border rounded-md hover:bg-primary-foreground ">
                    <Plus size={20} className="mr-2" />
                    <span>
                        Add a task
                    </span> 
                </div>
            </DialogTrigger>
            <DialogContent>
                <TaskForm/>
            </DialogContent>
        </Dialog>

    )
};
