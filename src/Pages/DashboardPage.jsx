import { Box, Button, Container, useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { persistor, resetState } from "../Redux/store";
import { logoutUser } from "../Redux/Slices/Users/UsersSlice";
import { useNavigate } from "react-router-dom";
import AppBarComponent from "../Components/AppBarComponent";
import Logo from "../Components/Logo";
import GroupTaskList from "../Components/GroupTaskList";
import { selectGroupID } from "../Redux/Slices/Groups/groupsSlice";
import CustomTitles from "../Components/CustomTitles";

function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading, status, error } = useSelector(
    (state) => state.user
  );
  const theme = useTheme();
  const selectedGroup = useSelector(selectGroupID);

  const handleLogout = () => {
    dispatch(resetState());
    dispatch(logoutUser());
    persistor.purge(); // Clear persisted state
    // Perform other logout logic, like redirecting to the login page
    navigate("/login", { replace: true });
    window.location.reload();
  };

  return (
    <Container disableGutters maxWidth={false}  sx={{ position: "relative" }}>
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
            py: 2,
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
          <CustomTitles
            color={theme.palette.secondary.main}
            variant="text_base"
            // capitalize="none"
            weightFont={"medium"}
            customStyles={{
              textTransform: "none",
              textAlign: "center",
              display: "block",
              zIndex: 1,
              p: 1,
              borderBottom: "1px solid #ccc",
            }}
          >
            Tasks
          </CustomTitles>
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
