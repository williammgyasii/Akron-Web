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

  const handleSubmit = () => {
    console.log(GROUP_SLICE_ISLOADING, GROUP_SLICE_STATUS);
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
      <StyledGridContainer columns={12} container columnSpacing={2}>
        {/* left side */}

        <Grid item desktop={5} tablets={1} phone={2}>
          <img
            className="w-full h-full object-cover"
            src={modalImage}
            alt="modal-image"
          />
        </Grid>
        <Grid p={0} item desktop={7} tablets={1} phone={2}>
          <motion.div className="flex flex-col py-5 px-10 w-full justify-center items-start">
            <CustomTitles
              weightFont={"bold"}
              align="left"
              color={theme.palette.secondary.main}
              variant="text_xl"
              withLine
              subtitle={"Getting started by creating a group"}
            >
              Create A Group
            </CustomTitles>

            <FormContainer>
              <CustomFormInput
                label="Group Name or Alias"
                value={groupName}
                type={"text"}
                onChange={(e) => setGroupName(e.target.value)}
                fullWidth
                required
                maxCount={20}
                helperText={errors.groupNameError}
                error={Boolean(errors.groupNameError)}
              />
              <GroupIconContainer>
                {groupIcon ? (
                  <Avatar
                    src={groupIcon ? URL.createObjectURL(groupIcon) : null}
                    alt="Group Icon"
                    sx={{ width: 70, height: 70, marginBottom: "10px" }}
                  />
                ) : (
                  <FiUploadCloud
                    size={30}
                    color={theme.palette.secondary.main}
                  />
                )}
                <label htmlFor="icon-upload">
                  <h1>
                    {groupIcon ? "Change Group Icon" : "Select Group Icon"}
                  </h1>
                  <span
                    style={{
                      fontSize: "10px",
                      color: "#ccc",
                      marginTop: "-20px",
                    }}
                  >
                    SVG,PNG,max(200mb)
                  </span>
                </label>
                <input
                  id="icon-upload"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => setGroupIcon(e.target.files[0])}
                />
              </GroupIconContainer>
              {Boolean(errors.groupIconError) && (
                <span
                  style={{ color: "red", marginTop: "-10px", fontSize: "10px" }}
                >
                  {errors.groupIconError}
                </span>
              )}

              <CustomFormInput
                label="Add team members by emails"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                fullWidth
                error={!!errors.emailError}
                helperText={errors.emailError}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleAddMember}>
                      {memberLoading ? (
                        <CircularProgress size={20} />
                      ) : (
                        <PersonAdd sx={{ color: theme.palette.primary.main }} />
                      )}
                    </IconButton>
                  ),
                }}
              />

              <MembersList>{renderMemberList()}</MembersList>
            </FormContainer>
            <ButtonContainer>
              <CustomButton
                onClick={handleClose}
                // // type="iconOnly"
                // loadingButton={groupUploading}
                // leftIcon={MdFormatListBulletedAdd}
                disabled={GROUP_SLICE_ISLOADING}
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
                isLoading={GROUP_SLICE_ISLOADING}
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
          </motion.div>
        </Grid>
      </StyledGridContainer>
    </Modal>
  );
};

export default CreateGroupModal;

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
