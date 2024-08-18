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
      />
      {/* <Logo size="medium" /> */}
      <Box sx={{ p: 5 }} display={"flex"}>
        <Box flexGrow={1}>I am the other side</Box>
        <Box
          sx={{
            px: 2,
            height: "100vh",
            // backgroundColor: "red",
            width: 250,
            borderLeft: "1px solid #ccc",
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
