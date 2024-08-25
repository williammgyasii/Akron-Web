import React, { useState } from "react";
import { Modal, Box, TextField, Button, styled } from "@mui/material";

// Styled components using MUI's `styled`
const ModalContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  // boxShadow: theme.shadows[5],
  border: "0",
  padding: theme.spacing(2),
  outline: "none",
  "&:focus": {
    outline: "none", // Remove the focus outline if it appears
  },
}));

const ModalHeader = styled("h2")(({ theme }) => ({
  margin: 0,
  paddingBottom: theme.spacing(2),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const CreateGroupModal = ({ open, handleClose, createGroup }) => {
  const [groupName, setGroupName] = useState("");

  const handleCreateGroup = () => {
    createGroup(groupName);
    handleClose();
  };

  return (
    <Modal
      BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        onClick: (e) => e.stopPropagation(),
      }}
      open={open}
      onClose={handleClose}
    >
      <ModalContainer>
        <TextField
          label="Group Name"
          fullWidth
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <SubmitButton variant="contained" onClick={handleCreateGroup}>
          Create
        </SubmitButton>
      </ModalContainer>
    </Modal>
  );
};

export default CreateGroupModal;
