import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { node } from "prop-types";
import { createContext, useCallback, useContext, useState } from "react";

const SnackbarContext = createContext(null);

export const SnackbarProvider = ({ children }) => {
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("in snackbar");
  const [snackbarColor, setSnackbarColor] = useState("success");
  const [snackbarVariant, setSnackbarVariant] = useState("filled");

  const setSnackbar = useCallback((color, message, variant = "filled") => {
    setSnackbarOpen(true);
    setSnackbarColor(color);
    setSnackbarVariant(variant);
    setSnackbarMessage(message);
  }, []);

  const snackBarStyles = {
    width: "100%",
    borderRadius: "20px",
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isSnackbarOpen}
        onClose={() => setSnackbarOpen((prev) => !prev)}
        autoHideDuration={2300}
      >
        <Alert
          severity={snackbarColor}
          variant={snackbarVariant}
          sx={snackBarStyles}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <SnackbarContext.Provider value={setSnackbar}>
        {children}
      </SnackbarContext.Provider>
    </>
  );
};
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

SnackbarProvider.propTypes = {
  children: node.isRequired,
};
