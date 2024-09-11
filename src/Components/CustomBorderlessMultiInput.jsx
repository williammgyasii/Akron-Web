import React from "react";
import { Input, styled, useTheme } from "@mui/material";

// Styled input component without border
const BorderlessInput = styled(Input)(({ theme }) => ({
  border: "none",
  outline: "none",
  boxShadow: "none",
  width: "100%",
  fontFamily: "Inter",
  "& input::placeholder": {
    color: "rgb(169, 172, 172 )", // Custom placeholder color (purple)
    opacity: 1, // Ensure the color is applied properly
    fontFamily: "Inter",
  },
}));

// Usage of the BorderlessInput component
const CustomBorderlessMultiInput = ({ placeholder, onChange, value }) => {
  const theme = useTheme();
  const ariaLabel = { "aria-label": "Borderless Input" };

  return (
    <BorderlessInput
      placeholder={placeholder}
      inputProps={ariaLabel}
      value={value}
      onChange={onChange}
      minRows={3}
      maxRows={5}
    />
  );
};

export default CustomBorderlessMultiInput;
