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
      <AppBarComponent
        title={`Welcome Back! ${currentUser.firstName}`}
        showOthers
        customStyles={{ px: 5, py: 1,zIndex:100 }}
      />
      <DrawerNav />

      <Box
        component="main"
        sx={{
          position: "relative",
          height: "100vh",
          width: "100%",
          overflowY: "auto", // Ensure content is scrollable
          // backgroundColor: "YELLOW",
        }}
      >
        <Box>{children}</Box>

        <CreateTaskFAB />
      </Box>
    </Box>
  );
};

export default MainLayout;
