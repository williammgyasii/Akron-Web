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
} from "@mui/material";
import { PhotoCamera, PersonAdd, UploadFile } from "@mui/icons-material";
import { styled } from "@mui/system";
import CustomFormInput from "./CustomFormInput";
import { FiUpload } from "react-icons/fi";
import CustomButton from "./CustomButton";

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

const MembersList = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
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
  onChangeGroupName,
  onChangeSearchEmail,
  onAddMember,
  removeMember,
}) {
  const [members, setMembers] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [groupIcon, setGroupIcon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const theme = useTheme();

  //     // Form submission logic here
  //     setTimeout(() => {
  //       setLoading(false);
  //       // Handle success or error
  //     }, 2000);
  //   };

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
          onChange={onChangeGroupName}
          fullWidth
          required
          helperText={errors.groupName}
          error={!!errors.groupName}
        />

        <GroupIconContainer>
          {groupIcon ? (
            <Avatar
              src={groupIcon ? URL.createObjectURL(groupIcon) : null}
              alt="Group Icon"
              sx={{ width: 60, height: 60, marginBottom: "10px" }}
            />
          ) : (
            <FiUpload size={30} color={theme.palette.secondary.main} />
          )}
          <label htmlFor="icon-upload">
            <UploadText>Click to upload</UploadText>
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

        {/* <StepTitle variant="text_base">Add Members</StepTitle> */}
        <CustomFormInput
          label="Add team members by emails"
          value={searchEmail}
          onChange={onChangeSearchEmail}
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton onClick={onAddMember}>
                <PersonAdd sx={{ color: theme.palette.primary.main }} />
              </IconButton>
            ),
          }}
        />
        <MembersList>
          {members.map((email) => (
            <Chip
              key={email}
              label={email}
              onDelete={() => removeMember(email)}
            />
          ))}
        </MembersList>

        <CustomButton variant="primary" fullWidth disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Create Group"}
        </CustomButton>
      </FormContainer>
    </form>
  );
}

export default CreateGroupForm;
