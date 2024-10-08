import React from "react";
import { Grid, Box, useTheme, useMediaQuery } from "@mui/material";

const SideBySideLayout = ({
  leftComponent,
  rightComponent,
  customStyles,
  largerLeft,
}) => {
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("tablets_port"));
  return (
    <Grid
      sx={[
        {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          [theme.breakpoints.down("tablets_port")]: {
            flexDirection: "column",
          },
        },
        customStyles,
      ]}
      // spacing={isPhone ? 3 : 0}
      container
    >
      <Grid
        sx={{
          flexBasis: largerLeft ? "20%" : "50%",
          paddingRight: 1,
          [theme.breakpoints.down("tablets_port")]: {
            paddingRight: 0,
            mb: 2.5,
          },
        }}
        item
      >
        <Box>{leftComponent}</Box>
      </Grid>
      <Grid
  
        sx={{
          flexBasis: largerLeft ? "80%" : "50%",
          paddingLeft: 1,
          [theme.breakpoints.down("tablets_port")]: {
            paddingLeft: 0,
          },
        }}
        item
      >
        <Box>{rightComponent}</Box>
      </Grid>
    </Grid>
  );
};

export default SideBySideLayout;
