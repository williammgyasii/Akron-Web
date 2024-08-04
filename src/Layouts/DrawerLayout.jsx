import React from "react";
import { Box, CssBaseline } from "@mui/material";
import SidebarNav from "../Components/SideBarNav";

const Home = () => <div>Home Page</div>;
const Page1 = () => <div>Page 1</div>;
const Page2 = () => <div>Page 2</div>;
const Page3 = () => <div>Page 3</div>;

const sections = [
  { title: "Home", path: "/", component: <Home /> },
  { title: "Section 1", path: "/section1", component: <Page1 /> },
  { title: "Section 2", path: "/section2", component: <Page2 /> },
  { title: "Section 3", path: "/section3", component: <Page3 /> },
];

const DrawerLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <SidebarNav sections={sections} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
};

export default DrawerLayout;
