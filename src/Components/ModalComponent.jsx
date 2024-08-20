// ModalComponent.js
import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  hideModal,
  selectIsModalOpened,
  selectModalView,
} from "../Redux/Slices/System/systemSlice";
import AddTaskForm from "./AddTaskForm";

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ModalBox = styled(Box)(({ theme }) => ({
  width: 500,
  backgroundColor: theme.palette.background.paper,
  boxShadow: 24,
  padding: theme.spacing(3),
  borderRadius: 4,
  outline: "none",
}));

const ModalComponent = ({ open, onClose, view }) => {
  const modalOpened = useSelector(selectIsModalOpened);
  const modalType = useSelector(selectModalView);
  console.log(modalType);
  const dispatch = useDispatch();
  const renderContent = () => {
    switch (modalType) {
      case "createTask":
        return <AddTaskForm />;
      case "createGroup":
        return <Typography>Create Group Form</Typography>;
      case "createProject":
        return <Typography>Create Project Form</Typography>;
      default:
        return null;
    }
  };

  return (
    <StyledModal
      BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        onClick: (e) => e.stopPropagation(),
      }}
      open={modalOpened}
      onClose={() => dispatch(hideModal())}
    >
      <ModalBox>
        <Box>{renderContent()}</Box>
      </ModalBox>
    </StyledModal>
  );
};

export default ModalComponent;
