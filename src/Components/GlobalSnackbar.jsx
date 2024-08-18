import React from "react";
import { Snackbar, Alert, useTheme, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "../Redux/Slices/System/systemSlice";
import { IoCafe, IoInformation } from "react-icons/io5";

const GlobalSnackbar = () => {
  const dispatch = useDispatch();
  const { isSnackBarOpened, snackbarMessage, snackbarState } = useSelector(
    (state) => state.system
  );
  const theme = useTheme();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeSnackbar());
  };

  return (
    <Snackbar
      open={isSnackBarOpened}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity={snackbarState}
        sx={{
          width: "50%",
          backgroundColor: theme.palette.success.main,
          color: "#fff",
          p: 1,
          fontSize: theme.typography.text_base, // Increase font size
        }}
        // icon={false}
      >
        <Box display="flex" alignItems="center"></Box>
        <IoCafe sx={{ marginRight: "100px", fontSize: "4.5rem" }} />{" "}
        {/* Custom icon */}
        {snackbarMessage}
        <Box />
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
