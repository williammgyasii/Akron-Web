import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { styled, useTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

// You can use styled-components or MUI's `styled` function for custom styling
const appLogo = require("../Images/logo-main.png");
const LogoContainer = styled("div")(({ theme, size }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  // Adjust the logo size based on props
  width: size === "large" ? "150px" : size === "medium" ? "40px" : "50px",
  height: "auto",
}));

function Logo({ src, alt = "Logo", size = "medium" }) {
  const theme = useTheme();
  return (
    <LogoContainer size={size}>
      <Link
        style={{ textDecoration: "none" }}
        color={theme.palette.primary.dark900}
        to="/dashboard"
      >
        <img
          src={appLogo}
          alt={alt}
          style={{ width: "100%", height: "auto" }}
        />
        <Typography variant="text_base">Akron</Typography>
      </Link>
    </LogoContainer>
  );
}

Logo.propTypes = {
  src: PropTypes.string.isRequired, // Path to the logo image
  alt: PropTypes.string, // Alt text for the image
  size: PropTypes.oneOf(["small", "medium", "large"]), // Size of the logo
};

export default Logo;
