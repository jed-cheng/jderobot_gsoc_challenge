import { Task } from '@/lib/schema';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';


interface TaskSliceState {
  tasks: Task[]
  curTask: Task | undefined
}

const initialState: TaskSliceState = {
  tasks: [
    {
      title: "Task 1",
    },
    {
      title: "Task 2",
      category: "work",
      priority: "1",
      due: 1710823406558
    },
    {
      title: "Task 3",
      category: "work",
      priority: "2"
    },
    {
      title: "Task 4",
      category: "work",
      priority: "3"
    }
  ],
  curTask: undefined
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: (create) =>({
    addTask: create.reducer((state, action:PayloadAction<Task>)=>{
      state.tasks.push(action.payload)
    }),
    deleteTask: create.reducer((state, action: PayloadAction<Task>)=>{
      const index = state.tasks.findIndex((task) => task.title === action.payload.title)
      state.tasks.splice(index, 1)
    }),
    updateTask: create.reducer((state, action: PayloadAction<Task>)=>{
      const index = state.tasks.findIndex((task) => task.title === action.payload.title)
      state.tasks[index] = action.payload
    }),
    editTask: create.reducer((state, action: PayloadAction<Task>)=>{
      state.curTask = action.payload
    })
  }),
  selectors: {
      selectTasks: (state) => state.tasks,
      selectCurTask: (state) => state.curTask
    }
});

export const {addTask, deleteTask, updateTask} = taskSlice.actions;
export const { selectTasks, selectCurTask } = taskSlice.selectors;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export default taskSlice.reducer;