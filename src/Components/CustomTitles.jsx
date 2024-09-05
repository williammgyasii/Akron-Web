import React from "react";
import { Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
//REWRITE OPTIMIZATION

const AnimatedTypography = motion(Typography); // Wrapping the MUI Card with Framer Motion

const CustomTitles = ({
  variant,
  align = "center",
  color,
  children,
  styledText,
  customStyles,
  upperCase,
  weightFont,
  withLine,
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
    <AnimatedTypography
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
        },
      ]}
      {...props}
    >
      {withLine && (
        <motion.span
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity, // Repeats indefinitely
            repeatType: "reverse", // Reverses the animation direction each time
          }}
          style={{
            position: "absolute",
            bottom: 5,
            width: "100px",
            height: "4px",
            background: theme.palette.warning.light400,
            zIndex: -1, // Puts the pseudo-element behind the content
            background: "rgba(0, 0, 255, 0.5)", // Pseudo-element background
            zIndex: -1, // Puts the pseudo-element behind
            transition: "background 1.5s ease-in-out",
          }}
        />
      )}
      {children}
    </AnimatedTypography>
  );
};

export default CustomTitles;
