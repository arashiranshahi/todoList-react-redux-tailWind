import React from 'react'
import { Modal, Typography, FormControl, TextField, MenuItem, Select, InputLabel, TextareaAutosize } from '@mui/material';
import { Box } from '@mui/system';
import  DatePicker  from 'react-multi-date-picker';
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"

function ModalSelfTodo({ open, setOpen, todoItem }) {
  return (
    <>
        <Modal
        open={open}
        onClose={() => setOpen(false)}
        >
            <Box className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 bg-white rounded-lg p-3 w-[37.5rem]'>
                <Typography id="modal-modal-title" variant="h4" component="h4">
                    View Task
                </Typography>
                <hr />
                <Box id="modal-modal-description" sx={{ mt: 2 }}>
                    <TextField fullWidth label="Task Name" sx={{marginBottom:5}} value={todoItem.taskName} disabled/>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', marginBottom:'3rem' }}>
                    <FormControl disabled>
                    <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Priority"
                    sx={{width:'150px'}}
                    value={todoItem.priority[0]}
                    >
                        <MenuItem value={'Priority'}>Priority</MenuItem>
                        <MenuItem value={'Low'}>Low</MenuItem>
                        <MenuItem value={'Medium'}>Medium</MenuItem>
                        <MenuItem value={'High'}>High</MenuItem>
                     </Select>
                    </FormControl>
                    <FormControl disabled>
                        <InputLabel id="demo-simple-select-label">Status</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Status"
                            sx={{width:'150px'}}
                            value={todoItem.status[0]}
                            >
                            <MenuItem value={'Status'}>Status</MenuItem>
                            <MenuItem value={'Todo'}>Todo</MenuItem>
                            <MenuItem value={'Doing'}>Doing</MenuItem>
                            <MenuItem value={'Done'}>Done</MenuItem>
                        </Select>
                    </FormControl>
                    <DatePicker
                    disabled
                    value={todoItem.todoDate}
                    style={{width:'150px' , padding:26 }}
                    calendar={persian}
                    locale={persian_fa}
                    />
                 </Box>
                <TextareaAutosize
                disabled
                value={todoItem.description}
                placeholder="Description(Optional)"
                minRows={4}
                style={{width:'100%' , padding:15, outline:'none' , border:'1px solid #e0e0e0' , marginBottom:'1rem'}}
                />
            </Box>

        </Modal>
    </>
  )
}

export default ModalSelfTodo