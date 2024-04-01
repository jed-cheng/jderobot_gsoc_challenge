import { Task } from '@/lib/types';
import { createSlice, PayloadAction} from '@reduxjs/toolkit';


interface TaskSliceState {
  tasks: Task[]
  curTask: Task | undefined
}

const initialState: TaskSliceState = {
  tasks: [
    {
      id: "1",
      title: "Task 1",
      priority:1,
      categories: ["other"],
      isComplete: false
    },
    {
      id: "2",
      title: "Task 2",
      categories: ["personal"],
      priority: 1,
      due: 1710823406558,
      isComplete: false
    },
    {
      id: "3",
      title: "Task 3",
      categories: ["work"],
      priority: 3,
      isComplete: false
    },
    {
      id: "4",
      title: "Task 4",
      categories: ["work"],
      priority: 2,
      isComplete: false
    }
  ],
  curTask: undefined
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: (create) =>({
    addTask: create.reducer((state, action:PayloadAction<Task>)=>{
      const task = {...action.payload, id: (state.tasks.length + 1).toString(), isComplete: false}
      state.tasks.push(task)
    }),
    deleteTask: create.reducer((state, action: PayloadAction<Task>)=>{
      const index = state.tasks.findIndex((task) => task.title === action.payload.title)
      state.tasks.splice(index, 1)
    }),
    updateTask: create.reducer((state, action: PayloadAction<Task>)=>{
      const index = state.tasks.findIndex((task) => task.id === action.payload.id)
      state.tasks[index] = action.payload
    }),
    editTask: create.reducer((state, action: PayloadAction<Task>)=>{
      state.curTask = action.payload
    }),
    reorderTasks: create.reducer((state, action: PayloadAction<Task[]>)=>{
      state.tasks = action.payload
    })
  }),
  selectors: {
      selectTasks: (state) => state.tasks,
      selectCurTask: (state) => state.curTask
    }
});

export const {addTask, deleteTask, updateTask, reorderTasks} = taskSlice.actions;
export const { selectTasks, selectCurTask } = taskSlice.selectors;


export default taskSlice.reducer;