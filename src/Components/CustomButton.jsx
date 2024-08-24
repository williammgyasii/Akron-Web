import React from "react";
import {
  Button,
  CircularProgress,
  IconButton as MuiIconButton,
  styled,
} from "@mui/material";
import PropTypes from "prop-types";

// Define button sizes
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

const StyledButton = styled(Button)(({ theme, variant, size }) => ({
  // width:"2rem",
  width: "100%",
  backgroundColor:
    variant === "primary"
      ? theme.palette.primary.main
      : variant === "secondary"
      ? theme.palette.secondary.main
      : variant === "minimal"
      ? "transparent"
      : theme.palette.background.paper,
  border: variant === "minimal" ? "1px solid #000 " : null,
  color:
    variant === "primary"
      ? theme.palette.primary.white
      : variant === "secondary"
      ? theme.palette.primary.white
      : variant === "minimal"
      ? "none"
      : "#fff",
  padding: buttonSizes[size]?.padding || buttonSizes.medium.padding,
  fontSize: buttonSizes[size]?.fontSize || buttonSizes.medium.fontSize,

  "&:hover": {
    backgroundColor:
      variant === "primary"
        ? theme.palette.primary.dark600
        : variant === "secondary"
        ? "transparent"
        : variant === "minimal"
        ? null
        : "#f3f",
    color:
      variant === "secondary"
        ? theme.palette.secondary.main
        : theme.palette.secondary.white,
    border: variant === "secondary" ? "1px solid #000" : null,
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

const StyledIconButton = styled(MuiIconButton)(({ theme, variant, size }) => ({
  color:
    variant === "minimal"
      ? theme.palette.primary.main
      : theme.palette.text.primary,
  fontSize: buttonSizes[size]?.fontSize || buttonSizes.medium.fontSize,
}));

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
  sx, // For external styling
  onClick,
  iconColor,
  loadingButton = false,
  ...props
}) {
  const renderIcon = (icon) => {
    if (icon) {
      return React.cloneElement(icon, {
        style: {
          marginRight: type === "iconLeft" ? 8 : 0,
          marginLeft: type === "iconRight" ? 8 : 0,
          color: iconColor || "#fff",
        },
      });
    }
    return null;
  };

  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={loadingButton || disabled}
      sx={sx} // Apply external styling
      type={submit ? "submit" : "button"}
      // type={props.type || "button"} // Default to 'button', use 'submit' if specified
      onClick={onClick}
      // fullWidth={false}
      {...props}
    >
      {loadingButton ? (
        <CircularProgress
          sx={{ p: 1, color: "#fff" }}
          size={30}
          // color={"#fff"}
        />
      ) : (
        <>
          {type === "iconLeft" && renderIcon(<LeftIcon />)}
          {type === "iconRight" && renderIcon(<RightIcon />)}
          {type === "iconOnly" && (
            <StyledIconButton variant={variant} size={size}>
              {renderIcon(<LeftIcon />)}
            </StyledIconButton>
          )}
          {type === "label" && label}
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
  children: PropTypes.node, // Allow children
  sx: PropTypes.object, // For external styling
  onClick: PropTypes.func, // Function to handle button clicks
};

export default CustomButton;
