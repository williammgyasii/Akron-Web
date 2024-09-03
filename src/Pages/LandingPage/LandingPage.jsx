import { Box, Container, useTheme } from "@mui/material";
import { Button } from "antd";
import React from "react";
import LandingNavbar from "./components/LandingNavbar";

function LandingPage() {
  const theme = useTheme();

  return (
    <>
      <LandingNavbar />
      <div className="bg-red-200">WOEKRCAC</div>
    </>
  );
}

export default LandingPage;
