import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
  Badge,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../Redux/Slices/Users/UsersSlice";
import NotifcationsManager from "./NotificationsManager";
import UserAvatarMenu from "./UserAvatarMenu";

const AppBarComponent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const currentUser = useSelector(selectCurrentUser);
  const randomImage = Math.floor(Math.random() * 100);
  const notificationCount = 4;

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const notifications = [
    "You have a new message",
    "Your order has been shipped",
    "Update available for download",
    "Your profile is 80% complete",
    "You have a new friend request",
    "Your subscription is expiring soon",
  ];

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontSize: "1rem" }}>
          Welcome Back! {currentUser.firstName}
        </Typography>

        <NotifcationsManager />
        <UserAvatarMenu />
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
