// ModalComponent.js
import React, { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  hideModal,
  selectIsModalOpened,
  selectModalView,
  setWelcomeModalClose,
} from "../Redux/Slices/System/systemSlice";
import AddTaskForm from "./AddTaskForm";
import CreateGroupForm from "./CreateGroupForm";
import { selectCurrentUser } from "../Redux/Slices/Users/UsersSlice";
import CustomButton from "./CustomButton";

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

  const renderContent = () => {
    switch (modalType) {
      case "createTask":
        return <AddTaskForm />;
      case "createGroup":
        return (
          <>
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
            <Box>
              <CustomButton
                // onClick={handleFinish}
                // type="iconOnly"
                // loadingButton={groupUploading}
                // leftIcon={MdFormatListBulletedAdd}
                submit
                size="medium"
                sx={{ color: "#fff" }}
                variant="primary"
              >
                Finish
              </CustomButton>

              <CustomButton
                // onClick={handleNext}
                // disabled={buttonNext}
                // leftIcon={MdFormatListBulletedAdd}
                // loadingButton={true}
                submit
                size="medium"
                sx={{ color: "#fff" }}
                variant="primary"
                color="primary"
              >
                Next
              </CustomButton>
            </Box>
          </>
        );
      case "createProject":
        return (
          <Typography>Create Prokect Form</Typography>
          // <CreateProjectForm
          //   // projectValues={projectValues}
          //   // handleProjectChange={handleProjectChange}
          // />
        );
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
