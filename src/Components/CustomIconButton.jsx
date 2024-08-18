import React from "react";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// Custom IconButton component with variable sizing
const VariableSizeIconButton = ({ size, ...props }) => {
  // Define sizes for different options
  const sizeMapping = {
    tiny:15,
    small: 24,
    medium: 36,
    large: 48,
  };

  // Default to medium size if the size prop is not provided
  const iconSize = sizeMapping[size] || sizeMapping.medium;

  return (
    <IconButton
      {...props}
      color="#fff"
      sx={{
        background: "#000",
        width: iconSize,
        height: iconSize,
        color: "#fff",
        borderRadius:1,
        "& .MuiSvgIcon-root": {
          fontSize: iconSize,
        },
        "&:hover": {
          backgroundColor: "red", // Disable the default hover effect
        },
      }}
    >
      {props.children}
    </IconButton>
  );
};

export default VariableSizeIconButton;
