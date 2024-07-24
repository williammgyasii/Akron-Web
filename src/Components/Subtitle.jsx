import React from "react";
import { capitalize, Typography, useTheme } from "@mui/material";

const subtitleStyles = {
  marginBottom: 2, // Adjust margin as needed
  small_black: {
    color: (theme) => theme.palette.text.subtitle_black,
    fontSize: (theme) => theme.typography.subtitle1.fontSize,
  },
  small_white: {
    color: (theme) => theme.palette.text.subtitle_white,
    fontSize: (theme) => theme.typography.subtitle1.fontSize,
  },
  outlined: {
    borderColor: (theme) => theme.palette.primary.main,
    color: (theme) => theme.palette.primary.main,
    borderWidth: 2,
    "&:hover": {
      borderColor: (theme) => theme.palette.primary.dark,
      color: (theme) => theme.palette.primary.dark,
    },
  },
  text: {
    color: (theme) => theme.palette.primary.main,
    "&:hover": {
      backgroundColor: (theme) => theme.palette.action.hover,
    },
  },
  iconButton: {
    color: (theme) => theme.palette.primary.main,
    "&:hover": {
      backgroundColor: (theme) => theme.palette.action.hover,
    },
  },
  iconAndText: {
    display: "flex",
    alignItems: "center",
    gap: 1, // theme.spacing(1) equivalent
  },
};

const Subtitle = ({
  variant = "h4",
  align = "center",
  color = "#000",
  children,
  subtitleStyle,
  customStyles,
  styled,
}) => {
  const theme = useTheme();
  return (
    <Typography
      variant={variant}
      align={align}
      color={color}
      sx={[subtitleStyles[subtitleStyle], customStyles, { lineHeight: 1.4 }]}
    >
      {children}
    </Typography>
  );
};

export default Subtitle;
