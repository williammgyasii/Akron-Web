import React, { useState } from "react";
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
  useMediaQuery,
  styled,
} from "@mui/material";
import {
  closeDrawer,
  selectIsDrawerOpened,
  showModal,
  toggleDrawerIsOpened,
} from "../Redux/Slices/System/systemSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { IoAddSharp, IoLogOut } from "react-icons/io5";
import { DASHBOARD_ROUTES } from "../Routes/dashboardRoutes";
import CustomButton from "./CustomButton";
import GroupSelector from "./GroupSelector";
import { drawerWidth, drawerWidthCollapsed } from "../Utils/Constants";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";
import ProjectNavList from "./ProjectNavList";
import { logoutUser } from "../Redux/Slices/Users/UsersSlice";
import { persistor, resetState } from "../Redux/store";
import CustomTitles from "./CustomTitles";
import CreateProjectModal from "./CreateProjectModal";

const StyledListItemText = styled(ListItemText)({
  "& .MuiTypography-root": {
    fontSize: "0.855rem", // Adjust font size here
  },
});

const DrawerNav = () => {
  const dispatch = useDispatch();
  const isDrawerOpen = useSelector(selectIsDrawerOpened);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("tablets_port"));
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const handleDrawerToggle = () => {
    dispatch(toggleDrawerIsOpened());
  };
  const handleDrawerClose = () => {
    dispatch(closeDrawer());
  };
  const openProjectModal = () => {
    setOpenModal(true);
  };
  const closeProjectModal = () => {
    setOpenModal(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        dispatch(resetState());
        persistor.purge();
        navigate("/login", { replace: true });
        window.location.reload();
      });
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
            mt: isSmallScreen ? 0 : 5,
            padding: isDrawerOpen ? "5px 9px" : "4px 2px",
            transition: "width 0.3s ease",
            backgroundColor: theme.palette.secondary.main,
            color: "#fff",
            zIndex: 1100,
            // borderRadius:4,
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
            color: "#fff",
            marginLeft: isDrawerOpen ? "auto" : null,
          }}
          onClick={handleDrawerToggle}
        >
          {isDrawerOpen ? (
            <TbLayoutSidebarLeftExpand />
          ) : (
            <TbLayoutSidebarLeftCollapseFilled />
          )}
        </IconButton>

        {isDrawerOpen && <GroupSelector size="fullWidth" />}

        <List>
          {DASHBOARD_ROUTES.map((section) => (
            <NavLink
              key={section.title}
              to={section.path}
              style={{
                textDecoration: "none",
                color: "#9896A3",
                display: section.noView ? "none" : "block",
              }}
            >
              <ListItem
                sx={{
                  color: theme.palette.primary.white,
                  borderRadius: 1,
                  padding: "3px 15px",
                  marginBottom: isDrawerOpen ? 0 : 2,
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
                    minWidth: isDrawerOpen ? 13 : 3,
                    width: isDrawerOpen ? 25 : 20,
                    textAlign: "center",
                    color: theme.palette.primary.white,
                    "& svg": {
                      fontSize: isDrawerOpen ? 13 : 18, // Adjust the font size of the icon (default is 24)
                    },
                  }}
                >
                  {section.icon}
                </ListItemIcon>
                {isDrawerOpen && <StyledListItemText primary={section.title} />}
              </ListItem>
            </NavLink>
          ))}
        </List>

        <Divider
          sx={{ backgroundColor: theme.palette.primary.white, marginTop: 1.5 }}
        />

        <List>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CustomTitles
              color={theme.palette.primary.white}
              variant="text_xs"
              // capitalize="none"
              weightFont={"medium"}
              customStyles={{
                textTransform: "none",
                display: "block",
                zIndex: 1,
                p: 1,
              }}
            >
              Projects
            </CustomTitles>
            <IconButton
              onClick={openProjectModal}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
                borderRadius: 1,
                p: 0.5,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark800, // Slightly lighter black on hover
                },
              }}
            >
              <IoAddSharp size={10} />
            </IconButton>
          </Box>
          {/* show projects */}
          <ProjectNavList />
        </List>

        <CustomButton
          variant="secondary"
          size="small"
          isLoading={false}
          onClick={handleLogout}
          leftIcon={IoLogOut}
          sx={{
            marginTop: "auto",
            marginBottom: "4rem",
            backgroundColor: theme.palette.error.main,
          }}
          type="iconLeft" // Submit button for the form
          // label="Submit"
        >
          {isDrawerOpen && "Logout"}
        </CustomButton>
      </Drawer>

      <CreateProjectModal
        openModal={openModal}
        onCloseModal={closeProjectModal}
      />
    </Box>
  );
};

export default DrawerNav;
