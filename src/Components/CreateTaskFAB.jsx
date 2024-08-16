import React, { useState } from 'react';
import { Fab, Modal, Box, Button, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';

const CreateTaskFAB = () => {
  const [open, setOpen] = useState(false);
  const dispatch=useDispatch()

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Tooltip title="Add New Task" arrow>
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleOpen}
          size="medium"
          style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        BackdropProps={{
          style: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <h2 id="modal-title">Add New Task</h2>
          <p id="modal-description">Fill in the details for the new task.</p>
          {/* Add your form inputs here */}
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default CreateTaskFAB;
