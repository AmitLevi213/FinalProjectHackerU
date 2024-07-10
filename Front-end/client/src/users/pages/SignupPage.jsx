import React from "react";
import { Grid, Container, FormControlLabel, Checkbox } from "@mui/material";
import { Navigate } from "react-router-dom";
import useHandleUsersFunctions from "../hooks/useHandleUsersFunctions";
import useFormsValidate from "../../forms/hooks/useFormsValidate";
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import SignupSchema from "../models/joi-schema/signupSchema";
import { useUser } from "../providers/UserProvider";
import ROUTES from "../../routes/routesModel";
import PageHeader from "../../components/PageHeader";
import FormComponent from "../../forms/components/FormComponent";
import InputComponent from "../../forms/components/InputComponent";
import { useTheme } from "../../providers/DarkThemeProvider";

// Define styles separately for cleaner code
const useStyles = (isDark) => ({
  container: {
    paddingTop: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formControlLabel: {
    color: isDark ? "#e3f2fd" : "#1a0033",
    fontFamily: "Oswald, sans-serif",
  },
});

const SignupPage = () => {
  const { isDark } = useTheme();
  const classes = useStyles(isDark);

  const { signupFunction } = useHandleUsersFunctions();
  const { value, ...rest } = useFormsValidate(
    initialSignupForm,
    SignupSchema,
    signupFunction
  );

  const { user } = useUser();
  if (user) return <Navigate replace to={ROUTES.ROOT} />;

  // Form fields configuration
  const formFields = [
    { name: "first", label: "First Name" },
    { name: "middle", label: "Middle Name", required: false },
    { name: "last", label: "Last Name" },
    { name: "phone", label: "Phone", type: "phone" },
    { name: "email", label: "Email", type: "email" },
    { name: "password", label: "Password", type: "password" },
    { name: "url", label: "Image URL", required: false },
    { name: "alt", label: "Image Alt", required: false },
    { name: "state", label: "State", required: false },
    { name: "country", label: "Country" },
    { name: "city", label: "City" },
    { name: "street", label: "Street" },
    { name: "houseNumber", label: "House Number", type: "number" },
    { name: "zip", label: "ZIP" },
  ];

  return (
    <>
      <PageHeader
        title="Signup Page"
        subtitle='In order to register, please fill in the form below with your personal information and click on the "Sign Up" button.'
      />
      <Container sx={classes.container}>
        <FormComponent
          onSubmit={rest.onSubmit}
          onReset={rest.handleFormReset}
          onChange={rest.validateForm}
          styles={{ maxWidth: "800px" }}
          title="Register"
          to={ROUTES.CARDS}
        >
          {formFields.map((field) => (
            <InputComponent
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type || "text"}
              error={value.formErrors[field.name]}
              handleChange={rest.handleChange}
              data={value.formData}
              sm={6}
              required={field.required !== false}
            />
          ))}
          <Grid item>
            <FormControlLabel
              onChange={(e) =>
                rest.setFormData({
                  ...value.formData,
                  isBusiness: !!e.target.checked,
                })
              }
              name="isBusiness"
              control={<Checkbox checked={value.formData.isBusiness} />}
              label="Signup as business"
              sx={classes.formControlLabel}
              aria-label="Signup as business"
            />
          </Grid>
        </FormComponent>
      </Container>
    </>
  );
};

export default SignupPage;
