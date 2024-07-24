import { Alert, Slide, Snackbar, Typography } from "@mui/material";

const CustomSnackBar = ({ ...props }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: props.vertical, horizontal: props.horizontal }}
      open={props.snackBarOpen}
      autoHideDuration={2000}
      sx={{ backgroundColor: "#000", color: "#fff", borderRadius: 3 }}
      message={props.message}
      //   TransitionComponent={Slide}
      onClose={props.handleCloseSnackBar}
    />
  );
};

export default CustomSnackBar;
