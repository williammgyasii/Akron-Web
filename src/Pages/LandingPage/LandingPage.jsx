import { Box, Container } from "@mui/material";
import { Button } from "antd";
import React from "react";
import LandingPageHeader from "./_components/LandingPageHeader";
import LandingBanner from "./_components/LandingBanner";

function LandingPageNew() {
  const LandingPageBanners = () => (
    <Container component={"main"}>
      <section id="support" style={{ padding: "100px 0" }}>
        Support Section
      </section>
      <section id="features" style={{ padding: "100px 0" }}>
        Features Section
      </section>
      <section id="testimonials" style={{ padding: "100px 0" }}>
        Testimonials Section
      </section>
      <section id="login" style={{ padding: "100px 0" }}>
        Login Section
      </section>
    </Container>
  );
  return (
    <Container
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "center",
        minHeight: "100svh",
        fontSize: 30,
      }}
    >
      <LandingPageHeader />
      <LandingBanner />
      <LandingPageBanners />
    </Container>
  );
}

export default LandingPageNew;
