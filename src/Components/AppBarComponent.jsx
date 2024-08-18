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
  useMediaQuery,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../Redux/Slices/Users/UsersSlice";
import NotifcationsManager from "./NotificationsMenu";
import UserAvatarMenu from "./UserAvatarMenu";
import { IoMenu } from "react-icons/io5";
import { toggleDrawerIsOpened } from "../Redux/Slices/System/systemSlice";

const AppBarComponent = ({ title, showOthers }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const currentUser = useSelector(selectCurrentUser);
  const randomImage = Math.floor(Math.random() * 100);
  const notificationCount = 4;
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("tablets_port"));

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        {isSmallScreen && showOthers && (
          <IconButton onClick={() => dispatch(toggleDrawerIsOpened())}>
            <IoMenu />
          </IconButton>
        )}
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
