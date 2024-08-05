import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  AddAlarm,
  AddOutlined,
  AddSharp,
  ArrowRightAlt,
  Logout,
  PlusOne,
} from "@mui/icons-material";
import { Link, NavLink, useLocation } from "react-router-dom";
import { DRAWER_CLOSED_WIDTH, DRAWER_WIDTH } from "../Utils/Constants";
import { DASHBOARD_ROUTES } from "../Routes/dashboardRoutes";
import { makeStyles } from "@mui/styles";
import VariableSizeIconButton from "./CustomIconButton";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsDrawerOpened,
  toggleDrawerIsOpened,
} from "../Redux/Slices/Misc/systemSlice";
import ProfileComponent from "./ProfileComponent";

const drawerWidth = DRAWER_WIDTH;

const openedMixin = (theme) => ({
  width: drawerWidth,
  padding: 8,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  padding: 5,
  width: `calc(${theme.spacing(4)} + 1px)`,
  [theme.breakpoints.up("phone")]: {
    width: DRAWER_CLOSED_WIDTH,
  },
});

const DrawerHeader = styled("div", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: open ? "center" : "flex-end",
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  // backgroundColor:"red",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SidebarNav = ({ sections }) => {
  // const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const location = useLocation();
  const dispatch = useDispatch();
  const open = useSelector(selectIsDrawerOpened);

  const toggleDrawer = () => {
    // setOpen(!open);
  };

  return (
    <Drawer variant="permanent" open={open}>
      {/* drawer header */}
      <DrawerHeader sx={{ minHeight: 10 }}>
        <IconButton onClick={() => dispatch(toggleDrawerIsOpened())}>
          {open ? <ChevronRightIcon /> : <MenuIcon />}
        </IconButton>
      </DrawerHeader>
      {/* <Divider /> */}

      {/* drawer first item */}
      <List>
        {DASHBOARD_ROUTES.map((section, index, isActive) => (
          <NavLink
            key={section.title}
            to={section.path}
            style={{ textDecoration: "none", color: "#9896A3" }}
          >
            <ListItem
              sx={{
                backgroundColor:
                  location.pathname === section.path ? "black" : "inherit",
                color: location.pathname === section.path ? "white" : "inherit",
                justifyContent: open ? "flex-end" : "center", // Center the icons when closed
                mb: 0.5,
                minHeight: 6,
                py: "4px",
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 10,
                  width: 35,
                  backgroundColor:
                    location.pathname === section.path ? "black" : "inherit",
                  color:
                    location.pathname === section.path ? "white" : "inherit",
                }}
              >
                {section.icon}
              </ListItemIcon>
              {open && <ListItemText primary={section.title} />}
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider sx={{ mt: 3 }} />

      <List>
        {open && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "#9896A3",
              px: 2,
              mb: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: ".8rem",
                fontWeight: 700,
              }}
            >
              PROJECTS
            </Typography>
            <VariableSizeIconButton
              onClick={() => console.log("ac")}
              size="tiny"
            >
              <AddSharp />
            </VariableSizeIconButton>
          </Box>
        )}
        {DASHBOARD_ROUTES.map((section, index, isActive) => (
          <NavLink
            key={section.title}
            to={section.path}
            style={{ textDecoration: "none", color: "#9896A3" }}
          >
            <ListItem
              sx={{
                backgroundColor:
                  location.pathname === section.path ? "black" : "inherit",
                color: location.pathname === section.path ? "white" : "inherit",
                justifyContent: open ? "flex-end" : "center", // Center the icons when closed
                mb: 0.5,
                minHeight: 6,
                py: "4px",
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 10,
                  width: 35,
                  backgroundColor:
                    location.pathname === section.path ? "black" : "inherit",
                  color:
                    location.pathname === section.path ? "white" : "inherit",
                }}
              >
                {section.icon}
              </ListItemIcon>
              {open && <ListItemText primary={section.title} />}
            </ListItem>
          </NavLink>
        ))}
      </List>

      <Button
        variant="primary"
        onClick={() => console.log("ac")}
        sx={{
          mt: "auto",
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
          borderRadius: 1,
          padding: 1,
          color: "#fff",
          gap: 1,
          "&:hover": {
            backgroundColor: "black", // Disable the default hover effect
          },
        }}
      >
        {open && <Typography sx={{ fontSize: 13 }}>Logout</Typography>}
        <Logout />
      </Button>
      <ProfileComponent
        name="John Doe"
        role="Software Engineer"
        avatarUrl="https://via.placeholder.com/150"
        sx={{ mb: 10 }}
      ></ProfileComponent>
    </Drawer>
  );
};

export default SidebarNav;
