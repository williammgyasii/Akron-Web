import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import PropTypes from "prop-types";

function CustomDropdown({
  label,
  options,
  value,
  onChange,
  error,
  helperText,
  fullWidth = true,
  ...props
}) {
  return (
    <FormControl
     
      size="small"
      fullWidth={fullWidth}
      error={error}
    >
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange} label={label} {...props}>
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
