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
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { DRAWER_CLOSED_WIDTH, DRAWER_WIDTH } from "../Utils/Constants";
import { DASHBOARD_ROUTES } from "../Routes/dashboardRoutes";
import { makeStyles } from "@mui/styles";
import VariableSizeIconButton from "./CustomIconButton";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsDrawerOpened,
  toggleDrawerIsOpened,
} from "../Redux/Slices/System/systemSlice";
import ProfileComponent from "./ProfileComponent";
import { persistor, resetState } from "../Redux/store";
import { logoutUser } from "../Redux/Slices/Users/UsersSlice";
import Logo from "./Logo";

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
  justifyContent: "center",
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
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(resetState());
    dispatch(logoutUser());
    persistor.purge(); // Clear persisted state
    // Perform other logout logic, like redirecting to the login page
    navigate("/login", { replace: true });
    window.location.reload();
  };
  return (
    <Drawer variant="permanent" open={open}>
      {/* drawer header */}
      <DrawerHeader sx={{ minHeight: 10 }}>
        <Logo size="medium"/>
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
              px: 1,
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
                  location.pathname === section.path ? "#F5F5F7" : "inherit",
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
                    location.pathname === section.path ? "#F5F5F7" : "inherit",
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


        {/* CHANGE TO THE NEED HELP SOLUTIONS */}
      <ProfileComponent
        role="Software Engineer"
        avatarUrl="https://via.placeholder.com/150"
        style={{ mb: 2, mt: "auto" }}
      />

      <Button
        variant="primary"
        onClick={handleLogout}
        sx={{
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "red",
          borderRadius: 1,
          padding: .5,
          color: "#fff",
          gap: 1,
          "&:hover": {
            backgroundColor: "black", // Disable the default hover effect
          },
        }}
      >
        {open && <Typography sx={{ fontSize: 11 }}>Logout</Typography>}
        <Logout  />
      </Button>
    </Drawer>
  );
};

export default SidebarNav;
