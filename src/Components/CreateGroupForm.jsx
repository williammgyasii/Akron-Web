import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  CircularProgress,
  IconButton,
  Avatar,
  Chip,
  Typography,
  Box,
  useTheme,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { PhotoCamera, PersonAdd, UploadFile } from "@mui/icons-material";
import { styled } from "@mui/system";
import CustomFormInput from "./CustomFormInput";
import { FiUpload } from "react-icons/fi";
import CustomButton from "./CustomButton";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../Redux/Slices/Users/UsersSlice";
import GroupMemberListView from "./GroupMemberListView";
import { queryUserByEmail } from "../Firebase/firebaseFunctions";

const FormContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  // maxWidth: '400px',
  margin: "0 auto",
});

const GroupIconContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  //   gap: "16px",
  padding: "10px",
  border: "1px dashed #10197A",
  borderRadius: "10px",
});

// const MembersList = styled(Box)({
//   display: "flex",
//   flexWrap: "wrap",
//   gap: "3px",
// });

const MembersList = styled(List)({
  //   marginTop: "16px",
  maxHeight: "200px", // Adjust the height as needed
  overflowY: "auto",
  "& li": {
    borderBottom: "1px solid #ddd", // Optional: adds a border between items
  },
});

const StepTitle = styled(Typography)({
  //   fontWeight: "bold",
  //   marginBottom: "8px",
});

const UploadText = styled(Typography)({
  cursor: "pointer",
  marginBottom: "-10px",
  color: "#007bff", // Blue color for link text
  //   textDecoration: "underline", // Underline to indicate it's clickable
});

function CreateGroupForm({
  groupName,
  errors,
  onChangeGroupName,
  onChangeSearchEmail,
  addMember,
  removeMember,
  groupIcon,
  members,
  setGroupIcon,
  setGroupName,
  userEmail,
  maxCount,
  searchEmail,
  setSearchEmail,
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [memberLoading, setMemberLoading] = useState(false);
  const theme = useTheme();
  const currentUser = useSelector(selectCurrentUser);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleAddMember = async () => {
    if (searchEmail.trim() === "") {
      setErrorMessage("Email cannot be empty.");
    } else if (searchEmail === currentUser?.email) {
      setErrorMessage("You are already a member of the group.");
    } else if (!emailRegex.test(searchEmail)) {
      setErrorMessage("Please enter a valid email address.");
    } else if (members.some((member) => member.email === searchEmail)) {
      setErrorMessage("This email has already been added.");
    } else {
      try {
        setMemberLoading(true);
        // console.log("Bankue");
        const uid = await queryUserByEmail(searchEmail)
          .then((result) => {
            // console.log(result);
            if (result) {
              addMember(result);
              setSearchEmail("");
              setErrorMessage("");
              setMemberLoading(false);
            }
          })
          .catch((error) => {
            setErrorMessage("Email isnt registered.");
            setMemberLoading(false);
          });
      } catch (error) {}
    }
  };

  const renderMemberList = () => {
    const loggedUser = {
      email: currentUser.email,
      name: `${currentUser.firstName} ${currentUser.lastName}`, // Placeholder for the user's name
      status: "ADMIN",
    };

    return [loggedUser, ...members].map((member, index) => (
      <GroupMemberListView key={member.email} member={member} index={index} />
      //   <ListItem key={member.email}>
      //     <ListItemAvatar>
      //       <Avatar>{member.name.charAt(0).toUpperCase()}</Avatar>
      //     </ListItemAvatar>
      //     <ListItemText
      //       primary={member.name}
      //       secondary={
      //         <>
      //           <Typography component="span" variant="body2" color="textPrimary">
      //             {member.email}
      //           </Typography>
      //           {index === 0 ? " - ADMIN" : ` - ${member.status}`}
      //         </>
      //       }
      //     />
      //   </ListItem>
    ));
  };

  //   console.log(errors);

  return (
    <form>
      <FormContainer>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "10px",
            }}
          >
            <StepTitle variant="text_base">Lets Create a team</StepTitle>
            {/* <StepTitle variant="text_xs">Group Information</StepTitle> */}
          </Box>
        </Box>
        <CustomFormInput
          label="Group Name or Alias"
          value={groupName}
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
            <FiUpload size={30} color={theme.palette.secondary.main} />
          )}
          <label htmlFor="icon-upload">
            <UploadText>
              {groupIcon ? "Change Group Icon" : "Select Group Icon"}
            </UploadText>
            <span
              style={{ fontSize: "10px", color: "#ccc", marginTop: "-20px" }}
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
          <span style={{ color: "red", marginTop: "-10px", fontSize: "10px" }}>
            {errors.groupIconError}
          </span>
        )}

        {/* <StepTitle variant="text_base">Add Members</StepTitle> */}
        <CustomFormInput
          label="Add team members by emails"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          fullWidth
          error={!!errorMessage}
          helperText={errorMessage}
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
    </form>
  );
}

export default CreateGroupForm;
