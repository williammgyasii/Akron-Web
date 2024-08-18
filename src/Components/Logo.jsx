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
  width: size === "large" ? "150px" : size === "medium" ? "40px" : "50px",
  height: "auto",
}));

function Logo({ alt = "Logo", size = "medium" }) {
  const theme = useTheme();
  return (
    <LogoContainer size={size}>
      <Link
        style={{ textDecoration: "none" }}
        color={theme.palette.primary.dark900}
        to="profile"
      >
        <img
          src={appLogo}
          alt={alt}
          style={{ width: "100%", height: "auto" }}
        />
      </Link>
      <Typography variant="text_base">Akron</Typography>
    </LogoContainer>
  );
}

export default Logo;
