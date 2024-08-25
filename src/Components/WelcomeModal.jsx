import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Modal,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectWelcomeModalOpened,
  setAppUserState,
  setWelcomeModalClose,
} from "../Redux/Slices/System/systemSlice";
import { GoDotFill } from "react-icons/go";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdFormatListBulletedAdd } from "react-icons/md";
import CustomButton from "./CustomButton";
import CreateGroupForm from "./CreateGroupForm";
import { selectCurrentUser } from "../Redux/Slices/Users/UsersSlice";
import {
  createGroup,
  fetchGroupMembers,
  fetchProjectsByGroupId,
  fetchSelectedGroupDetails,
  setSelectedGroupID,
} from "../Redux/Slices/Groups/groupsSlice";
import CreateProjectForm from "./CreateProjectForm";
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
  const [errors, setErrors] = useState({
    groupNameError: "",
    groupIconError: "",
  });
  const [projectName, setProjectName] = useState("");
  const [members, setMembers] = useState([]);
  const [groupLoading, setGroupLoading] = useState(true);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const groupUploading = useSelector(
    (state) => state.groups.createGroupLoading
  );
  const [projectValues, setProjectValues] = useState({
    projectTitle: { value: "", error: false, helperText: "" },
    projectDescription: { value: "", error: false, helperText: "" },
  });

  const steps = ["Welcome", "Create Group", "Create Your First Project"];
  const welcomeModal = useSelector(selectWelcomeModalOpened);

  const handleProjectChange = (field, value) => {
    setProjectValues((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value,
        error: false,
        helperText: "",
      },
    }));
  };

  const handleNext = () => {
    if (activeStep < 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep >= 1 && groupName && groupIcon) {
      setErrors({
        groupNameError: "",
        groupIconError: "",
      });
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // console.log("ready");
    } else {
      console.log("error found");
      setErrors({
        groupNameError: "Group name is required",
        groupIconError: "Group icon is required",
      });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFinish = () => {
    // // Handle form submission or other actions here
    // console.log("Group Name:", groupName);
    // console.log("Group Icon:", groupIcon);
    // console.log("Members:", members);
    // console.log("Project Name", projectValues);
    dispatch(createGroup({ groupName, groupIcon, members, projectValues }))
      .unwrap()
      .then((result) => {
        console.log("handlefinish", result);
        dispatch(setAppUserState("currentUser"));
        dispatch(setSelectedGroupID(result.id));
        dispatch(
          fetchProjectsByGroupId({
            groupId: result.id,
            userId: currentUser.uid,
          })
        );
        dispatch(fetchSelectedGroupDetails(result.id));
        handleClose(); // Close the modal after finishing
      });
  };

  const handleGroupNameChange = (name) => {
    setGroupName(name);
  };

  // Handle adding a new member
  const handleAddMember = (result) => {
    setMembers([
      ...members,
      {
        email: result.email,
        name: `${result.firstName} ${result.lastName}`,
        userid: result.uid, // This is a placeholder for the user's name
        statustype: "pending",
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
              errors={errors}
            />
          </StepContent>
        );
      case 2:
        return (
          <StepContent>
            <CreateProjectForm
              projectValues={projectValues}
              handleProjectChange={handleProjectChange}
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
              Finish
            </CustomButton>
          ) : (
            <CustomButton
              onClick={handleNext}
              disabled={buttonNext}
              leftIcon={MdFormatListBulletedAdd}
              // loadingButton={true}
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
