import React, { useState } from "react";
import { Fab, Modal, Box, Button, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import TaskForm from "./TaskForm";
import {
  hideModal,
  selectIsModalOpened,
  showModal,
} from "../Redux/Slices/System/systemSlice";

const CreateTaskFAB = () => {
  const [open, setOpen] = useState(false);
  const modalOpened = useSelector(selectIsModalOpened);
  const dispatch = useDispatch();

  const handleOpen = () => dispatch(showModal());
  const handleClose = () => dispatch(hideModal());

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
            bottom: 20,
            right: 20,
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <Modal
        open={modalOpened}
        onClose={() => dispatch(hideModal())}
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
          <TaskForm />
        </Box>
      </Modal>
    </>
  );
};

export default CreateTaskFAB;
