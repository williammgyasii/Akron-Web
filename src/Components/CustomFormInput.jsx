// CustomInput.js
import React from "react";
import { TextField, useTheme } from "@mui/material";

const CustomFormInput = ({
  label,
  error,
  helperText,
  customStyles,
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
              borderColor: "secondary.main",
              borderWidth: 2,
            },
          },
        },
        customStyles,
      ]}
      InputLabelProps={{ style: { color: theme.palette.secondary.main } }}
      {...props}
    />
  );
};

export default CustomFormInput;
