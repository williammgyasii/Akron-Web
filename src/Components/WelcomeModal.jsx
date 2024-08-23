import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Modal,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectWelcomeModalOpened,
  setWelcomeModalClose,
} from "../Redux/Slices/System/systemSlice";

const ModalContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  // boxShadow: theme.shadows[5],
  border: "0",
  padding: theme.spacing(4),
  outline: "none",
  "&:focus": {
    outline: "none", // Remove the focus outline if it appears
  },
}));

const StepContent = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: theme.spacing(4),
}));

const WelcomeModal = ({}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [groupName, setGroupName] = useState("");
  const [projectName, setProjectName] = useState("");
  const dispatch = useDispatch();

  const steps = ["Welcome", "Create Group", "Create Your First Project"];
  const welcomeModal = useSelector(selectWelcomeModalOpened);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    // Handle form submission or other actions here
    handleClose(); // Close the modal after finishing
  };

  const handleClose = () => {
    dispatch(setWelcomeModalClose());
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Typography variant="h6">
            Welcome to the App! Let's get started with setting up your
            workspace.
          </Typography>
        );
      case 1:
        return (
          <StepContent>
            <Typography variant="h6">Create a Group</Typography>
            <TextField
              label="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              fullWidth
              margin="normal"
            />
          </StepContent>
        );
      case 2:
        return (
          <StepContent>
            <Typography variant="h6">Create Your First Project</Typography>
            <TextField
              label="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              fullWidth
              margin="normal"
            />
          </StepContent>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        onClick: (e) => e.stopPropagation(),
      }}
      open={welcomeModal}
      onClose={handleClose}
    >
      <ModalContainer>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {renderStepContent(activeStep)}
        <ButtonContainer>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" color="primary" onClick={handleFinish}>
              Finish
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={activeStep === 1 && !groupName.trim()}
            >
              Next
            </Button>
          )}
        </ButtonContainer>
      </ModalContainer>
    </Modal>
  );
};

export default WelcomeModal;
