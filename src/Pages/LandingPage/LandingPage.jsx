import { Box, Container } from "@mui/material";
import { Button } from "antd";
import React from "react";
import LandingBanner from "./_components/LandingBanner";
import LandingPageAppbar from "./_components/LandingAppbar";

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
    <Container disableGutters>
      <LandingPageAppbar />
      <Container
        disableGutters
        sx={{ position: "relative", maxWidth: "1150px" }}
        component={"main"}
      >
        <LandingBanner />
        <LandingPageBanners />
      </Container>
    </Container>
  );
}

export default LandingPageNew;
