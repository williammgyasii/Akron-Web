import React, { useState } from "react";
import {
  Fab,
  Modal,
  Box,
  Button,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import AddTaskForm from "./AddTaskForm";
import {
  hideModal,
  selectIsModalOpened,
  showModal,
} from "../Redux/Slices/System/systemSlice";
import ModalComponent from "./ModalComponent";

const CreateTaskFAB = () => {
  const [open, setOpen] = useState(false);
  const modalOpened = useSelector(selectIsModalOpened);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("tablets_port"));

  const handleOpen = () => dispatch(showModal());
  const handleClose = () => dispatch(hideModal());

  return (
    <>
      {isSmallScreen && (
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
      )}
      <ModalComponent view={"createTask"} />
    </>
  );
};

export default CreateTaskFAB;
