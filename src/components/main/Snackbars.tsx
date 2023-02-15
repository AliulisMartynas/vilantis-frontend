import { Alert, Box, Snackbar } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

type SnackbarsProps = {
  successSnackbarOpen: boolean;
  errorSnackbarOpen: boolean;
  setSuccessSnackbarOpen: Dispatch<SetStateAction<boolean>>;
  setErrorSnackbarOpen: Dispatch<SetStateAction<boolean>>;
};

const Snackbars = (props: SnackbarsProps) => {
  const {
    successSnackbarOpen,
    errorSnackbarOpen,
    setSuccessSnackbarOpen,
    setErrorSnackbarOpen,
  } = props;
  return (
    <Box sx={{ mt: 4 }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={successSnackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSuccessSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSuccessSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          User data was successfully sent!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={errorSnackbarOpen}
        autoHideDuration={4000}
        onClose={() => setErrorSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setErrorSnackbarOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          An error appeared while trying to send user data. Please, try again.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Snackbars;
