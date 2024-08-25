import React, { useState } from "react";
import { Modal, Box, TextField, Button, styled } from "@mui/material";
import CustomButton from "./CustomButton";
import { MdFormatListBulletedAdd } from "react-icons/md";
import CreateGroupForm from "./CreateGroupForm";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../Redux/Slices/Users/UsersSlice";
import {
  createGroup,
  createGroupOnly,
} from "../Redux/Slices/Groups/groupsSlice";
import { validateGroupName } from "../Utils/utilityFunctions";
import { openSnackbar } from "../Redux/Slices/System/systemSlice";

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
const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: theme.spacing(1),
  width: "250px",
  marginLeft: "auto",
  gap: "10px",
}));

const CreateGroupModal = ({ open, handleClose }) => {
  const [groupName, setGroupName] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [buttonNext, setButtonNext] = useState(false);
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

  const handleSubmit = () => {
    // Handle form submission or other actions here

    const nameError = validateGroupName(groupName);
    if (nameError) {
      setErrors({ groupNameError: nameError });
      return; // Stop submission if there's an error
    }

    setLoading(true);

    if (groupName && groupIcon) {
      console.log("Group Name:", groupName);
      console.log("Group Icon:", groupIcon);
      console.log("Members:", members);

      dispatch(createGroupOnly({ groupName, groupIcon, members }))
        .unwrap()
        .then((result) => {
          console.log("handlefinish", result);
          setGroupName("");
          setMembers([]);
          setGroupIcon(null);
         
          handleClose(); // Close the modal after finishing
        });
    } else {
      console.log("There was an error");
      setLoading(false);
    }
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
        <ButtonContainer>
          <CustomButton
            onClick={handleClose}
            // // type="iconOnly"
            // loadingButton={groupUploading}
            // leftIcon={MdFormatListBulletedAdd}
            submit
            size="medium"
            sx={{ color: "#fff" }}
            variant="secondary"
          >
            Cancel
          </CustomButton>
          <CustomButton
            onClick={handleSubmit}
            // disabled={buttonNext}
            leftIcon={MdFormatListBulletedAdd}
            loadingButton={loading}
            submit
            size="medium"
            sx={{ color: "#fff" }}
            type="iconLeft"
            variant="primary"
            color="primary"
          >
            Create Group
          </CustomButton>
        </ButtonContainer>
      </ModalContainer>
    </Modal>
  );
};

export default CreateGroupModal;
