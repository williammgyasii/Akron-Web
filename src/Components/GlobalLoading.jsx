// src/components/LoadingModal.js
import React from "react";
import { Modal, Box, CircularProgress, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  hideGlobalLoading,
  selectAppInit,
  selectIsAppLoading,
  selectIsDrawerOpened,
} from "../Redux/Slices/System/systemSlice";

const GlobalLoading = () => {
  const globalLoadingState = useSelector((state)=>state.system.isAppLoading);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideGlobalLoading());
  };

  return (
    <Modal
      open={globalLoadingState}
    //   onClose={handleClose}
      aria-labelledby="loading-modal-title"
      aria-describedby="loading-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 24,
          p: 4,
          textAlign: "center",
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Box>
    </Modal>
  );
};

export default GlobalLoading;
