import React, { useState } from "react";
import {
  TextField,
  Button,
  Chip,
  Avatar,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  useTheme,
} from "@mui/material";
import CustomFormInput from "./CustomFormInput";
import { PersonAdd } from "@mui/icons-material";
import CustomButton from "./CustomButton";

const MembersSelector = ({}) => {
  const members = [
    {
      email: "john@example.com",
      name: "John Doe",
      avatar: "/path/to/avatar1.jpg",
    },
    {
      email: "jane@example.com",
      name: "Jane Smith",
      avatar: "/path/to/avatar2.jpg",
    },
    // Other members
  ];
  const [searchValue, setSearchValue] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [errors, setErrors] = useState({
    memberError: "",
  });
  const [memberloading, setMemberLoading] = useState(false);
  const theme = useTheme();

  const handleSearch = () => {
    // Find the member by email
    const foundMember = members.find((member) => member.email === searchValue);

    if (
      foundMember &&
      !selectedMembers.some((member) => member.email === foundMember.email)
    ) {
      // Add to selected members
      setSelectedMembers([...selectedMembers, foundMember]);
      setSearchValue(""); // Clear search after adding
    }
  };

  const handleDelete = (email) => {
    // Remove member from selected members

    setSelectedMembers(
      selectedMembers.filter((member) => member.email !== email)
    );
  };

  return (
    <Box>
      <CustomFormInput
        label="Add project members by email"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        fullWidth
        error={!!errors.memberError}
        helperText={errors.emailError}
        InputProps={{
          endAdornment: (
            <Box>
              {memberloading ? (
                <CircularProgress />
              ) : (
                <Button
                  sx={{
                    backgroundColor: theme.palette.zinc.main,
                    color: theme.palette.zinc.light,
                    padding:"2px 4px"
                  }}
                  onClick={handleSearch}
                >
                  Invite
                </Button>
              )}
            </Box>
          ),
        }}
      />

      <Box display="flex" mt={2} flexWrap="wrap" gap={1}>
        {selectedMembers.length === 0 && (
          <Typography>No members invited yet.</Typography>
        )}
        {selectedMembers.map((member) => (
          <Chip
            key={member.email}
            avatar={<Avatar src={member.avatar} />}
            label={member.name}
            onDelete={() => handleDelete(member.email)}
            sx={{ backgroundColor: "#f3f3f3" }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MembersSelector;
