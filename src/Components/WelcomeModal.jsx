import React, { useState } from 'react';
import { Modal, Box, Button, Typography, Stepper, Step, StepLabel, TextField } from '@mui/material';

// Styles for the modal and stepper
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const steps = ['Welcome', 'Create Group', 'Create Your First Project'];

const WelcomeModal = ({ open, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleClose = () => {
    onClose(); // Close the modal when done
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Typography variant="h6">Welcome to the app!</Typography>;
      case 1:
        return (
          <Box>
            <Typography variant="h6">Create a Group</Typography>
            <TextField label="Group Name" fullWidth margin="normal" />
            {/* Add more fields as needed */}
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6">Create Your First Project</Typography>
            <TextField label="Project Name" fullWidth margin="normal" />
            {/* Add more fields as needed */}
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 2 }}>
          {getStepContent(activeStep)}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={activeStep === 0 && false} // Enable Next button only for the first step
            >
              Next
            </Button>
            {activeStep === steps.length - 1 && (
              <Button variant="contained" color="secondary" onClick={handleClose}>
                Done
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default WelcomeModal;
