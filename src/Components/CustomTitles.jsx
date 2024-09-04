import React from "react";
import { Typography, useTheme } from "@mui/material";

//REWRITE OPTIMIZATION

const CustomTitles = ({
  variant,
  align = "center",
  color,
  children,
  styledText,
  customStyles,
  upperCase,
  weightFont,
  ...props
}) => {
  const theme = useTheme();
  const weight = {
    regular: 300,
    medium: 500,
    bold: 700,
    superBold: 900,
  };
  return (
    <Typography
      variant={variant}
      align={align}
      color={color}
      fontWeight={weight[weightFont ? weightFont : "regular"]}
      sx={[
        customStyles,
        {
          display: "block",
          fontFamily: "Inter",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: theme.palette.,
            zIndex: -1, // Puts the pseudo-element behind the content
          },
        },
      ]}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default CustomTitles;
