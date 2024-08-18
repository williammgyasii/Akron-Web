import React from "react";
import { Box, CssBaseline, Typography, useTheme } from "@mui/material";
import SidebarNav from "../Components/SideBarNav";
import { Route, Routes, useLocation } from "react-router-dom";
import ProfilePage from "../Pages/ProfilePage";
import { AccountBox, Dashboard } from "@mui/icons-material";
import DashboardPage from "../Pages/DashboardPage";
import { DRAWER_WIDTH } from "../Utils/Constants";
import TasksList from "../Components/TaskLists";
import CreateTaskFAB from "../Components/CreateTaskFAB";
import AppBarComponent from "../Components/AppBarComponent";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../Redux/Slices/Users/UsersSlice";
import AppDrawer from "../Components/DrawerNav";

const DrawerLayout = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        [theme.breakpoints.down("tablets_port")]: {
          flexDirection: "column",
        },
      }}
    >
      <AppDrawer />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          position: "relative",
          height: "100vh",
          px:2,
          backgroundColor: "#fff",
        }}
      >
        <CreateTaskFAB />
        <Box>{children}</Box>
      </Box>

      {/* RIGHT VIEW */}
      <Box
        sx={{
          p: 1,
          height: "100vh",
          width: 300,
          borderLeft: "1px solid #ccc",
          [theme.breakpoints.down("tablets_port")]: {
            display: "none",
          },
        }}
      >
        <AppBarComponent title={"Task"} />
      </Box>
    </Box>
  );
};

export default DrawerLayout;
