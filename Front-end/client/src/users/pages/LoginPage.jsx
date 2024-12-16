import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { fireStoreApp } from "../../firebase/firebaseStore";
import { useUser } from "../providers/UserProvider";
import { setTokenInCookies } from "../services/StorageService";
import useHandleUsersFunctions from "../hooks/useHandleUsersFunctions";
import useFormsValidate from "../../forms/hooks/useFormsValidate";
import initialLoginForm from "../helpers/initialForms/initialLoginForm";
import loginSchema from "../models/joi-schema/loginSchema";
import ROUTES from "../../routes/routesModel";
import { Navigate } from "react-router-dom";
import FormComponent from "../../forms/components/FormComponent";
import InputComponent from "../../forms/components/InputComponent";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, setUser, setToken } = useUser();
  const { userLoginFunction } = useHandleUsersFunctions();

  const { value, ...rest } = useFormsValidate(
    initialLoginForm,
    loginSchema,
    userLoginFunction
  );

  
 const handleGoogleLogin = async () => {
  try {
    const auth = getAuth(fireStoreApp);
    const provider = new GoogleAuthProvider();
    
    // Add scopes if needed
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token })
    });

    if (!response.ok) {
      throw new Error('Failed to authenticate with backend');
    }

    const data = await response.json();
    setTokenInCookies(data.token);
    setUser(data.user);
    setToken(data.token);
    navigate(ROUTES.ROOT);
    
  } catch (error) {
    console.error('Google Login Error:', error);
    // Add proper error handling here
  }
};

  if (user) return <Navigate to={ROUTES.ROOT} />;

  return (
    <Container
      sx={{
        pt: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FormComponent
        onSubmit={rest.onSubmit}
        onReset={rest.handleFormReset}
        onChange={rest.validateForm}
        title="Login Page"
        styles={{
          maxWidth: "650px",
          width: "100%",
        }}
        to={ROUTES.CARDS}
      >
        <InputComponent
          label={"Email"}
          name={"email"}
          type={"email"}
          data={value.formData}
          error={value.formErrors.email}
          handleChange={rest.handleChange}
        />
        <InputComponent
          label={"Password"}
          name={"password"}
          type={"password"}
          data={value.formData}
          error={value.formErrors.password}
          handleChange={rest.handleChange}
        />
      </FormComponent>

      {/* Google Sign-In Button */}
      <Button
        variant="contained"
        onClick={handleGoogleLogin}
        fullWidth
        sx={{
          mt: 2,
          backgroundColor: "#4285F4",
          color: "#fff",
          textTransform: "none",
          fontSize: "1rem",
          padding: "10px 20px",
          maxWidth: "650px",
          "&:hover": {
            backgroundColor: "#357ae8",
          },
          "@media (max-width: 600px)": {
            fontSize: "0.9rem",
            padding: "8px 16px",
          },
        }}
      >
        Sign in with Google
      </Button>
    </Container>
  );
};

export default LoginPage;
