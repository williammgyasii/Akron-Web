import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const SnackbarComponent = ({ open, onClose, message }) => (
  <Snackbar open={open}  anchorOrigin={{vertical:"top",horizontal:"right"}} autoHideDuration={6000} onClose={onClose}>
    <Alert onClose={onClose} severity="error" sx={{ width: "30%" }}>
      {message}
    </Alert>
  </Snackbar>
);

export default SnackbarComponent;
