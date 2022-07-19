import React from 'react'
import { Modal, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../../../redux/slice/todoSlice';

function ModalDelete({ open, setOpen, todoItem }) {

    const dispatch = useDispatch()

  return (
    <>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <Box className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-2/3 bg-white p-2 outline-none rounded-xl">
                <h1 className="text-2xl p-3">Are you sure you want to delete this task?</h1>
                <hr />
                <div className='flex justify-between p-3'>
                    <Button onClick={()=>setOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={()=>{dispatch(deleteTodo(todoItem.id)); setOpen(false)}} variant='contained'>
                        Yes
                    </Button>
                </div>
            </Box>

        </Modal>
    </>
  )
}

export default ModalDelete
// sx={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50% , -50%)' , width:'600px', backgroundColor:'#ffffff',padding:2, outline:'none' , borderRadius:3,}}