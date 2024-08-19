import React from "react";
import { Box, CssBaseline, Typography, useTheme } from "@mui/material";

import CreateTaskFAB from "../Components/CreateTaskFAB";
import AppBarComponent from "../Components/AppBarComponent";

import DrawerNav from "../Components/DrawerNav";

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
      {/* LEFTSIDE */}
      <DrawerNav />

      <Box
        component="main"
        sx={{
          position: "relative",
          height: "100vh",
          width: "100%",
          
          // backgroundColor: "YELLOW",
        }}
      >
        <Box >{children}</Box>

        <CreateTaskFAB />
      </Box>
    </Box>
  );
};

export default DrawerLayout;
