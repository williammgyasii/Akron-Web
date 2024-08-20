import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  useTheme,
  CircularProgress,
  styled,
} from "@mui/material";
import PropTypes from "prop-types";

const StyledFormControl = styled(FormControl)({
  position: "relative",
  "& .MuiInputLabel-root": {
    position: "static",
    transform: "none",
    // marginBottom: "8px",
  },
});

const StyledSelect = styled(Select)(({ theme, value }) => ({
  backgroundColor: value ? "#fff" : theme.palette.background.paper,
  fontSize: "14px",
  "&:focus": {
    backgroundColor: theme.palette.primary.white,
  },
}));

function CustomDropdown({
  label,
  options,
  value,
  disabled,
  onChange,
  loading,
  error,
  labelColor,
  helperText,
  fullWidth = true,
  ...props
}) {
  const theme = useTheme();
  return (
    <StyledFormControl fullWidth error={error}>
      <InputLabel
        sx={{
          color: labelColor,
          fontSize: theme.typography.text_xs,
          marginBottom: 0,
        }}
      >
        {label}
      </InputLabel>
      <StyledSelect
        disabled={disabled}
        value={value}
        onChange={onChange}
        label={label}
        size="small"
        {...props}
      >
        {loading ? (
          <MenuItem disabled>
            <CircularProgress size={24} />
          </MenuItem>
        ) : (
          options.map((option) => (
            <MenuItem
              sx={{ fontSize: "14px" }}
              key={option.value || option.id}
              value={option.value || option.id}
            >
              {option.label || option.groupName}
            </MenuItem>
          ))
        )}
      </StyledSelect>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </StyledFormControl>
  );
}

export default CustomDropdown;
