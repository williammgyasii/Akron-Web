import React from "react";
import { capitalize, Typography, useTheme } from "@mui/material";

const Subtitle = ({
  variant = "h4",
  align = "center",
  color = "textPrimary",
  children,
  styled,
}) => {
  const theme = useTheme();
  return (
    <Typography
      variant={variant}
      align={align}
      color={color}
      sx={{
        marginBottom: 2, // Adjust margin as needed
        fontSize: theme.typography.h6,
        textTransform: "capitalize",
        fontFamily: styled ? "Georgia" : "Roboto",
      }}
    >
      {children}
    </Typography>
  );
};

export default Subtitle;
