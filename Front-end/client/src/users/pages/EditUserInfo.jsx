import { useEffect, useState } from "react";
import { initialEditForm } from "../helpers/initialForms/initialSignupForm";
import { useUser } from "../providers/UserProvider";
import { updateUserSchema } from "../models/joi-schema/signupSchema";
import useFormsValidate from "./../../forms/hooks/useFormsValidate";
import normalizeUser from "../helpers/normalization/normalizeUser";
import useHandleUsersFunctions from "../hooks/useHandleUsersFunctions";
import { getUser } from "../services/usersApiService";
import { mapEditUserToModel } from "../helpers/normalization/mapUserToModel";
import PageHeader from "../../components/PageHeader";
import EditUserForm from "../helpers/initialForms/EditUserForm";
import { Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";

const EditUserInfo = () => {
  const [initialForm, setInitForm] = useState(initialEditForm);
  const { user } = useUser();
  const navigate = useNavigate();

  const { value, ...rest } = useFormsValidate(
    initialEditForm,
    updateUserSchema,
    () => {
      editUserFunction(
        {
          ...normalizeUser(value.formData),
        },
        user?._id
      );
    }
  );

  const { editUserFunction } = useHandleUsersFunctions();

  const isGoogleUser = Boolean(
    user?.uid ||
      (user?.providerData && user.providerData[0]?.providerId === "google.com")
  );

  useEffect(() => {
    if (isGoogleUser) {
      setTimeout(() => {
        navigate(ROUTES.ROOT);
      }, 3000);
    }

    if (user?._id) {
      getUser(user._id)
        .then((data) => {
          if (!data) {
            console.error("No user data found");
            navigate(ROUTES.ROOT);
            return;
          }
          const modeledUser = mapEditUserToModel(data);
          setInitForm(modeledUser);
          rest.setFormData(modeledUser);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          navigate(ROUTES.ROOT);
        });
    }
  }, [user, isGoogleUser, navigate]);

  if (isGoogleUser) {
    return (
      <Container>
        <PageHeader
          title="Edit User Page"
          subtitle="Google Account Information"
        />
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h6" color="error" gutterBottom>
            Google account details cannot be edited. These are managed through
            your Google account settings.
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Redirecting to home page...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <>
      <PageHeader
        title="Edit User Page"
        subtitle="Here you can edit your user information"
      />
      <Container
        sx={{
          pt: 6,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <EditUserForm
          title="Edit User"
          data={value.formData}
          onSubmit={rest.onSubmit}
          onReset={() => rest.setFormData(initialForm)}
          errors={value.formErrors}
          onFormChange={rest.validateForm}
          onInputChange={rest.handleChange}
        />
      </Container>
    </>
  );
};

export default EditUserInfo;
