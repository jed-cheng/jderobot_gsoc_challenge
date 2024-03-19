"use client";

import {  Plus } from "lucide-react";

import { Dialog, DialogContent,  DialogTrigger } from "../ui/dialog";
import TaskForm from "./TaskForm";
import { useState } from "react";

export default function AddTask() {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <Dialog onOpenChange={(open)=>setIsOpen(open)} open={isOpen}>
            <DialogTrigger className="w-full">
                <div className=" flex items-center px-4 py-2 cursor-pointer min-w-40  min-h-16 border rounded-md hover:bg-primary-foreground ">
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
