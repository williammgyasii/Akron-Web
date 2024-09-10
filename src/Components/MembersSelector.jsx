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
  Autocomplete,
} from "@mui/material";
import CustomFormInput from "./CustomFormInput";
import { PersonAdd } from "@mui/icons-material";
import CustomButton from "./CustomButton";

const MembersSelector = ({ setMembers }) => {
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

  const handleChange = (event, newValue) => {
    // Avoid adding duplicate members based on email
    const uniqueMembers = newValue.filter(
      (member, index, self) =>
        index === self.findIndex((m) => m.email === member.email)
    );
    setSelectedMembers(uniqueMembers);
  };

  const handleDelete = (memberToDelete) => {
    // Remove the member from selectedMembers array
    setSelectedMembers((prevSelectedMembers) =>
      prevSelectedMembers.filter(
        (member) => member.email !== memberToDelete.email
      )
    );
  };

  return (
    <Box>
      <Autocomplete
        id="size-small-filled-multi"
        size="small"
        options={members}
        getOptionLabel={(option) => option.name}
        value={selectedMembers}
        onChange={handleChange}
        multiple
        isOptionEqualToValue={(option, value) => option.email === value.email} // Avoid duplicate display in dropdown
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            const { key, ...tagProps } = getTagProps({ index });
            return (
              <Chip
                key={key}
                variant="outlined"
                label={option.name}
                avatar={<Avatar>{option.name[0]}</Avatar>} // Show avatar with first letter of name
                size="small"
                onDelete={() => handleDelete(option)} // Remove member when delete icon is clicked
                {...tagProps}
              />
            );
          })
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Project Members"
            placeholder="Add members by email"
          />
        )}
      />
      {/* <CustomFormInput
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
                    padding: "2px 4px",
                  }}
                  onClick={handleSearch}
                >
                  Invite
                </Button>
              )}
            </Box>
          ),
        }}
      /> */}
    </Box>
  );
};

export default MembersSelector;
