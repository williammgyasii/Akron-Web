import { Box, Button, Container, useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { persistor, resetState } from "../Redux/store";
import { logoutUser } from "../Redux/Slices/Users/UsersSlice";
import { useNavigate } from "react-router-dom";
import AppBarComponent from "../Components/AppBarComponent";
import Logo from "../Components/Logo";

function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading, status, error } = useSelector(
    (state) => state.user
  );
  const theme = useTheme();

  const handleLogout = () => {
    dispatch(resetState());
    dispatch(logoutUser());
    persistor.purge(); // Clear persisted state
    // Perform other logout logic, like redirecting to the login page
    navigate("/login", { replace: true });
    window.location.reload();
  };

  return (
    <Container disableGutters maxWidth={false} sx={{ backgroundColor: "#fff" }}>
      <AppBarComponent
        title={`Welcome Back! ${currentUser.firstName}`}
        showOthers
        customStyles={{ px: 5 }}
      />
      {/* <Logo size="medium" /> */}
      <Box sx={{ p: 1.5, backgroundColor: "#F0F0F0" }} display={"flex"}>
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
            px: 2,
            height: "100vh",
            // backgroundColor: "red",
            width: 300,
            marginLeft: "10px",
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
            [theme.breakpoints.down("tablets_port")]: {
              display: "none",
            },
          }}
        >
          <AppBarComponent title={"Task"} />
        </Box>
      </Box>
    </Container>
  );
}

export default DashboardPage;
