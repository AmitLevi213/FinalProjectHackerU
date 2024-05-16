import Container from "@mui/material/Container";
import { useUser } from "../providers/UserProvider";
import useHandleUsersFunctions from "../hooks/useHandleUsersFunctions";
import useFormsValidate from "../../forms/hooks/useFormsValidate";
import initialLoginForm from "../helpers/initialForms/initialLoginForm";
import loginSchema from "../models/joi-schema/loginSchema";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import FormComponent from "../../forms/components/FormComponent";
import InputComponent from "../../forms/components/InputComponent";

const LoginPage = () => {
  const { user } = useUser();
  const { userLoginFunction } = useHandleUsersFunctions();

  const { value, ...rest } = useFormsValidate(
    initialLoginForm,
    loginSchema,
    userLoginFunction
  );
  if (user) return <Navigate to={ROUTES.ROOT} />;

  return (
    <Container
      sx={{
        pt: 4,
        display: "flex",
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
    </Container>
  );
};

export default LoginPage;
