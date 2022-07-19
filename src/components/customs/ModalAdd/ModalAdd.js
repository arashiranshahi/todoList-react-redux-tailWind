import React, { useEffect, useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Modal, Select, TextareaAutosize, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useDispatch , useSelector } from 'react-redux'
import DatePicker, { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { addTodo } from '../../../redux/slice/todoSlice'
import { setFilterTodoList } from '../../../redux/slice/FiltersSlice'


function ModalAdd({ openAddModal, setOpenAddModal }) {
    const dispatch = useDispatch()

    const todos = useSelector(store => store.todo)
    const filterTodo = useSelector(store => store.filter.filterTodo);

    const [taskName, setTaskName] = useState('')
    const [priority , setPriority] = useState('Priority')
    const [status , setStatus] = useState('Status')
    const [todoDate , setTodoDate] = useState(new DateObject().convert(persian, persian_fa))
    const [description , setDescription] = useState('')

    useEffect(() => {
      dispatch(setFilterTodoList(todos.todos))
    },[filterTodo , todos])

    const handleCloseModal = () => {
        setPriority('Priority')
        setStatus('Status')
        setTodoDate(new DateObject().convert(persian, persian_fa))
        setTaskName('')
        setDescription('')
        setOpenAddModal(false)
    }
    const handleAddTodo = () => {
      const year = todoDate.toDate().getFullYear()
      const month = todoDate.toDate().getMonth() + 1
      const day = todoDate.toDate().getDate()
      const todoDateNum = +(`${year}${month}${(day < 10) ? '0' + day : day}`)
        const newTodo = {
            id: Date.now(),
            taskName,
            priority:[priority,'All',{value:(priority === 'Priority') ? 0 : (priority === 'High') ? 3 : (priority === 'Medium') ? 2 : 1}],
            status:[status,'All' , {value:(status === 'Status') ? 0 : (status === 'Done') ? 3 : (status === 'Doing') ? 2 : 1}],
            todoDate: todoDate.format(),
            description,
            todoDateNum: todoDateNum,
        }
        console.log(newTodo)
        dispatch(addTodo(newTodo))
        handleCloseModal()

    }
  return (
    <>
      <Modal
        open={openAddModal}
        onClose={handleCloseModal}
      >
        <Box sx={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50% , -50%)' , width:'600px', backgroundColor:'#ffffff',padding:2, outline:'none' , borderRadius:3,}}>
          <Typography id="modal-modal-title" variant="h4" component="h4">
            New Task
          </Typography>
          <hr />
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField fullWidth label="Task Name" sx={{marginBottom:5}} onChange={(e)=>{setTaskName(e.target.value)}} value={taskName}/>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly', marginBottom:'3rem' }}>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={priority}
                    label="Priority"
                    onChange={(e)=>{setPriority(e.target.value)}}
                    sx={{width:'150px'}}
                >
                    <MenuItem value={'Priority'}>Priority</MenuItem>
                    <MenuItem value={'Low'}>Low</MenuItem>
                    <MenuItem value={'Medium'}>Medium</MenuItem>
                    <MenuItem value={'High'}>High</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Status"
                    onChange={(e)=>{setStatus(e.target.value)}}
                    sx={{width:'150px'}}
                    
                >
                    <MenuItem value={'Status'}>Status</MenuItem>
                    <MenuItem value={'Todo'}>Todo</MenuItem>
                    <MenuItem value={'Doing'}>Doing</MenuItem>
                    <MenuItem value={'Done'}>Done</MenuItem>
                </Select>
            </FormControl>
            <DatePicker
            style={{width:'150px' , padding:26 }}
            calendar={persian}
            locale={persian_fa}
            value={todoDate}
            onChange={setTodoDate}
            />
            </Box>
            <TextareaAutosize
            value={description}
            onChange={(e)=>{setDescription(e.target.value)}}
            placeholder="Description(Optional)"
            minRows={4}
            style={{width:'100%' , padding:15, outline:'none' , border:'1px solid #e0e0e0' , marginBottom:'1rem'}}
            />
            <hr />
            <Box sx={{ display: 'flex' , justifyContent: 'space-between' ,marginTop:'1rem' }}>
                <Button onClick={handleCloseModal} variant='outlined'>
                    Cancel
                </Button>
                <Button onClick={handleAddTodo} variant='contained'>
                    Save
                </Button>
            </Box>
        </Box>
        
      </Modal>
    </>
  )
}

export default ModalAdd