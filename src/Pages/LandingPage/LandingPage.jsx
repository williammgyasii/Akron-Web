import { Box, Container, useTheme } from "@mui/material";
import { Button } from "antd";
import React from "react";
import LandingNavbar from "./components/LandingNavbar";
import LandingHeroSection from "./components/LandingHeroSection";
import { AnimatePresence } from "framer-motion";
import LandingStartupSection from "./components/LandingStartupSection";

function LandingPage() {
  const theme = useTheme();

  return (
    <>
      <LandingNavbar />
      <main>
        <AnimatePresence>
          <LandingHeroSection />
          <LandingStartupSection />
        </AnimatePresence>
      </main>

      <div className="bg-red-200">WOEKRCAC</div>
    </>
  );
}

export default LandingPage;
