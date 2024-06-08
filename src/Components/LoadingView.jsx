import { Box, CircularProgress } from "@mui/material";
import React from "react";

function LoadingView() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100%",
        // backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size={100} />
    </Box>
  );
}

export default LoadingView;
