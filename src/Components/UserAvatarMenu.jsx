import React, { useState } from "react";
import {
  IconButton,
  Avatar,
  Popover,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  IoPersonOutline,
  IoSettingsOutline,
  IoLogOutOutline,
} from "react-icons/io5"; // Ionicons
import MenuItemWithIcon from "./MenuItemWithIcon";

const UserAvatarMenu = ({ imageUrl = "https://i.pravatar.cc/150?img=3" }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const AVATAR_SIZE = 30;

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    handleClose();
    navigate(path);
  };

  return (
    <>
      <IconButton onClick={handleAvatarClick}>
        <Avatar sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}>
          <img
            src={imageUrl}
            alt="User Avatar"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Avatar>
      </IconButton>

      <Popover
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            width: "250px", // Adjust the width here
            marginTop:1
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ padding: "8px 16px" }}>
          <Typography variant="h6" align="center">
            User Menu
          </Typography>
        </Box>
        <Divider />

        <Box sx={{ padding: "8px 0" }}>
          <MenuItem onClick={() => handleMenuItemClick("profile")}>
            <IoPersonOutline style={{ marginRight: "8px" }} />
            Profile
          </MenuItem>
          <MenuItem onClick={() => console.log("Random Action 1")}>
            <IoSettingsOutline style={{ marginRight: "8px" }} />
            Preferences
          </MenuItem>
        </Box>
        <Divider />

        <Box sx={{ padding: "8px 0" }}>
          <MenuItem onClick={() => console.log("Random Action 2")}>
            <IoSettingsOutline style={{ marginRight: "8px" }} />
            Settings
          </MenuItem>
          <MenuItem onClick={() => console.log("Random Action 3")}>
            <IoSettingsOutline style={{ marginRight: "8px" }} />
            Account Info
          </MenuItem>
        </Box>
        <Divider />

        <Box sx={{ padding: "8px 0" }}>
          <MenuItem onClick={() => console.log("Random Action 4")}>
            <IoLogOutOutline style={{ marginRight: "8px" }} />
            Log Out
          </MenuItem>
        </Box>
        
      </Popover>
    </>
  );
};

export default UserAvatarMenu;
