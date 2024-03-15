import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';


interface TodoSliceState {
  todos: string[]
}

const initialState: TodoSliceState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    },
    deleteTodo: (state) => {
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateTodo: (state, action: PayloadAction<number>) => {
    },
  },
    selectors: {
      selectTodos: (state) => state.todos
    }
});

export const {addTodo, deleteTodo, updateTodo} = todoSlice.actions;
export const { selectTodos } = todoSlice.selectors;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export default todoSlice.reducer;