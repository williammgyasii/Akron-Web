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
  Avatar,
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
    display: "flex",
    alignItems: "center",
  },
  "&:focus": {
    backgroundColor: theme.palette.primary.white,
  },
  "& .MuiPaper-root": {
    maxHeight: "20px", // Max height to show only 4 items (adjust as needed)
    overflowY: "auto", // Enable scrolling if more items are present
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontSize: "16px",
  marginRight: "10px",
  width: 30,
  height: 30,
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "8px 16px",
  fontSize: "14px",
  "& .MuiListItemText-root": {
    marginLeft: theme.spacing(1),
  },
}));

function CustomDropdown({
  label,
  options,
  value,
  disabled,
  onChange,
  loading,
  customStyles,
  error,
  labelColor,
  row,
  pickerWidth,
  withAvatar,
  helperText,
  fullWidth = true,
  ...props
}) {
  const theme = useTheme();
  return (
    <StyledFormControl
      sx={customStyles}
      size={pickerWidth}
      fullWidth
      error={error}
    >
      <InputLabel
        sx={{
          color: labelColor,
          fontSize: theme.typography.text_xs,
          marginBottom: 0,
          marginLeft: 1,
          display: "flex",
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
            <StyledMenuItem
              sx={{ fontSize: "14px" }}
              key={option.value || option.id}
              value={option.value || option.id}
            >
              {withAvatar && (
                <StyledAvatar src="https://i.pravatar.cc/150?img=3">
                  {option?.firstName?.charAt(0)}
                </StyledAvatar>
              )}
              {option.label ||
                option.groupName ||
                option.projectName ||
                option.firstName}
            </StyledMenuItem>
          ))
        )}
      </StyledSelect>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </StyledFormControl>
  );
}

export default CustomDropdown;
