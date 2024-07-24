import React from 'react';
import { TextField } from '@mui/material';

const CustomFormInput = ({ label, error, helperText, ...props }) => {
  return (
    <TextField
      label={label}
      error={error}
      helperText={helperText}
      variant="outlined"
      fullWidth
      {...props}
    />
  );
};

export default CustomFormInput;
