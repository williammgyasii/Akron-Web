import React from "react";
import { Box, CssBaseline, Typography } from "@mui/material";
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

const DrawerLayout = ({ children }) => {
  const location = useLocation();
  const TO_DO_WIDTH = 200;
  //   console.log(location.pathname);
  const currentUser = useSelector(selectCurrentUser);

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarNav />
      {/* //RIGHT VIEW FOR THE  */}

      {/* MIDDLE VIEW */}
      <Box component="main" sx={{ flexGrow: 1, position: "relative" }}>
        <CreateTaskFAB />

        <Box>{children}</Box>
      </Box>

      {/* RIGHT VIEW */}
      <Box
        sx={{ p: 1, height: "100vh", width: 300, borderLeft: "1px solid #ccc" }}
      >
        <AppBarComponent
          title={"Task"}
          showOters
        />
      </Box>
    </Box>
  );
};

export default DrawerLayout;
