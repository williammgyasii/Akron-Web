import React from "react";
import { capitalize, Typography, useTheme } from "@mui/material";


const CustomHeader = ({
  variant = "h4",
  align = "center",
  color = "textPrimary",
  children,
  upperCase
}) => {
    const theme = useTheme()
  return (
    <Typography
      variant={variant}
      align={align}
      
      color={color}
      sx={{
        marginBottom: 2, // Adjust margin as needed
        fontSize:theme.typography.h1,
        textTransform:"upperCase",
      }}
    >
      {children}
    </Typography>
  );
};

export default CustomHeader;
