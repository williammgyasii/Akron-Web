import React from "react";
import { capitalize, Typography, useTheme } from "@mui/material";

//REWRITE OPTIMIZATION

const CustomTitles = ({
  variant,
  align = "center",
  color,
  capitalize = "uppercase",
  children,
  styledText,
  customStyles,
  upperCase,
  weightFont,
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
      textTransform={capitalize ? "uppercase" : "lowercase"}
      fontWeight={weight[weightFont ? weightFont : "regular"]}
      sx={[customStyles]}
    >
      {children}
    </Typography>
  );
};

export default CustomTitles;
