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
import GroupMemberListView from "./GroupMemberListView";
import { queryUserByEmail } from "../Firebase/firestoreFunctions";
import VerticalStepperModal from "../AnimatedComponents/VerticalStepperModal";
import { AddMembersSection, CreateAccountSection } from "./ModalSteppers";

const gradientAnimation = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"], // Animate background gradient
    transition: {
      duration: 5, // Length of animation
      ease: "easeInOut", // Smoothing the animation
      repeat: Infinity, // Repeats infinitely
    },
  },
};

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
      <AnimatedModalContainer
        variants={gradientAnimation}
        initial="animate"
        animate="animate"
      >
        <VerticalStepperModal
          handleFinish={handleSubmit}
          steps={steps}
          handleCancel={handleClose}
          content={[
            {
              firstStep: "Create Account",
              component: (
                <CreateAccountSection
                  groupName={groupName}
                  setGroupName={setGroupName}
                  errors={errors}
                  groupIcon={groupIcon}
                  setGroupIcon={setGroupIcon}
                  handleClose={handleClose}
                  handleSubmit={handleSubmit}
                />
              ),
            },
            {
              firstStep: "Add Members",
              component: (
                <AddMembersSection
                  searchEmail={searchEmail}
                  setSearchEmail={setSearchEmail}
                  errors={errors}
                  handleAddMember={handleAddMember}
                  memberLoading={memberLoading}
                  renderMemberList={renderMemberList}
                />
              ),
            },
          ]}
        />
      </AnimatedModalContainer>
    </Modal>
  );
};

export default CreateGroupModal;

// Styled components using MUI's `styled`
const AnimatedModalContainer = styled(motion(Box))(({ theme }) => ({
  position: "absolute",
  top: "50%",
  gap: 10,
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 400,
  background: "linear-gradient(270deg, #ffffff, #f0e4f8)", // White to light gray/blue
  backgroundSize: "200% 200%",
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
