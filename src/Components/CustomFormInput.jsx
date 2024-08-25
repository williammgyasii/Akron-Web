// CustomInput.js
import React from "react";
import { TextField, useTheme } from "@mui/material";

const CustomFormInput = ({
  label,
  error,
  darkLabel,
  helperText,
  customStyles,
  maxCount,
  ...props
}) => {
  const theme = useTheme();
  return (
    <TextField
      label={label}
      color="grey"
      error={error}
      helperText={helperText}
      variant="outlined"
      size="small"
      fullWidth
      sx={[
        {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "grey.400",
              borderRadius: "5px", // Rounded borders
            },
            "&:hover fieldset": {
              borderColor: "primary.main",
            },
            "&.Mui-focused fieldset": {
              borderColor: "primary.main",
              borderWidth: 2,
            },
          },
        },
        customStyles,
      ]}
      inputProps={{ maxLength: maxCount }} // Set maxLength here
      InputLabelProps={{
        style: { color: theme.palette.secondary.main, fontSize: "14px" },
      }}
      {...props}
    />
  );
};

export default CustomFormInput;
