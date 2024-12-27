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
  const [error, setError] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate();

  const { value, ...rest } = useFormsValidate(
    initialEditForm,
    updateUserSchema,
    () => {
      if (!user?._id) return;
      editUserFunction(
        {
          ...normalizeUser(value.formData),
        },
        user._id
      );
    }
  );

  const { editUserFunction } = useHandleUsersFunctions();

  const isGoogleUser = Boolean(
    user?.uid ||
      (user?.providerData && user.providerData[0]?.providerId === "google.com")
  );

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.ROOT);
      return;
    }

    if (isGoogleUser) {
      setTimeout(() => {
        navigate(ROUTES.MUSIC);
      }, 5000);
      return;
    }

    if (user?._id && !user?.uid) {
      getUser(user._id)
        .then((data) => {
          if (!data) {
            setError("No user data found");
            setTimeout(() => navigate(ROUTES.MUSIC), 5000);
            return;
          }
          const modeledUser = mapEditUserToModel(data);
          setInitForm(modeledUser);
          rest.setFormData(modeledUser);
        })
        .catch((err) => {
          if (err.response?.status === 403) {
            setError("This user profile is managed through Google");
            setTimeout(() => navigate(ROUTES.MUSIC), 5000);
          } else {
            setError(
              err.message || "This user profile is managed through Google"
            );
            setTimeout(() => navigate(ROUTES.MUSIC), 5000);
          }
        });
    }
  }, [user, isGoogleUser, navigate]);

  if (!user) return null;

  if (error || isGoogleUser) {
    return (
      <Container>
        <PageHeader
          title="Edit User Page"
          subtitle="Google Account Information"
        />
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h6" color="error" gutterBottom>
            {error ||
              "Google account details cannot be edited. These are managed through your Google account settings."}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Redirecting to music page in 5 seconds...
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
