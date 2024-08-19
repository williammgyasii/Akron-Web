import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Box,
  useTheme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TaskIcon from "@mui/icons-material/Assignment";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  closeDrawer,
  selectIsDrawerOpened,
  toggleDrawerIsOpened,
} from "../Redux/Slices/System/systemSlice";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IoLogOut, IoMenuOutline, IoSettings } from "react-icons/io5";
import CustomTitles from "./CustomTitles";
import VariableSizeIconButton from "./CustomIconButton";
import { AddSharp } from "@mui/icons-material";
import { DASHBOARD_ROUTES } from "../Routes/dashboardRoutes";
import CustomButton from "./CustomButton";

const drawerWidth = 200;
const drawerWidthCollapsed = 60;

const DrawerNav = () => {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector(selectIsDrawerOpened);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("tablets_port"));

  const handleDrawerToggle = () => {
    dispatch(toggleDrawerIsOpened());
  };
  const handleDrawerClose = () => {
    dispatch(closeDrawer());
  };

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      {/* Side Drawer */}
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        anchor="left"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        sx={{
          width: isDrawerOpen ? drawerWidth : drawerWidthCollapsed,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isDrawerOpen ? drawerWidth : drawerWidthCollapsed,
            alignContent: "center",
            boxSizing: "border-box",
            overflowX: "hidden",
            padding: isDrawerOpen ? "10px 15px" : "4px 2px",
            transition: "width 0.3s ease",
          },
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
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
              textDecoration: "none",
            }}
          >
            <img
              src={require("../Images/logo-main.png")}
              alt="App Logo"
              style={{ maxHeight: "40px" }}
            />
            {isDrawerOpen && (
              <CustomTitles
                color={theme.palette.secondary.main}
                variant="text_lg"
                weightFont={"medium"}
                noWrap
                customStyles={{ marginLeft: 1 }}
              >
                AKRON
              </CustomTitles>
            )}
          </Box>
        </Box>

        <List sx={{ marginTop: 2 }}>
          {DASHBOARD_ROUTES.map((section, index, isActive) => (
            <NavLink
              key={section.title}
              to={section.path}
              style={{
                textDecoration: "none",
                color: "#9896A3",
                display: section.subRoute ? "none" : "block",
              }}
            >
              <ListItem
                sx={{
                  color: theme.palette.secondary.main,
                  borderRadius: 2,
                  //   marginBottom:".4rem",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    "& .MuiListItemIcon-root": {
                      color: "white",
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: isDrawerOpen ? 10 : 3,
                    width: isDrawerOpen ? 35 : null,
                    color: theme.palette.secondary.main,
                    "& svg": {
                      fontSize: 18, // Adjust the font size of the icon (default is 24)
                    },
                  }}
                >
                  {section.icon}
                </ListItemIcon>
                {isDrawerOpen && (
                  <ListItemText
                    sx={{ fontSize: ".8rem" }}
                    primary={section.title}
                  />
                )}
              </ListItem>
            </NavLink>
          ))}
        </List>

        <CustomButton
          variant="secondary"
          size="large"
          // loading={loading}
          leftIcon={IoLogOut}
          sx={{
            marginTop: "auto",
            marginBottom: "4rem",
            backgroundColor: theme.palette.error.main,
          }}
          type="iconLeft" // Submit button for the form
          // label="Submit"
          submit
        >
          {isDrawerOpen && "Logout"}
        </CustomButton>
      </Drawer>
    </Box>
  );
};

export default DrawerNav;
