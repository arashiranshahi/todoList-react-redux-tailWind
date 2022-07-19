import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todos: [],
        status: 'idle',
    },

    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        editTodo: (state, action) => {
            state.todos = state.todos.map(todo => {
                if (todo.id === action.payload.id) {
                    todo.taskName = action.payload.taskName;
                    todo.priority = action.payload.priority;
                    todo.status = action.payload.status;
                    todo.todoDate = action.payload.todoDate;
                }
                return todo;
            });
        },

    },

});

export const { addTodo, deleteTodo , editTodo } = todoSlice.actions;
export default todoSlice.reducer;