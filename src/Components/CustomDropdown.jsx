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
  Typography,
} from "@mui/material";

const StyledFormControl = styled(FormControl)(({ theme, size }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  width: size === "small" ? "200px" : "100%",
  "& .MuiInputLabel-root": {
    position: "static",
    transform: "none",
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
    maxHeight: "200px", // Max height to show only 4 items (adjust as needed)
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
  emptyMessage = "No options available", // Add emptyMessage prop
  ...props
}) {
  const theme = useTheme();

  return (
    <StyledFormControl
      sx={customStyles}
      size={pickerWidth}
      fullWidth={fullWidth}
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
              maxHeight: 200, // Max height for the dropdown
            },
          },
        }}
        {...props}
      >
        {loading ? (
          <MenuItem disabled>
            <CircularProgress size={24} />
          </MenuItem>
        ) : options.length === 0 ? (
          <MenuItem disabled>
            <Typography color="textSecondary" sx={{ padding: "8px 16px" }}>
              {emptyMessage}
            </Typography>
          </MenuItem>
        ) : (
          options.map((option) => (
            <StyledMenuItem
              sx={{ fontSize: "14px" }}
              key={option.id}
              value={option}
            >
              {withAvatar && (
                <StyledAvatar
                  src={option.avatar || "https://i.pravatar.cc/150?img=3"}
                >
                  {option?.name?.charAt(0)}
                </StyledAvatar>
              )}
              {option.label || option.groupData || option.firstName}
            </StyledMenuItem>
          ))
        )}
      </StyledSelect>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </StyledFormControl>
  );
}

export default CustomDropdown;
