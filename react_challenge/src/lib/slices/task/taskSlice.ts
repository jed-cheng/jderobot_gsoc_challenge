import { Task } from '@/lib/schema';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';


interface TaskSliceState {
  tasks: Task[]
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
      due: new Date("2022-01-01")
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