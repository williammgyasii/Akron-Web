import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";

function CustomDropdown({
  label,
  options,
  value,
  disabled,
  onChange,
  error,
  helperText,
  fullWidth = true,
  ...props
}) {
  const theme = useTheme();
  return (
    <FormControl fullWidth error={error}>
      <InputLabel sx={{ color: theme.palette.primary.main }}>
        {label}
      </InputLabel>
      <Select
        disabled={disabled}
        value={value}
        onChange={onChange}
        label={label}
        size="small"
        sx={{ fontSize: theme.typography.text_sm }}
        {...props}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value || option.id}
            value={option.value || option.id}
          >
            {option.label || option.groupName}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export default CustomDropdown;
