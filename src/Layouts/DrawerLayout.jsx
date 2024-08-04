import React from "react";
import { Box, CssBaseline, Typography } from "@mui/material";
import SidebarNav from "../Components/SideBarNav";
import { Route, Routes, useLocation } from "react-router-dom";
import ProfilePage from "../Pages/ProfilePage";
import { AccountBox, Dashboard } from "@mui/icons-material";
import DashboardPage from "../Pages/DashboardPage";
import { DRAWER_WIDTH } from "../Utils/Constants";

const DrawerLayout = ({ children }) => {
  const location = useLocation();
  const TO_DO_WIDTH = 200;
//   console.log(location.pathname);

  
  return (
    <Box sx={{ display: "flex" }}>
      <SidebarNav />
      {/* //RIGHT VIEW FOR THE  */}
      <Box component="main" sx={{ flexGrow: 1,p:1 }}>
        {children}
      </Box>
      <Box sx={{ backgroundColor: "red", p: 1, height: "100vh", width: 300 }}>
        <Typography>The todo section of the app</Typography>
      </Box>
    </Box>
  );
};

export default DrawerLayout;
