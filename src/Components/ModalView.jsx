// ModalComponent.js
import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ModalBox = styled(Box)(({ theme }) => ({
  width: 400,
  backgroundColor: theme.palette.background.paper,
  border: '2px solid #000',
  boxShadow: 24,
  padding: theme.spacing(4),
  outline: 'none',
}));

const ModalComponent = ({ open, onClose, view }) => {
  const renderContent = () => {
    switch (view) {
      case 'createTask':
        return <Typography>Create Task Form</Typography>;
      case 'createGroup':
        return <Typography>Create Group Form</Typography>;
      case 'createProject':
        return <Typography>Create Project Form</Typography>;
      default:
        return null;
    }
  };

  return (
    <StyledModal open={open} onClose={onClose}>
      <ModalBox>
        <Typography variant="h6" component="h2">
          {view === 'createTask' && 'Create Task'}
          {view === 'createGroup' && 'Create Group'}
          {view === 'createProject' && 'Create Project'}
        </Typography>
        <Box mt={2}>
          {renderContent()}
        </Box>
        <Box mt={4} textAlign="right">
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onClose} color="primary" sx={{ ml: 2 }}>
            Save
          </Button>
        </Box>
      </ModalBox>
    </StyledModal>
  );
};

export default ModalComponent;
