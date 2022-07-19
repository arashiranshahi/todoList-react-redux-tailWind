import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: "filter",
    initialState: {
        filterTodo:{
            priority: 'All',
            status: 'All',
            deadline: 'All'
        },
        filterTodoList:[],
    },

    reducers: {
        setFilter: (state, action) => {
            state.filterTodo.priority = action.payload.priority;
            state.filterTodo.status = action.payload.status;
            state.filterTodo.deadline = action.payload.deadline;
            

        },
        setFilterTodoList: (state, action) => {
            const year = new Date().getFullYear();
            const month = new Date().getMonth() + 1;
            const day = new Date().getDate();
            const todayDate = +(`${year}${month}${(day < 10) ? '0' + day : day}`);
            if(state.filterTodo.deadline === 'All'){
                state.filterTodoList = action.payload.filter((todo) => todo.priority.includes(state.filterTodo.priority) && todo.status.includes(state.filterTodo.status));
            }
            else if (state.filterTodo.deadline === 'Overdue'){
                const newTodo = action.payload.filter((todo) => todo.priority.includes(state.filterTodo.priority) && todo.status.includes(state.filterTodo.status));
                const newTodo2 = newTodo.filter(todo => todo.todoDateNum < todayDate);
                state.filterTodoList = newTodo2;
            }
            else if(state.filterTodo.deadline === 'For Today'){
                const newTodo = action.payload.filter((todo) => todo.priority.includes(state.filterTodo.priority) && todo.status.includes(state.filterTodo.status));
                const newTodo2 = newTodo.filter(todo => todo.todoDateNum === todayDate);
                state.filterTodoList = newTodo2;
            }
            else{
                const newTodo = action.payload.filter((todo) => todo.priority.includes(state.filterTodo.priority) && todo.status.includes(state.filterTodo.status));
                const newTodo2 = newTodo.filter(todo => todo.todoDateNum > todayDate);
                state.filterTodoList = newTodo2;
            }
        },
        filterTodoListBySearch: (state, action) => {
            console.log(action.payload);
            if(action.payload.search === ''){
                state.filterTodoList = action.payload.todos;
            }
            else{
                const newTodo = action.payload.todos.filter((todo)=> todo.taskName.includes(action.payload.search));
                state.filterTodoList = newTodo;
            }
        },
        sortFilterTodoList: (state, action) => {
            if(action.payload.sort === 'priority'){
                if(action.payload.order === 'Down'){
                    state.filterTodoList.sort((a, b) => a.priority[2].value - b.priority[2].value );
                }
                else if(action.payload.order === 'Up'){
                    state.filterTodoList.sort((a, b) => b.priority[2].value - a.priority[2].value );
                }
                else{
                    state.filterTodoList.sort((a, b) => a.id - b.id );
                }
            }
            else if(action.payload.sort === 'status'){
                if(action.payload.order === 'Down'){
                    state.filterTodoList.sort((a, b) => a.status[2].value - b.status[2].value );
                }
                else if(action.payload.order === 'Up'){
                    state.filterTodoList.sort((a, b) => b.status[2].value - a.status[2].value );
                }
                else{
                    state.filterTodoList.sort((a, b) => a.id - b.id );
                }
            }
            else if(action.payload.sort === 'deadline'){
                if(action.payload.order === 'Down'){
                    state.filterTodoList.sort((a, b) => a.todoDateNum - b.todoDateNum );
                }
                else if(action.payload.order === 'Up'){
                    state.filterTodoList.sort((a, b) => b.todoDateNum - a.todoDateNum );
                }
                else{
                    state.filterTodoList.sort((a, b) => a.id - b.id );
                }
            }
            
        }

    }
});

export const { setFilter , setFilterTodoList , filterTodoListBySearch , sortFilterTodoList } = filterSlice.actions;
export default filterSlice.reducer;

