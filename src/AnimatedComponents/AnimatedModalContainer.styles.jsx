import { Box, styled } from "@mui/material";
import { motion } from "framer-motion";

export const AnimatedModalContainer = styled(motion(Box))(({ theme }) => ({
  position: "absolute",
  top: "50%",
  gap: 10,
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 400,
  background: "linear-gradient(270deg, #ffffff, #f0e4f8)", // White to light gray/blue
  backgroundSize: "200% 200%",
  borderRadius: theme.shape.borderRadius,
  // boxShadow: theme.shadows[5],
  border: "0",
  padding: theme.spacing(2),
  outline: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:focus": {
    outline: "none", // Remove the focus outline if it appears
  },
}));
