import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid } from "@mui/material";
import FormButton from "./FormButtons";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { fireStoreApp } from "../../firebase/firebaseStore";
import LoopIcon from "@mui/icons-material/Loop";
import { func, node, number, object, string } from "prop-types";
import SendIcon from "@mui/icons-material/Send";
import GoogleIcon from "@mui/icons-material/Google";
import { useUser } from "../../users/providers/UserProvider";
import { setTokenInCookies } from "../../users/services/StorageService";

const FormComponent = ({
  title,
  onSubmit,
  onReset,
  onChange,
  to,
  color,
  spacing,
  styles,
  children,
}) => {
  const navigate = useNavigate();
  const { setUser, setToken } = useUser();

  const handleGoogleLogin = async () => {
    try {
      const auth = getAuth(fireStoreApp);
      const provider = new GoogleAuthProvider();

      provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
      provider.addScope("https://www.googleapis.com/auth/userinfo.email");

      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/google`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to authenticate with backend");
      }

      const data = await response.json();
      setTokenInCookies(data.token);
      setUser(data.user);
      setToken(data.token);
      navigate(to);
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  return (
    <Box
      component="form"
      color={color}
      sx={{ mt: 2, p: { xs: 1, sm: 2 }, ...styles }}
      onSubmit={onSubmit}
      autoComplete="off"
      noValidate
    >
      <Typography
        variant="h5"
        align="center"
        component="h1"
        color="text.primary"
      >
        {title.toUpperCase()}
      </Typography>
      <Grid container spacing={spacing}>
        {children}
      </Grid>
      <Grid container spacing={1} my={2} direction="row" width="100">
        <Grid item xs={12} sm={6}>
          <FormButton
            node="cancel"
            color="error"
            component="div"
            variant="outlined"
            onClick={() => navigate(to)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormButton
            node={<LoopIcon />}
            component="div"
            variant="outlined"
            onClick={onReset}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormButton
            node={<SendIcon />}
            disabled={!!onChange()}
            onClick={onSubmit}
            size="large"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormButton
            node={<GoogleIcon />}
            onClick={handleGoogleLogin}
            size="large"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

FormComponent.propTypes = {
  children: node.isRequired,
  onSubmit: func.isRequired,
  onReset: func.isRequired,
  onChange: func.isRequired,
  color: string.isRequired,
  to: string.isRequired,
  spacing: number.isRequired,
  title: string.isRequired,
  styles: object.isRequired,
};

FormComponent.defaultProps = {
  color: "inherit",
  to: "/",
  spacing: 1,
  title: "",
  styles: {},
};

export default memo(FormComponent);
