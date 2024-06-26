import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const CustomSnackbar = ({ open, message, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={2000} // Duration in milliseconds
      onClose={onClose}
      anchorOrigin={{ vertical: "center", horizontal: "right" }}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        severity="error" // Change severity as needed (error, warning, info, success)
        onClose={onClose}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default CustomSnackbar;
