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

const StyledFormControl = styled(FormControl)(({ theme, value, size }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  width: size === "small" ? "200px" : "100%",
  "& .MuiInputLabel-root": {
    position: "static",
    transform: "none",
    // fontSize: "1px",
    // marginBottom: "8px",
  },
}));

const StyledSelect = styled(Select)(({ theme, value }) => ({
  backgroundColor: value ? "#fff" : theme.palette.background.paper,
  fontSize: "14px",
  padding: "4px 8px", // Reduced the padding to make it thinner
  "& .MuiSelect-select": {
    padding: "4px 8px", // Ensure the internal padding is also reduced
  },
  "&:focus": {
    backgroundColor: theme.palette.primary.white,
  },
  "& .MuiPaper-root": {
    maxHeight: "20px", // Max height to show only 4 items (adjust as needed)
    overflowY: "auto", // Enable scrolling if more items are present
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
  row,
  pickerWidth,
  helperText,
  fullWidth = true,
  ...props
}) {
  const theme = useTheme();
  return (
    <StyledFormControl size={pickerWidth} fullWidth error={error}>
      <InputLabel
        sx={{
          color: labelColor,
          fontSize: theme.typography.text_xs,
          marginBottom: 0,
          marginLeft:1
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
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200, // Max height for 4 items
            },
          },
        }}
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
              {option.label || option.groupName || option.projectName}
            </MenuItem>
          ))
        )}
      </StyledSelect>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </StyledFormControl>
  );
}

export default CustomDropdown;
