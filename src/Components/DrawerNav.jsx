import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskIcon from "@mui/icons-material/Assignment";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  selectIsDrawerOpened,
  toggleDrawerIsOpened,
} from "../Redux/Slices/System/systemSlice";
import { Link } from "react-router-dom";
import { IoMenuOutline } from "react-icons/io5";

const drawerWidth = 200;
const drawerWidthCollapsed = 60;

const AppDrawer = () => {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector(selectIsDrawerOpened);

  const handleDrawerToggle = () => {
    dispatch(toggleDrawerIsOpened());
  };

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      {/* Side Drawer */}
      <Drawer
        variant="permanent"
        anchor="left"
        open={isDrawerOpen}
        sx={{
          width: isDrawerOpen ? drawerWidth : drawerWidthCollapsed,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isDrawerOpen ? drawerWidth : drawerWidthCollapsed,
            alignContent: "center",
            boxSizing: "border-box",
            overflowX: "hidden",
            padding: isDrawerOpen ? "10px 15px" : "4px 3px",
            transition: "width 0.3s ease",
          },
        }}
      >
        {/* Logo Section */}
        <IconButton
          sx={{
            height: "40px",
            width: "auto",
            marginLeft: isDrawerOpen ? "auto" : null,
          }}
          onClick={handleDrawerToggle}
        >
          {isDrawerOpen ? <ChevronLeftIcon /> : <IoMenuOutline />}
        </IconButton>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            marginTop: isDrawerOpen ? "-5px" : "10px",
          }}
        >
          <Box
            component={Link}
            to={"/dashboard"}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              //   justifyContent: isDrawerOpen ? "space-between" : "center",
            }}
          >
            <img
              src={require("../Images/logo-main.png")}
              alt="App Logo"
              style={{ maxHeight: "40px" }}
            />
            {isDrawerOpen && (
              <Typography variant="text_base" noWrap sx={{ marginLeft: 2 }}>
                AKRON
              </Typography>
            )}
          </Box>
        </Box>

        {/* Navigation Sections */}
        <List>
          {/* First Section */}
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            {isDrawerOpen && <ListItemText primary="Dashboard" />}
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <TaskIcon />
            </ListItemIcon>
            {isDrawerOpen && <ListItemText primary="Tasks" />}
          </ListItem>
          <Divider />

          {/* Second Section */}
          <ListItem button>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            {isDrawerOpen && <ListItemText primary="Groups" />}
          </ListItem>
          <Divider />

          {/* Third Section */}
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            {isDrawerOpen && <ListItemText primary="Settings" />}
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default AppDrawer;
