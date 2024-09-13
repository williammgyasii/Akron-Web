import React, { useState } from "react";
import {
  Fab,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsModalOpened,
} from "../Redux/Slices/System/systemSlice";
import CreateTaskModal from "./CreateTaskModal";

const CreateTaskFAB = () => {
  const [open, setOpen] = useState(false);
  const modalOpened = useSelector(selectIsModalOpened);
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("tablets_port"));
  const [openTaskModal, setOpenTaskModal] = useState(false);

  const handleCloseTaskModal = () => {
    setOpenTaskModal(false);
  };
  const handleOpenTaskModal = () => {
    setOpenTaskModal(true);
  };

  return (
    <>
      {isSmallScreen && (
        <Tooltip title="Add New Task" arrow>
          <Fab
            color="primary"
            aria-label="add"
            onClick={handleOpenTaskModal}
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
      {/* CREATE TASK MODAL IN DASHBOARD */}
      <CreateTaskModal isOpen={openTaskModal} onClose={handleCloseTaskModal} />
    </>
  );
};

export default CreateTaskFAB;
