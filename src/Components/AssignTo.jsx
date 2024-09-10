import React, { useState } from "react";
import {
  Button,
  Chip,
  TextField,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";

// Styled component for Chips
const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const AssignTo = ({members}) => {
  const [emails, setEmails] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editing, setEditing] = useState(false);

  const handleAddEmail = () => {
    if (inputValue.trim() && !emails.includes(inputValue.trim())) {
      setEmails([...emails, inputValue.trim()]);
      setInputValue("");
    }
    setEditing(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddEmail();
    }
  };

  const handleRemoveEmail = (emailToRemove) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  return (
    <Box>
      {editing ? (
        <Box display="flex" alignItems="center">
          <TextField
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onBlur={handleAddEmail}
            autoFocus
            variant="outlined"
            placeholder="Enter email"
            size="small"
            sx={{ marginRight: 1 }}
          />
          <Button onClick={handleAddEmail} variant="contained">
            Add
          </Button>
        </Box>
      ) : (
        <Box display="flex" flexWrap="wrap" mb={1}>
          {emails.map((email) => (
            <StyledChip
              key={email}
              label={email}
              avatar={
                <Avatar src={`https://www.tapback.co/api/avatar.webp`} />
              }
              onDelete={() => handleRemoveEmail(email)}
            />
          ))}
          <IconButton onClick={() => setEditing(true)}>
            <AddIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default AssignTo;
