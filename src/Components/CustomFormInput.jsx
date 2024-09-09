// CustomInput.js
import React from "react";
import { TextField, useTheme } from "@mui/material";

const CustomFormInput = ({
  label,
  error,
  darkLabel,
  helperText,
  type,
  customStyles,
  maxCount,
  minRows,
  maxRows,
  multiline,
  ...props
}) => {
  const theme = useTheme();
  return (
    <TextField
      label={label}
      color="grey"
      error={error}
      multiline={multiline}
      minRows={minRows}
      maxRows={maxRows}
      helperText={helperText}
      variant="outlined"
      size="small"
      fullWidth
      type={type}
      sx={[
        {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: theme.palette.secondary.light200,
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
        // className={`text-gray-400`},
        style: { color: theme.palette.secondary.light400, fontSize: "14px" },
      }}
      {...props}
    />
  );
};

export default CustomFormInput;
