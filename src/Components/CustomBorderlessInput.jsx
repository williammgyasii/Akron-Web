import React from "react";
import { Input, styled, useTheme } from "@mui/material";

// Styled input component without border
const BorderlessInput = styled(Input)(({ theme }) => ({
  border: "none",
  outline: "none",
  boxShadow: "none",
  width: "100%",
  fontFamily: "Inter",
  fontWeight: "600",
  textAlign: "center",
  fontSize: "30px",
  "& input::placeholder": {
    textTransform: "uppercase", // Make the placeholder text uppercase
    color: "rgb(169, 172, 172 )", // Custom placeholder color (purple)
    opacity: 1, // Ensure the color is applied properly
    fontFamily: "Inter",
    fontWeight: "700",
    // fontSize: "5rem",
    textAlign: "center",
  },
  "&:before": {
    borderBottom: "2px solid #000", // Default underline color
  },
  "&:hover:not(.Mui-disabled):before": {
    borderBottom: "2px solid rgba(113,113,122,0.2)", // Underline on hover
  },
  "&:after": {
    borderBottom: "2px solid lightpurple", // Focus underline color
  },
}));

// Usage of the BorderlessInput component
const CustomBorderlessInput = ({ placeholder, onChange, value }) => {
  const theme = useTheme();
  const ariaLabel = { "aria-label": "Borderless Input" };

  return (
    <BorderlessInput
      placeholder={placeholder}
      inputProps={ariaLabel}
      value={value}
      onChange={onChange}
    />
  );
};

export default CustomBorderlessInput;
