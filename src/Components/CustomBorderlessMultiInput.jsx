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
  "&:focus": {
    border: "none", // Ensure no border on focus
    outline: "none",
  },
}));

// Usage of the BorderlessInput component
const CustomBorderlessMultiInput = ({ placeholder, onChange, value }) => {

  return (
    <BorderlessInput
      placeholder={placeholder}
    //   inputProps={ariaLabel}
      value={value}
      multiline
      onChange={onChange}
      minRows={5}
      maxRows={7}
    />
  );
};

export default CustomBorderlessMultiInput;
