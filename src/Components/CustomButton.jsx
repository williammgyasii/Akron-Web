import React from "react";
import {
  Button,
  CircularProgress,
  IconButton as MuiIconButton,
  styled,
} from "@mui/material";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

// Define button sizes for consistent spacing and typography
const buttonSizes = {
  small: {
    padding: "4px 8px",
    fontSize: "0.75rem",
  },
  medium: {
    padding: "5px 8px",
    fontSize: "0.85rem",
  },
  large: {
    padding: "8px 16px",
    fontSize: "1rem",
  },
};

// Styled button using MUI's styled and incorporating motion for future animations
const StyledButton = styled(motion(Button))(({ theme, variant, size }) => ({
  width: "100%",
  backgroundColor:
    variant === "primary"
      ? theme.palette.primary.dark700
      : variant === "secondary"
      ? theme.palette.secondary.main
      : variant === "minimal"
      ? "transparent"
      : theme.palette.background.paper,
  border: variant === "minimal" ? "1px solid #000" : null,
  color:
    variant === "primary" || variant === "secondary"
      ? theme.palette.common.white
      : "#000",
  padding: buttonSizes[size]?.padding || buttonSizes.medium.padding,
  fontSize: buttonSizes[size]?.fontSize || buttonSizes.medium.fontSize,

  "&:hover": {
    backgroundColor:
      variant === "primary"
        ? theme.palette.primary.dark
        : variant === "secondary"
        ? theme.palette.secondary.dark
        : variant === "minimal"
        ? "transparent"
        : theme.palette.background.default,
    color:
      variant === "primary"
        ? "#fff"
        : variant === "secondary"
        ? theme.palette.secondary.light
        : theme.palette.primary.main,
  },

  "&:disabled": {
    backgroundColor:
      variant === "primary"
        ? theme.palette.primary.light
        : variant === "secondary"
        ? theme.palette.secondary.light
        : theme.palette.action.disabledBackground,
  },
}));

const StyledIconButton = styled(MuiIconButton)(({ theme, size }) => ({
  color: theme.palette.text.primary,
  fontSize: buttonSizes[size]?.fontSize || buttonSizes.medium.fontSize,
}));

// Main CustomButton Component
function CustomButton({
  variant = "primary",
  size = "medium",
  type = "label",
  label,
  disabled,
  submit,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  children,
  sx, // External styling
  onClick,
  iconColor,
  isLoading = false,
  ...props
}) {
  const renderIcon = (Icon) =>
    Icon ? (
      <Icon
        style={{
          color: iconColor || "#fff",
          marginRight: type === "iconLeft" ? 8 : 0,
          marginLeft: type === "iconRight" ? 8 : 0,
        }}
      />
    ) : null;

  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={isLoading || disabled}
      sx={sx}
      type={submit ? "submit" : "button"}
      onClick={onClick}
      className="hover:text-white"
      whileHover={{ scale: 1.05 }} // Simple Framer Motion animation
      whileTap={{ scale: 0.95 }} // Tap animation for button press effect
      {...props}
    >
      {isLoading ? (
        <CircularProgress sx={{ color: "#fff" }} size={25} />
      ) : (
        <>
          {type === "iconLeft" && renderIcon(LeftIcon)}
          {type === "label" && label}
          {type === "iconRight" && renderIcon(RightIcon)}
          {type === "iconOnly" && (
            <StyledIconButton size={size}>
              {renderIcon(LeftIcon)}
            </StyledIconButton>
          )}
          {children}
        </>
      )}
    </StyledButton>
  );
}

CustomButton.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "minimal"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  type: PropTypes.oneOf(["label", "iconLeft", "iconRight", "iconOnly"]),
  label: PropTypes.string,
  leftIcon: PropTypes.elementType,
  rightIcon: PropTypes.elementType,
  children: PropTypes.node,
  sx: PropTypes.object,
  onClick: PropTypes.func,
  iconColor: PropTypes.string,
  loadingButton: PropTypes.bool,
  submit: PropTypes.bool,
};

export default CustomButton;
