import React from "react";
import { Box, CssBaseline } from "@mui/material";
import SidebarNav from "../Components/SideBarNav";

const sections = [
  { title: "Section 1" },
  { title: "Section 2" },
  { title: "Section 3" },
];

const DrawerLayout = ({ children }) => (
  <Box sx={{ display: "flex" }}>
    <SidebarNav sections={sections} />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      {children}
    </Box>
  </Box>
);

export default DrawerLayout;
