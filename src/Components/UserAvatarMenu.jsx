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
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  IoPersonOutline,
  IoSettingsOutline,
  IoLogOutOutline,
  IoSwapHorizontalSharp,
} from "react-icons/io5"; // Ionicons
import MenuItemWithIcon from "./MenuItemWithIcon";
import ProfileCard from "./ProfileCard";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../Redux/Slices/Users/UsersSlice";

const UserAvatarMenu = ({ imageUrl = "https://i.pravatar.cc/150?img=3" }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const AVATAR_SIZE = 30;
  const currentUser = useSelector(selectCurrentUser);
  const theme = useTheme();

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
            width: "180px", // Adjust the width here
            marginTop: 1,
            borderRadius: 1,
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
        <Box sx={{ padding: "12px 15px" }}>
          <ProfileCard
            name={currentUser.firstName + " " + currentUser.lastName}
            role={"Admin"}
          />
        </Box>
        <Divider />

        <Box sx={{ padding: "8px 10px" }}>
          <MenuItemWithIcon
            hoverColor={theme.palette.primary.main}
            handleClick={()=>handleMenuItemClick("profile")}
            text={"Profile"}
            icon={IoPersonOutline}
          />
          <MenuItemWithIcon
            hoverColor={theme.palette.primary.main}
            handleClick={()=>handleMenuItemClick("settings")}
            text={"Settings"}
            icon={IoSettingsOutline}
          />
          <MenuItemWithIcon
            hoverColor={theme.palette.primary.main}
            handleClick={()=>handleMenuItemClick("Refferals")}
            text={"Refferals"}
            icon={IoSwapHorizontalSharp}
          />
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
