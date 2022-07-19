import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextareaAutosize, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-multi-date-picker';
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { useDispatch } from 'react-redux';
import { editTodo } from '../../../redux/slice/todoSlice';
import { DateObject } from 'react-multi-date-picker';

function ModalEdit({ open , setOpen , todoItem }) {

    // const todos = useSelector(store => store.todo.todos)

    const [taskName, setTaskName] = useState(todoItem.taskName)
    const [priority , setPriority] = useState(todoItem.priority[0])
    const [status , setStatus] = useState(todoItem.status[0])
    const [todoDate , setTodoDate] = useState(new DateObject().convert(persian, persian_fa))
    const [description , setDescription] = useState(todoItem.description)



    const dispatch = useDispatch()
    // console.log(todos);

    const handleCloseModal = () => {
        setTodoDate(new DateObject().convert(persian, persian_fa))
        setOpen(false)
    }
    
    const handleEdiitTodo = () => {
      const year = todoDate.toDate().getFullYear()
      const month = todoDate.toDate().getMonth() + 1
      const day = todoDate.toDate().getDate()
      const todoDateNum = +(`${year}${month}${(day < 10) ? '0' + day : day}`)
        dispatch(editTodo({
            id: todoItem.id,
            taskName,
            priority:[priority,'All',{value:(priority === 'Priority') ? 0 : (priority === 'High') ? 3 : (priority === 'Medium') ? 2 : 1}],
            status:[status,'All',{value:(status === 'Status') ? 0 : (status === 'Done') ? 3 : (status === 'Doing') ? 2 : 1}],
            todoDate: todoDate.format(),
            description,
            todoDateNum: todoDateNum,
        }))
        console.log(todoItem)
        handleCloseModal()
    }

  return (
    <>
    <Modal
      open={open}
      onClose={handleCloseModal}
    >
      <Box sx={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50% , -50%)' , width:'600px', backgroundColor:'#ffffff',padding:2, outline:'none' , borderRadius:3,}}>
        <Typography id="modal-modal-title" variant="h4" component="h4">
          Edit Task
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
              <Button onClick={handleEdiitTodo} variant='contained'>
                  Save
              </Button>
          </Box>
      </Box>
      
    </Modal>
  </>
  )
}

export default ModalEdit