import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import useHandleUsersFunctions from "../hooks/useHandleUsersFunctions";
import useFormsValidate from "../../forms/hooks/useFormsValidate";
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import SignupSchema from "../models/joi-schema/signupSchema";
import { useUser } from "../providers/UserProvider";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import PageHeader from "../../components/PageHeader";
import FormComponent from "../../forms/components/FormComponent";
import InputComponent from "../../forms/components/InputComponent";
import { Container } from "@mui/material";
import { useTheme } from "../../providers/DarkThemeProvider";

const SignupPage = () => {
  const { isDark } = useTheme();

  const { signupFunction } = useHandleUsersFunctions();
  const { value, ...rest } = useFormsValidate(
    initialSignupForm,
    SignupSchema,
    signupFunction
  );

  const { user } = useUser();
  if (user) return <Navigate replace to={ROUTES.ROOT} />;

  return (
    <>
      <PageHeader
        title="Signup Page"
        subtitle='In order to register, please fill in the form below with your personal information and click on the "Sign Up" button.'
      ></PageHeader>
      <Container
        sx={{
          paddingTop: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormComponent
          onSubmit={rest.onSubmit}
          onReset={rest.handleFormReset}
          onChange={rest.validateForm}
          styles={{ maxWidth: "800px" }}
          title="register"
          to={ROUTES.CARDS}
        >
          <InputComponent
            name="first"
            label="first name"
            error={value.formErrors.first}
            handleChange={rest.handleChange}
            data={value.formData}
            sm={6}
          />
          <InputComponent
            name="middle"
            label="middle name"
            error={value.formErrors.middle}
            handleChange={rest.handleChange}
            data={value.formData}
            sm={6}
            required={false}
          />
          <InputComponent
            name="last"
            label="last name"
            error={value.formErrors.last}
            handleChange={rest.handleChange}
            data={value.formData}
            sm={6}
          />
          <InputComponent
            name="phone"
            label="phone"
            type="phone"
            error={value.formErrors.phone}
            handleChange={rest.handleChange}
            data={value.formData}
            sm={6}
          />
          <InputComponent
            name="email"
            label="email"
            type="email"
            error={value.formErrors.email}
            handleChange={rest.handleChange}
            data={value.formData}
            sm={6}
          />
          <InputComponent
            name="password"
            label="password"
            type="password"
            error={value.formErrors.password}
            handleChange={rest.handleChange}
            data={value.formData}
            sm={6}
          />
          <InputComponent
            name="url"
            label="image url"
            error={value.formErrors.url}
            handleChange={rest.handleChange}
            data={value.formData}
            sm={6}
            required={false}
          />
          <InputComponent
            name="alt"
            label="image alt"
            error={value.formErrors.alt}
            handleChange={rest.handleChange}
            data={value.formData}
            sm={6}
            required={false}
          />
          <InputComponent
            name="state"
            label="state"
            error={value.formErrors.state}
            handleChange={rest.handleChange}
            data={value.formData}
            sm={6}
            required={false}
          />
          <InputComponent
            label="country"
            name="country"
            error={value.formErrors.country}
            handleChange={rest.handleChange}
            data={value.formData}
            sm={6}
          />
          <InputComponent
            name="city"
            label="city"
            error={value.formErrors.city}
            handleChange={rest.handleChange}
            data={value.formData}
            sm={6}
          />
          <InputComponent
            name="street"
            label="street"
            error={value.formErrors.street}
            handleChange={rest.handleChange}
            data={value.formData}
            sm={6}
          />
          <InputComponent
            name="houseNumber"
            label="house Number"
            type="number"
            error={value.formErrors.houseNumber}
            handleChange={rest.handleChange}
            data={value.formData}
            sm={6}
          />
          <InputComponent
            name="zip"
            label="zip"
            error={value.formErrors.zip}
            handleChange={rest.handleChange}
            data={value.formData}
            sm={6}
          />
          <Grid item>
            <FormControlLabel
              onChange={(e) =>
                rest.setFormData({
                  ...value.formData,
                  isBusiness: !!e.target.checked,
                })
              }
              name="isBusiness"
              control={<Checkbox value={value.formData.isBusiness} />}
              label="Signup as business"
              sx={{
                color: isDark ? "#e3f2fd" : "#1a0033",
                fontFamily: "Oswald, sans-serif",
              }}
            ></FormControlLabel>
          </Grid>
        </FormComponent>
      </Container>
    </>
  );
};

export default SignupPage;
