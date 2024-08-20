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
import {
  selectIsDrawerOpened,
  toggleDrawerIsOpened,
} from "../Redux/Slices/System/systemSlice";
import GroupSelector from "./GroupSelector";
import { drawerWidth, drawerWidthCollapsed } from "../Utils/Constants";

const AppBarComponent = ({ title, showOthers, pageHeader, customStyles }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const currentUser = useSelector(selectCurrentUser);
  const randomImage = Math.floor(Math.random() * 100);
  const notificationCount = 4;
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("tablets_port"));
  const isDrawerOpen = useSelector(selectIsDrawerOpened);

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        width: isDrawerOpen
          ? `calc(100% - 200px)`
          : `calc(100% - 60px)`, // Adjust width based on drawer state
        ml: isDrawerOpen
          ? `calc(100% - ${drawerWidth})`
          : `calc(100% - ${drawerWidth})`, // Adjust margin-left based on drawer state
        zIndex: 1200,
      }}
    >
      <Toolbar sx={[customStyles, { backgroundColor: "#fff" }]} disableGutters>
        {isSmallScreen && showOthers && (
          <IconButton onClick={() => dispatch(toggleDrawerIsOpened())}>
            <IoMenu />
          </IconButton>
        )}
        {pageHeader ? (
          <Typography
            variant={isSmallScreen ? "text_xs" : "text_xl"}
            sx={{
              flexGrow: 1,
              color: theme.palette.secondary.main,
            }}
          >
            {title}
          </Typography>
        ) : (
          <Typography
            variant={isSmallScreen ? "text_xs" : "text_base"}
            sx={{
              flexGrow: 1,
              color: theme.palette.secondary.main,
            }}
          >
            {title}
          </Typography>
        )}
        {/* <GroupSelector size="fullWidth" /> */}
        {showOthers && <NotifcationsManager />}
        {showOthers && <UserAvatarMenu />}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
