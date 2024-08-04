import { Box, Container } from "@mui/material";
import React from "react";

function LandingPageNew() {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100svh",
        fontSize: 30,
      }}
    >
      <Box>I am the new landing page</Box>
    </Container>
  );
}

export default LandingPageNew;
