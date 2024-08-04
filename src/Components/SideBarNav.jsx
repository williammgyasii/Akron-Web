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
import { ArrowRightAlt } from "@mui/icons-material";
import { Link, NavLink, useLocation } from "react-router-dom";
import { DRAWER_WIDTH } from "../Utils/Constants";
import { DASHBOARD_ROUTES } from "../Routes/dashboardRoutes";
import { makeStyles } from "@mui/styles";

const drawerWidth = DRAWER_WIDTH;

const useStyles = makeStyles((theme) => ({
  active: {
    backgroundColor: "#000",
  },
  link: {
    textDecoration: "none",
    color: "pink",
    
    "&.active": {
      backgroundColor: "yellow",
    },
  },
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  padding: 7,
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
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  // backgroundColor:"#000",
  //   padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  padding: 4,
  //   backgroundColor:"red",
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
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const location = useLocation();
  const classes = useStyles();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Drawer variant="permanent" open={open}>
      {/* drawer header */}
      <DrawerHeader>
        <IconButton onClick={toggleDrawer}>
          {open ? <ChevronRightIcon /> : <MenuIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />

      {/* drawer first item */}
      <List>
        {DASHBOARD_ROUTES.map((section, index, isActive) => (
          <ListItem
            key={section.title}
            to={section.path}
            component={Link}
            sx={classes.link}
          >
            <ListItemIcon sx={{minWidth:35}}>{section.icon}</ListItemIcon>
            <ListItemText primary={section.title} />
          </ListItem>
        ))}
      </List>
      <Divider />

      {/* <List>
      {sections.map((section, index) => (
          <ListItem
            button
            key={section.title}
            component={Link}
            to={section.path}
            sx={{
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
              backgroundColor:
                location.pathname === section.path ? "black" : "inherit",
              color: location.pathname === section.path ? "white" : "inherit",
            }}
          >
            <ListItemText primary={section.title} />
          </ListItem>
        ))}
      </List> */}
    </Drawer>
  );
};

export default SidebarNav;
