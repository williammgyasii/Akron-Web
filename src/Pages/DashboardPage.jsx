import { Button, Container } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { persistor, resetState } from "../Redux/store";
import { logoutUser } from "../Redux/Slices/Users/UsersSlice";
import { useNavigate } from "react-router-dom";

function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading, status, error } = useSelector(
    (state) => state.user
  );

  const handleLogout = () => {
    dispatch(resetState());
    dispatch(logoutUser());
    persistor.purge(); // Clear persisted state
    // Perform other logout logic, like redirecting to the login page
    navigate("/login", { replace: true });
    window.location.reload();
  };

  return (
    <Container component={"main"} disableGutters maxWidth={false}>
      <Button
        onClick={handleLogout}
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Log Out
      </Button>
      <div>
        WELCOME TO THE DASBOARD MADAAME <span>{currentUser.firstName}</span>{" "}
      </div>
    </Container>
  );
}

export default DashboardPage;
