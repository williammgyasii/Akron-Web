import React, { useState } from "react";
import { Fab, Modal, Box, Button, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import TaskForm from "./TaskForm";

const CreateTaskFAB = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

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
            position: "absolute",
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
          style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          onClick: (e) => e.stopPropagation(),
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: "auto",
            bgcolor: "background.paper",
            p: 2,
            borderRadius: 2,
          }}
        >
          <TaskForm handleClose={handleClose} />
          
        </Box>
      </Modal>
    </>
  );
};

export default CreateTaskFAB;
