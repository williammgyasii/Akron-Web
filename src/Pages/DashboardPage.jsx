import { Box, Button, Container, IconButton, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { persistor, resetState } from "../Redux/store";
import { logoutUser } from "../Redux/Slices/Users/UsersSlice";
import { useNavigate } from "react-router-dom";
import AppBarComponent from "../Components/AppBarComponent";
import Logo from "../Components/Logo";
import GroupTaskList from "../Components/GroupTaskList";
import { selectGroupID } from "../Redux/Slices/Groups/groupsSlice";
import CustomTitles from "../Components/CustomTitles";
import { IoAddSharp } from "react-icons/io5";
import {
  setWelcomeModalOpen,
  showModal,
} from "../Redux/Slices/System/systemSlice";

function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading, status, error } = useSelector(
    (state) => state.user
  );
  const theme = useTheme();
  const selectedGroup = useSelector(selectGroupID);

  useEffect(() => {
    dispatch(setWelcomeModalOpen());

    return () => {};
  }, []);

  const handleLogout = () => {
    dispatch(resetState());
    dispatch(logoutUser());
    persistor.purge(); // Clear persisted state
    // Perform other logout logic, like redirecting to the login page
    navigate("/login", { replace: true });
    window.location.reload();
  };

  return (
    <Container disableGutters maxWidth={false} sx={{ position: "relative" }}>
      <Box sx={{ p: 1.5, display: "flex", height: "100vh" }}>
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
          }}
          flexGrow={1}
        >
          I am the other side
        </Box>
        <Box
          sx={{
            px: 1,
            overflowY: "auto",
            position: "relative",
            width: 300,
            marginLeft: "10px",
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
            [theme.breakpoints.down("tablets_port")]: {
              display: "none",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CustomTitles
              color={theme.palette.secondary.main}
              variant="text_base"
              // capitalize="none"
              weightFont={"medium"}
              customStyles={{
                textTransform: "none",

                display: "block",
                zIndex: 1,
                p: 1,
              }}
            >
              Tasks
            </CustomTitles>
            <IconButton
              onClick={() => dispatch(showModal("createTask"))}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark800, // Slightly lighter black on hover
                },
              }}
            >
              <IoAddSharp size={10} />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flex: 1,
            }}
          >
            <GroupTaskList groupId={selectedGroup} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default DashboardPage;
