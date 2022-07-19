import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../../redux/slice/FiltersSlice';
import  SwipeableDrawer  from '@mui/material/SwipeableDrawer';
import { Box } from '@mui/system';

function FilterSideBar({openFilterSideBar, setOpenFilterSideBar}) {

    const [piority, setPiority] = useState('All');
    const [status, setStatus] = useState('All');
    const [deadline, setDeadline] = useState('All');


    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setFilter({
            priority: piority,
            status: status,
            deadline: deadline
        }))
    },[piority, status, deadline],)


  return (
    <>
        <SwipeableDrawer
        open={openFilterSideBar}
        anchor="right"
        onClose={()=>{setOpenFilterSideBar(false)}}
        onOpen={()=>{setOpenFilterSideBar(true)}}
        >
            <Box sx={{width:'350px'}}>
                <div className="flex flex-col">
                    <div className='flex justify-between px-6 py-3 text-2xl'>
                        <h3>Filters</h3>
                        <button onClick={()=>{setOpenFilterSideBar(false)}}>
                            <CloseIcon fontSize='large'/>
                        </button>
                    </div>
                    <div className='flex flex-col gap-7 p-5'>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={piority}
                                label="Priority"
                                name='priority'
                                onChange={(e)=>{setPiority(e.target.value)}}
                            >
                                <MenuItem value={'All'}>All</MenuItem>
                                <MenuItem value={'Low'}>Low</MenuItem>
                                <MenuItem value={'Medium'}>Medium</MenuItem>
                                <MenuItem value={'High'}>High</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={status}
                                label="Status"
                                name='status'
                                onChange={(e)=>{setStatus(e.target.value)}}
                                
                            >
                                <MenuItem value={'All'}>All</MenuItem>
                                <MenuItem value={'Todo'}>Todo</MenuItem>
                                <MenuItem value={'Doing'}>Doing</MenuItem>
                                <MenuItem value={'Done'}>Done</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Deadline</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={deadline}
                                label="Deadline"
                                name='deadline'
                                onChange={(e)=>{setDeadline(e.target.value)}}
                            >
                                <MenuItem value={'All'}>All</MenuItem>
                                <MenuItem value={'Overdue'}>Overdue</MenuItem>
                                <MenuItem value={'For Today'}>For Today</MenuItem>
                                <MenuItem value={'For the Future'}>For the Future</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </Box>
        </SwipeableDrawer>
    </>
  )
}

export default FilterSideBar