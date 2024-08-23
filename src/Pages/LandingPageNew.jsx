import { Box, Container } from "@mui/material";
import { Button } from "antd";
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
      <div className="App">
        <Button type="primary">Button</Button>
      </div>
    </Container>
  );
}

export default LandingPageNew;
