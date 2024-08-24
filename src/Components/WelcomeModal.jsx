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
import { IoAtCircle, IoCheckmarkCircle } from "react-icons/io5";
import { Circle } from "@mui/icons-material";
import { GoDotFill } from "react-icons/go";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdFormatListBulletedAdd } from "react-icons/md";
import CustomButton from "./CustomButton";
import CreateGroupForm from "./CreateGroupForm";
import { selectCurrentUser } from "../Redux/Slices/Users/UsersSlice";
import { createGroup } from "../Redux/Slices/Groups/groupsSlice";

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

const StepContent = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: theme.spacing(1),
  width: "220px",
  marginLeft: "auto",
}));

const CustomStepLabel = styled(StepLabel)({
  "& .MuiStepLabel-label": {
    fontSize: "0.675rem", // Adjust the font size here (e.g., 14px equivalent)
  },
});

const CustomStepIcon = styled("div")(({ theme, ownerState }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  borderRadius: "50%",
  backgroundColor:
    ownerState.completed || ownerState.active
      ? "transparent"
      : theme.palette.primary.main,
  color: ownerState.active
    ? theme.palette.primary.main // Red dot for the active step
    : ownerState.completed
    ? theme.palette.success.main // Green tick for completed steps
    : theme.palette.grey[400], // Grey dot for other steps
  ...(ownerState.active && {
    border: `2px solid ${theme.palette.secondary.main}`,
  }),
}));

function StepIcon(props) {
  const { active, completed } = props;

  return completed ? (
    <IoMdCheckmarkCircleOutline color="green" />
  ) : (
    <CustomStepIcon ownerState={{ active, completed }}>
      <GoDotFill fontSize="small" />
    </CustomStepIcon>
  );
}

const WelcomeModal = ({}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [buttonNext, setButtonNext] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [groupIcon, setGroupIcon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [projectName, setProjectName] = useState("");
  const [members, setMembers] = useState([]);
  const [groupLoading, setGroupLoading] = useState(true);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const groupUploading = useSelector(
    (state) => state.groups.createGroupLoading
  );

  const steps = ["Welcome", "Create Group", "Create Your First Project"];
  const welcomeModal = useSelector(selectWelcomeModalOpened);

  // console.log(currentUser)

  const handleNext = () => {
    if (activeStep >= 1) {
      if (!groupName || !groupIcon) {
        setButtonNext(false);
        return;
      }
    }
    console.log("Group Name:", groupName);
    console.log("Group Icon:", groupIcon);
    console.log("Members:", members);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    // Handle form submission or other actions here
    console.log("Group Name:", groupName);
    console.log("Group Icon:", groupIcon);
    console.log("Members:", members);
    console.log("Project Name", projectName);
    dispatch(createGroup({ groupName, groupIcon, members, projectName })).then(
      () => {
        handleClose(); // Close the modal after finishing
      }
    );
  };

  const handleGroupNameChange = (name) => {
    setGroupName(name);
  };

  // Handle adding a new member
  const handleAddMember = (email) => {
    setMembers([
      ...members,
      {
        email: searchEmail,
        name: searchEmail.split("@")[0], // This is a placeholder for the user's name
        status: "Pending Invitation",
      },
    ]);
  };

  // Handle removing a member
  const handleRemoveMember = (email) => {
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member !== email)
    );
  };

  // Handle icon upload
  const handleIconUpload = (icon) => {
    setGroupIcon(icon);
  };

  const handleClose = () => {
    dispatch(setWelcomeModalClose());
  };

  const handleFormSubmit = () => {
    // Logic to submit the form data to the server or handle it as needed
    console.log("Group Name:", groupName);
    console.log("Group Icon:", groupIcon);
    console.log("Members:", members);
    dispatch(createGroup({ groupName, groupIcon, members, projectName }));
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
            <CreateGroupForm
              onChangeGroupName={(e) => setGroupName(e.target.value)}
              groupName={groupName}
              userEmail={currentUser.email}
              setGroupName={handleGroupNameChange}
              members={members}
              searchEmail={searchEmail}
              setSearchEmail={(value) => setSearchEmail(value)}
              groupIcon={groupIcon}
              setGroupIcon={handleIconUpload}
              loading={groupLoading}
              removeMember={handleRemoveMember}
              addMember={handleAddMember}
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

  // Function to mark a step as completed
  const isCompleted = (step) => {
    return step < activeStep; // Simple check: step is completed if it's before the active step
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
        <Stepper activeStep={activeStep} nonLinear>
          {steps.map((label, index) => (
            <Step key={label}>
              <CustomStepLabel
                StepIconComponent={(props) => (
                  <StepIcon
                    {...props}
                    active={index === activeStep}
                    completed={isCompleted(index)}
                  />
                )}
              >
                {label}
              </CustomStepLabel>
            </Step>
          ))}
        </Stepper>
        {renderStepContent(activeStep)}
        <ButtonContainer>
          {activeStep !== 0 && (
            <CustomButton
              sx={{
                flexBasis: "50%",
                marginRight: "10px",
              }}
              onClick={handleBack}
              variant="minimal"
              size="medium"
            >
              Back
            </CustomButton>
          )}
          {activeStep === steps.length - 1 ? (
            <CustomButton
              onClick={handleFinish}
              // type="iconOnly"
              loadingButton={groupUploading}
              leftIcon={MdFormatListBulletedAdd}
              submit
              size="medium"
              sx={{ color: "#fff" }}
              variant="primary"
            >
              Create Task
            </CustomButton>
          ) : (
            <CustomButton
              onClick={handleNext}
              disabled={activeStep === 1 && !groupName.trim() && !groupIcon}
              // type="iconOnly"
              // loadingButton={taskState === "loading"}
              leftIcon={MdFormatListBulletedAdd}
              submit
              size="medium"
              sx={{ color: "#fff" }}
              variant="primary"
              color="primary"
            >
              Next
            </CustomButton>
          )}
        </ButtonContainer>
      </ModalContainer>
    </Modal>
  );
};

export default WelcomeModal;
