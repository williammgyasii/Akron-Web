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
  Box,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../Redux/Slices/Users/UsersSlice";
import NotifcationsManager from "./NotificationsMenu";
import UserAvatarMenu from "./UserAvatarMenu";
import { IoAddSharp, IoMenu } from "react-icons/io5";
import {
  selectIsDrawerOpened,
  showModal,
  toggleDrawerIsOpened,
} from "../Redux/Slices/System/systemSlice";
import GroupSelector from "./GroupSelector";
import { drawerWidth, drawerWidthCollapsed } from "../Utils/Constants";
import CustomTitles from "./CustomTitles";
import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";

const AppBarComponent = ({ title, showOthers, pageHeader, customStyles }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("tablets_port"));
  const isDrawerOpen = useSelector(selectIsDrawerOpened);

  const handleOpen = () => dispatch(showModal("createGroup"));

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        width: "100%", // Adjust width based on drawer state
        ml: isDrawerOpen
          ? `calc(100% - ${drawerWidth})`
          : `calc(100% - ${drawerWidth})`, // Adjust margin-left based on drawer state
        zIndex: 1200,
      }}
    >
      <Toolbar
        sx={[
          customStyles,
          {
            backgroundColor: theme.palette.secondary.main,
            px: 2,
            minHeight: "20px",
            display: "flex",
            justifyContent: "space-between",
          },
        ]}
        disableGutters
      >
        {isSmallScreen && showOthers && (
          <IconButton onClick={() => dispatch(toggleDrawerIsOpened())}>
            <IoMenu color="#fff" />
          </IconButton>
        )}
        <Box
          component={Link}
          to={"/dashboard"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
          }}
        >
          <img
            src={require("../Images/logo-main.png")}
            alt="App Logo"
            style={{ maxHeight: "30px" }}
          />
          {/* {isDrawerOpen && isSmallScreen && (
            <CustomTitles
              color={theme.palette.primary.white}
              variant="text_lg"
              weightFont={"medium"}
              noWrap
              customStyles={{ marginLeft: 1 }}
            >
              AKRON
            </CustomTitles>
          )} */}
        </Box>
        <CustomTitles
          variant={isSmallScreen ? "text_xs" : "text_sm"}
          sx={{
            flexGrow: 1,
            color: "#fff",
            display: "inline-block",
            // width: "300px",
            textAlign: "left",
            marginLeft: 10,
            textTransform: "none",
          }}
        >
          {title}
        </CustomTitles>

        <CustomButton
          variant="primary"
          size="small"
          // loading={loading}
          leftIcon={IoAddSharp}
          onClick={handleOpen}
          sx={{ width: "170px" }}
          type="iconLeft" // Submit button for the form
          // label="Submit"
        >
          Create Group
        </CustomButton>

        {/* <GroupSelector size="fullWidth" /> */}
        {showOthers && <NotifcationsManager />}
        {showOthers && <UserAvatarMenu />}
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
