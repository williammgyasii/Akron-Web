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
  useTheme,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../Redux/Slices/Users/UsersSlice";
import NotifcationsManager from "./NotificationsMenu";
import UserAvatarMenu from "./UserAvatarMenu";

const AppBarComponent = ({ title, showOthers }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const currentUser = useSelector(selectCurrentUser);
  const randomImage = Math.floor(Math.random() * 100);
  const notificationCount = 4;

  const theme = useTheme();

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography
          variant="text_base"
          sx={{
            flexGrow: 1,
            fontSize: "1rem",
            color: theme.palette.secondary.main,
          }}
        >
          {title}
        </Typography>
        {showOthers && <NotifcationsManager />}
        {showOthers && <UserAvatarMenu />}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
