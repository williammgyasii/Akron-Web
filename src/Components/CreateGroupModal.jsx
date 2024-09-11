import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  styled,
  Grid,
  useTheme,
  Avatar,
  List,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CustomButton from "./CustomButton";
import { MdFormatListBulletedAdd } from "react-icons/md";
// import CreateGroupForm from "./CreateGroupForm";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../Redux/Slices/Users/UsersSlice";
import {
  CREATE_USER_GROUPS,
  createGroupOnly,
  FETCH_USER_GROUPS,
} from "../Redux/Slices/Groups/groupsSlice";
import { validateGroupName } from "../Utils/utilityFunctions";
import { openSnackbar } from "../Redux/Slices/System/systemSlice";
import { motion } from "framer-motion";
import modalImage from "../Pages/LandingPage/assets/FeaturesBanner.jpg";
import CustomTitles from "./CustomTitles";
import CustomFormInput from "./CustomFormInput";
import { FiUploadCloud } from "react-icons/fi";
import { PersonAdd } from "@mui/icons-material";
import GroupMemberListView from "./GroupMemberListView";
import { queryUserByEmail } from "../Firebase/firestoreFunctions";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Check from "@mui/icons-material/Check";
import SettingsIcon from "@mui/icons-material/Settings";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import VideoLabelIcon from "@mui/icons-material/VideoLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import VerticalStepper from "../AnimatedComponents/VerticalStepperModal";
import VerticalStepperModal from "../AnimatedComponents/VerticalStepperModal";

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const CreateGroupModal = ({ open, handleClose }) => {
  const [groupName, setGroupName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [groupIcon, setGroupIcon] = useState(null);
  const [errors, setErrors] = useState({
    groupNameError: "",
    groupIconError: "",
    emailError: "",
  });
  const [members, setMembers] = useState([]);
  const [memberLoading, setMemberLoading] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const { GROUP_SLICE_STATUS, GROUP_SLICE_ISLOADING } = useSelector(
    (state) => state.groups
  );
  const theme = useTheme();
  const steps = ["Group Details", "Add Members"];

  const handleSubmit = () => {
    setErrors({ groupIconError: "", groupNameError: "", emailError: "" });
    const nameError = validateGroupName(groupName);
    if (nameError) {
      setErrors({ groupNameError: nameError });
      return; // Stop submission if there's an error
    }
    if (groupName && groupIcon) {
      dispatch(
        CREATE_USER_GROUPS({
          groupData: groupName,
          userId: currentUser?.uid,
          imageFile: groupIcon,
          invitedEmails: members,
        })
      )
        .unwrap()
        .then((result) => {
          dispatch(
            openSnackbar({ message: "Group Created", snackbarState: "info" })
          );
          setGroupName("");
          setMembers([]);
          setGroupIcon(null);
          setErrors({ groupNameError: "", groupIconError: "" });
          dispatch(FETCH_USER_GROUPS(currentUser.uid));
          handleClose(); // Close the modal after finishing
        });
    }
  };

  const handleGroupNameChange = (name) => {
    setGroupName(name);
  };

  // Handle adding a new member
  const AddMemberToArray = (result) => {
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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleAddMember = async () => {
    if (searchEmail.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        emailError: "Email cannot be empty.",
      }));
    } else if (searchEmail === currentUser?.email) {
      setErrors((prev) => ({
        ...prev,
        emailError: "You are already a member of the group.",
      }));
    } else if (!emailRegex.test(searchEmail)) {
      setErrors((prev) => ({
        ...prev,
        emailError: "Please enter a valid email address",
      }));
    } else if (members.some((member) => member.email === searchEmail)) {
      setErrors((prev) => ({
        ...prev,
        emailError: "This email has already been added",
      }));
    } else {
      try {
        setMemberLoading(true);
        const uid = await queryUserByEmail(searchEmail)
          .then((result) => {
            if (result) {
              AddMemberToArray(result);
              setSearchEmail("");
              setErrors("");
              setMemberLoading(false);
            }
          })
          .catch((error) => {
            setErrors((prev) => ({
              ...prev,
              emailError: "Email isnt registered",
              error,
            }));
            setMemberLoading(false);
          });
      } catch (error) {}
    }
  };

  // Handle removing a member
  const handleRemoveMember = (email) => {
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member !== email)
    );
  };

  const renderMemberList = () => {
    const loggedUser = {
      email: currentUser.email,
      name: `${currentUser.firstName} ${currentUser.lastName}`, // Placeholder for the user's name
      status: "ADMIN",
    };

    return [loggedUser, ...members].map((member, index) => (
      <GroupMemberListView key={member.email} member={member} index={index} />
    ));
  };

  return (
    <Modal
      BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0.86)" },
        onClick: (e) => e.stopPropagation(),
      }}
      open={open}
      onClose={handleClose}
    >
      <ModalContainer>
        <VerticalStepperModal
          handleFinish={handleSubmit}
          steps={steps}
          handleCancel={handleClose}
          content={[
            {
              firstStep: "Create Account",
              component: <CreateAccountSection />,
            },
            {
              firstStep: "Add Members",
              component: <AddMembersSection />,
            },
          ]}
        />
      </ModalContainer>
    </Modal>
  );
};

export default CreateGroupModal;

const CreateAccountSection = () => {
  return <div>Create Account</div>;
};

const AddMembersSection = () => {
  return <div>Add Members</div>;
};

// Styled components using MUI's `styled`
const ModalContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  gap: 10,
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  // boxShadow: theme.shadows[5],
  border: "0",
  padding: theme.spacing(2),
  outline: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:focus": {
    outline: "none", // Remove the focus outline if it appears
  },
}));
const StyledGridContainer = styled(Grid)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  // boxShadow: theme.shadows[5],
  border: "0",
  outline: "none",
  "&:focus": {
    outline: "none", // Remove the focus outline if it appears
  },
}));
const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: theme.spacing(1),
  width: "100%",
  marginLeft: "auto",
  gap: "10px",
}));

const GroupIconContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  //   gap: "16px",
  marginBottom: "10px",
  padding: "10px",
  border: "1px dashed #10197A",
  borderRadius: "10px",
});

const FormContainer = styled("form")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "10px",
  marginTop: "30px",
});

const MembersList = styled(List)({
  //   marginTop: "16px",
  maxHeight: "200px", // Adjust the height as needed
  overflowY: "auto",
  "& li": {
    borderBottom: "1px solid #ddd", // Optional: adds a border between items
  },
});

// Styling for the connectors
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#eaeaf0",
    borderTopWidth: 5,
    borderRadius: 1,
    borderLeftWidth: 0,
  },
}));

const QontoStepIconRoot = styled("div")(({ theme }) => ({
  color: "#eaeaf0",
  display: "flex",
  height: 22,
  alignItems: "center",
  "& .QontoStepIcon-completedIcon": {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  ...theme.applyStyles("dark", {
    color: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        color: "#784af4",
      },
    },
  ],
}));
