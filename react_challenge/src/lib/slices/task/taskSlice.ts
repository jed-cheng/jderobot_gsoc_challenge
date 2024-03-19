import { Task } from '@/lib/schema';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';


interface TaskSliceState {
  tasks: Task[]
}

const initialState: TaskSliceState = {
  tasks: [
    {
      title: "Task 1",
      category: "work",
      priority: undefined
    },
    {
      title: "Task 1",
      category: "work",
      priority: undefined
    }
  ],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: (create) =>({
    addTask: create.reducer((state)=>{

    }),
    deleteTask: create.reducer((state, action: PayloadAction<number>)=>{

    }),
    updateTask: create.reducer((state, action: PayloadAction<Task>)=>{

    })
  }),
  selectors: {
      selectTasks: (state) => state.tasks
    }
});

export const {addTask, deleteTask, updateTask} = taskSlice.actions;
export const { selectTasks } = taskSlice.selectors;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export default taskSlice.reducer;