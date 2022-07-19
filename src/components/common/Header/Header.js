import React, { useState } from 'react'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ModalAdd from './../../customs/ModalAdd/ModalAdd';
import FilterSideBar from './../../customs/FilterSideBar/FilterSideBar';
import { useDispatch, useSelector } from 'react-redux';
import { filterTodoListBySearch } from '../../../redux/slice/FiltersSlice';
function Header() {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openFilterSideBar, setOpenFilterSideBar] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const todos = useSelector(store => store.todo.todos);

    const handleChange = (e) => {
        if(todos.length > 0){
            setInputValue(e.target.value);
            dispatch(filterTodoListBySearch({
                search: e.target.value,
                todos: todos
            }));
        }
    }

  return (
    <>
        <div className='bg-[#6200ea] flex justify-between'>
            <div className='flex py-4 px-4 gap-3 text-white'>
                <FormatListNumberedIcon fontSize='large'/>
                <h1 className='text-2xl'>My To-Do Task</h1>
            </div>
            <div className='flex py-4 px-4 gap-3'>
                <div className=''>
                    <input type="text" className='h-[100%] rounded-md outline-none px-2' placeholder='Search' value={inputValue} onChange={handleChange}/>
                </div>
                <button onClick={()=>{setOpenFilterSideBar(true)}} className='text-white'>
                    <FilterAltIcon fontSize='large'/>   
                </button>
                <button onClick={()=>{setOpenAddModal(true)}} className='text-white'>
                    <AddBoxIcon fontSize='large'/>
                </button>
            </div>
        </div>
        <ModalAdd openAddModal={openAddModal} setOpenAddModal={setOpenAddModal}/>
        <FilterSideBar openFilterSideBar={openFilterSideBar} setOpenFilterSideBar={setOpenFilterSideBar}/>
    </>
  )
}

export default Header