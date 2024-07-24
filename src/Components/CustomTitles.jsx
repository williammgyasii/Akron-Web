import React from "react";
import { capitalize, Typography, useTheme } from "@mui/material";

//REWRITE OPTIMIZATION

const CustomHeader = ({
  variant = "h4",
  align = "center",
  color = "textPrimary",
  children,
  styledText,
  customStyles,
  upperCase,
}) => {
  const theme = useTheme();
  return (
    <Typography
      variant={variant}
      align={align}
      color={color}
      sx={[
        {
          fontSize: theme.typography.h1,
          fontWeight:600,
          textTransform: "upperCase",
          fontFamily: styledText ? "Georgia" : "Helvetica",
          
        },
        customStyles,
      ]}
    >
      {children}
    </Typography>
  );
};

export default CustomHeader;
