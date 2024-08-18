import React from "react";
import { capitalize, Typography, useTheme } from "@mui/material";

const Subtitle = ({
  variant,
  align = "center",
  color,
  children,
  customStyles,
}) => {
  const theme = useTheme();
  return (
    <Typography
      variant={variant}
      align={align}
      sx={[
        customStyles,
        {
          [theme.breakpoints.down("tablets_landscape")]: {
            fontSize: theme.typography.text_sm,
          },
        },
      ]}
      color={color || theme.palette.secondary.light400}
    >
      {children}
    </Typography>
  );
};

export default Subtitle;
