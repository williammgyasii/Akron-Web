import React from "react";
import { Box, CssBaseline, Typography, useTheme } from "@mui/material";

import CreateTaskFAB from "../Components/CreateTaskFAB";
import AppBarComponent from "../Components/AppBarComponent";

import DrawerNav from "../Components/DrawerNav";
import { useSelector } from "react-redux";
import zIndex from "@mui/material/styles/zIndex";

const MainLayout = ({ children }) => {
  const { currentUser, loading, status, error } = useSelector(
    (state) => state.user
  );
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
      <DrawerNav />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          position: "relative",
          height: "100vh",
          // Adjust this margin-top to ensure content goes under the AppBar
        }}
      >
        <AppBarComponent
          title={`Welcome Back! ${currentUser.firstName}`}
          showOthers
        />
        <Box sx={{ mt:"5%" }}>{children}</Box>

        <CreateTaskFAB />
      </Box>
    </Box>
  );
};

export default MainLayout;
