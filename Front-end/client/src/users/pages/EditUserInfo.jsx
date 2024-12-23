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
import { Container, Typography } from "@mui/material";

const EditUserInfo = () => {
  const [initialForm, setInitForm] = useState(initialEditForm);
  const { user } = useUser();
  const { value, ...rest } = useFormsValidate(
    initialEditForm,
    updateUserSchema,
    () => {
      editUserFunction(
        {
          ...normalizeUser(value.formData),
        },
        user._id
      );
    }
  );
  const { editUserFunction } = useHandleUsersFunctions();

  // Check if user is a Google user
  const isGoogleUser = !!user?.uid;

  useEffect(() => {
    if (user && (user._id || user.uid)) {
      getUser(user._id || user.uid).then((data) => {
        const modeledUser = mapEditUserToModel(data);
        setInitForm(modeledUser);
        rest.setFormData(modeledUser);
      });
    }
  }, [user]);

  if (isGoogleUser) {
    return (
      <Container>
        <PageHeader
          title="Edit User Page"
          subtitle="Google Account Information"
        />
        <Typography variant="h6" align="center" color="error" sx={{ mt: 4 }}>
          Google account details cannot be edited. These are managed through
          your Google account settings.
        </Typography>
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
