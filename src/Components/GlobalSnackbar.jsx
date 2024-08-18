import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "../Redux/Slices/System/systemSlice";

const GlobalSnackbar = () => {
  const dispatch = useDispatch();
  const { isSnackBarOpened, snackbarMessage, snackbarState } = useSelector(
    (state) => state.system
  );

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeSnackbar());
  };

  return (
    <Snackbar
      open={isSnackBarOpened}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={snackbarState}
        sx={{ width: "100%" }}
      >
        {snackbarMessage}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
