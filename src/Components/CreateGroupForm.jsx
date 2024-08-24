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
} from "@mui/material";
import { PhotoCamera, PersonAdd } from "@mui/icons-material";
import { styled } from "@mui/system";
import CustomFormInput from "./CustomFormInput";

const FormContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  // maxWidth: '400px',
  margin: "0 auto",
});

const GroupIconContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "16px",
});

const MembersList = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
});

const StepTitle = styled(Typography)({
  //   fontWeight: "bold",
  //   marginBottom: "8px",
});

function CreateGroupForm() {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [groupIcon, setGroupIcon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleAddMember = () => {
    if (searchEmail && !members.includes(searchEmail)) {
      setMembers([...members, searchEmail]);
      setSearchEmail("");
    }
  };

  const handleRemoveMember = (email) => {
    setMembers(members.filter((member) => member !== email));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Form submission logic here
    setTimeout(() => {
      setLoading(false);
      // Handle success or error
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormContainer>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <Avatar
            src={groupIcon ? URL.createObjectURL(groupIcon) : null}
            alt="Group Icon"
            sx={{ width: 50, height: 50 }}
          /> */}
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
          darkLabel
          label="Group Name or Alias"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          fullWidth
          required
          helperText={errors.groupName}
          error={!!errors.groupName}
        />

        {/* <StepTitle variant="text_base">Add Members</StepTitle> */}
        <TextField
          label="Add team members by emails"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleAddMember}>
                <PersonAdd />
              </IconButton>
            ),
          }}
        />
        <MembersList>
          {members.map((email) => (
            <Chip
              key={email}
              label={email}
              onDelete={() => handleRemoveMember(email)}
            />
          ))}
        </MembersList>

        <GroupIconContainer>
          <Avatar
            src={groupIcon ? URL.createObjectURL(groupIcon) : null}
            alt="Group Icon"
            sx={{ width: 56, height: 56 }}
          />
          <Button
            variant="contained"
            component="label"
            startIcon={<PhotoCamera />}
          >
            Upload Icon
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setGroupIcon(e.target.files[0])}
            />
          </Button>
        </GroupIconContainer>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Create Group"}
        </Button>
      </FormContainer>
    </form>
  );
}

export default CreateGroupForm;
