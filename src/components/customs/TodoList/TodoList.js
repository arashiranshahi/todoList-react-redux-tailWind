import React, { useEffect, useMemo, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useSelector, useDispatch } from 'react-redux';
// import { deleteTodo } from '../../../redux/slice/todoSlice';
import ModalEdit from './../ModalEdit/ModalEdit';
import ModalDelete from './../ModalDelete/ModalDelete';
import ModalSelfTodo from './../ModalSelf/ModalSelfTodo';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { FormControl, InputLabel, Select, MenuItem, Button, IconButton } from '@mui/material';
import { sortFilterTodoList } from '../../../redux/slice/FiltersSlice';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
// import { DateObject } from 'react-multi-date-picker';
// import  persian  from 'react-date-object/calendars/persian';
// import  persian_fa  from 'react-date-object/locales/persian_fa';

function TodoList() {
    const todos = useSelector(store => store.todo);
    const filterTodoList = useSelector(store => store.filter.filterTodoList);

    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openSelfModal, setOpenSelfModal] = useState(false);

    const [todoItem, setTodoItem] = useState({});
    const [sortPriority, setSortPriority] = useState('Defult');
    const [sortStatus, setSortStatus] = useState('Defult');
    const [sortDate, setSortDate] = useState('Defult');
    const [rowPerPage, setRowPerPage] = useState(5);
    const[startRecord, setStartRecord] = useState(0);
    const[endRecord, setEndRecord] = useState(5);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        // console.log(Math.ceil(filterTodoList.length / rowPerPage));
        setTotalPage(Math.ceil(filterTodoList.length / rowPerPage));
        setStartRecord((page - 1) * rowPerPage);
        setEndRecord(page * rowPerPage);
    }, [rowPerPage , page]);

    const dispatch = useDispatch();

    const handleSortPriority = () => {
        setSortStatus('Defult');
        setSortDate('Defult');
        if (sortPriority === 'Defult') {
            setSortPriority('Down');
            dispatch(sortFilterTodoList({ sort: 'priority', order: 'Down' }));
        }
        else if (sortPriority === 'Down') {
            setSortPriority('Up');
            dispatch(sortFilterTodoList({ sort: 'priority', order: 'Up' }));
        }
        else{
            setSortPriority('Defult');
            dispatch(sortFilterTodoList({ sort: 'priority', order: 'Defult'}));
        }
    }

    const handleSortStatus = () => {
        setSortPriority('Defult');
        setSortDate('Defult');
        if (sortStatus === 'Defult') {
            setSortStatus('Down');
            dispatch(sortFilterTodoList({ sort: 'status', order: 'Down' }));
        }
        else if (sortStatus === 'Down') {
            setSortStatus('Up');
            dispatch(sortFilterTodoList({ sort: 'status', order: 'Up' }));
        }
        else{
            setSortStatus('Defult');
            dispatch(sortFilterTodoList({ sort: 'status', order: 'Defult'}));
        }
    }

    const handleSortDate = () => {
        setSortPriority('Defult');
        setSortStatus('Defult');
        if (sortDate === 'Defult') {
            setSortDate('Down');
            dispatch(sortFilterTodoList({ sort: 'deadline', order: 'Down' }));
        }
        else if (sortDate === 'Down') {
            setSortDate('Up');
            dispatch(sortFilterTodoList({ sort: 'deadline', order: 'Up' }));
        }
        else{
            setSortDate('Defult');
            dispatch(sortFilterTodoList({ sort: 'deadline', order: 'Defult'}));
        }
    }

    // const todoList = useMemo(()=>{
    //     if(rowPerPage){
    //         const newTodo = filterTodoList.slice(startRecord, endRecord);
    //         return newTodo
    //     }
    //     else{
    //         return filterTodoList
    //     }
    // },[filterTodoList , rowPerPage]) 

    const handleClickEditBtn = (id) => {
        const newTodo = todos.todos.find(todo => todo.id === id)
        setTodoItem(newTodo)
        setOpenEditModal(true);
    }
    const handleClickDeleteBtn = (id) => {
        const newTodo = todos.todos.find(todo => todo.id === id)
        setTodoItem(newTodo)
        setOpenDeleteModal(true);
    }
    const handleClickSelfBtn = (id) => {
        const newTodo = todos.todos.find(todo => todo.id === id)
        setTodoItem(newTodo)
        setOpenSelfModal(true);
    }

  return (
    <div>
        <table className="w-[100%]">
            <thead>
                <tr className='text-2xl font-semibold border'>
                    <th className='text-start p-2 border'>Task</th>
                    <th className='p-2 border'>Priority {(sortPriority === 'Up')? <ArrowUpwardIcon className='cursor-pointer' onClick={()=>handleSortPriority()}/> : <ArrowDownwardIcon onClick={()=>handleSortPriority()} className={`hover:opacity-100 cursor-pointer ${(sortPriority === 'Defult') ? 'opacity-0' : 'opacity-100' }`}/>}</th>
                    <th className='p-2 border'>Status  {(sortStatus === 'Up')? <ArrowUpwardIcon className='cursor-pointer' onClick={()=>handleSortStatus()}/> : <ArrowDownwardIcon onClick={()=>handleSortStatus()} className={`hover:opacity-100 cursor-pointer ${(sortStatus === 'Defult') ? 'opacity-0' : 'opacity-100' }`}/>}</th>
                    <th className='p-2 border'>Deadline {(sortDate === 'Up')? <ArrowUpwardIcon className='cursor-pointer' onClick={()=>handleSortDate()}/> : <ArrowDownwardIcon onClick={()=>handleSortDate()} className={`hover:opacity-100 cursor-pointer ${(sortDate === 'Defult') ? 'opacity-0' : 'opacity-100' }`}/>}</th>
                    <th className='p-2 border'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {filterTodoList?.slice(startRecord , endRecord).map((todo , index) => (
                    <tr key={todo.id} className='border odd:bg-gray-100 hover:bg-gray-200'>
                        <td className='p-2 text-start border'>{todo.taskName}</td>
                        <td className='p-2 text-center borde'><span className={`p-1 text-white rounded-xl ${todo.priority[0] === 'High' ? 'bg-red-600' : todo.priority[0] === 'Medium' ? 'bg-yellow-500' : 'bg-gray-500'}`}>{todo.priority[0]}</span></td>
                        <td className='p-2 text-center border'><span className={`p-1 text-white rounded-xl ${todo.status[0] === 'Todo' ? 'bg-red-600' : todo.status[0] === 'Doing' ? 'bg-yellow-500' : todo.status[0] === 'Done' ? 'bg-green-500' : 'bg-gray-500'}`}>{todo.status[0]}</span></td>
                        <td className='p-2 text-center border'><span className='rounded-2xl border-cyan-500 border p-1'>{todo.todoDate}</span></td>
                        <td className='p-2 text-center border flex justify-center gap-1'>
                            <button onClick={()=>{handleClickDeleteBtn(todo.id)}} className='bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-1 rounded'><DeleteIcon/></button>
                            <button onClick={()=>{handleClickEditBtn(todo.id)}} className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded'><EditIcon/></button>
                            <button onClick={()=>{handleClickSelfBtn(todo.id)}} className='bg-gray-500 hover:bg-gray-700 text-white font-bold px-2 py-1 rounded'><RemoveRedEyeIcon/></button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {(openEditModal) ? <ModalEdit open={openEditModal} setOpen={setOpenEditModal} todoItem={todoItem}/> : null}
        {(openDeleteModal) ? <ModalDelete open={openDeleteModal} setOpen={setOpenDeleteModal} todoItem={todoItem}/> : null}
        {(openSelfModal) ? <ModalSelfTodo open={openSelfModal} setOpen={setOpenSelfModal} todoItem={todoItem}/> : null}
        
        <div className="flex justify-end mt-6 gap-3 items-center">
            <FormControl>
                    <InputLabel id="demo-simple-select-label">Row per page</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Row per page"
                        value={rowPerPage}
                        onChange={(e)=>{setRowPerPage(e.target.value)}}
                        sx={{width:'150px'}}
                        
                    >
                        <MenuItem value={filterTodoList.length}>All</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={15}>15</MenuItem>
                    </Select>
            </FormControl>
            <div>
                <h4>
                    {
                        (filterTodoList.length > 0) ?
                            `${(startRecord === 0) ? 1 : startRecord + 1} - ${(endRecord > filterTodoList.length) ? filterTodoList.length : endRecord} of ${filterTodoList.length}`
                            :
                            'No Todo'
                    }
                </h4>
            </div>
            <div>
                    <IconButton onClick={()=>{if(page - 1 > 0){setPage(page - 1)}}}>
                        <ArrowCircleLeftIcon/>
                    </IconButton>
                    <IconButton onClick={()=>{if(page + 1 <= totalPage){ setPage(page + 1)}}}>
                        <ArrowCircleRightIcon/>
                    </IconButton>
            </div>
        </div>
    </div>
  )
}

export default TodoList
