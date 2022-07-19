import { configureStore } from '@reduxjs/toolkit';
import filter from '../slice/FiltersSlice';
import todo from '../slice/todoSlice';

export const store = configureStore({
    reducer: {
        todo,
        filter,
    },
});