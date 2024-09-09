import React from "react";
import {
  Snackbar,
  Alert,
  useTheme,
  Box,
  SnackbarContent,
  Button,
  IconButton,
  styled,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackbar } from "../Redux/Slices/System/systemSlice";
import { IoCafe, IoInformation } from "react-icons/io5";
import { MdCheckCircle, MdClose } from "react-icons/md";

const CenteredSnackbarContent = styled(SnackbarContent)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  backgroundColor: theme.palette.secondary.main, // Example background color
  color: theme.palette.common.white,
}));

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
      autoHideDuration={4000}
      onClose={handleClose}
      sx={{
        width: "25%",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto",
      }}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <CenteredSnackbarContent
        message={
          <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <MdCheckCircle size={24} /> {/* Example icon */}
            {snackbarMessage}
          </span>
        }
        action={
          <IconButton size="small" color="inherit" onClick={handleClose}>
            <MdClose />
          </IconButton>
        }
      />
    </Snackbar>
  );
};

export default GlobalSnackbar;
