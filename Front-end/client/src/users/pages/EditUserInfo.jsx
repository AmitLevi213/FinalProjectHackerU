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
import { Container } from "@mui/material";
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

  useEffect(() => {
    if (user && user._id) {
      getUser(user._id).then((data) => {
        const modeledUser = mapEditUserToModel(data);

        setInitForm(modeledUser);
        rest.setFormData(modeledUser);
      });
    }
  }, [user]);

  return (
    <>
      <PageHeader
        title="Edit User Page"
        subtitle="Here you can edit your user information"
      ></PageHeader>
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
        ></EditUserForm>
      </Container>
    </>
  );
};
export default EditUserInfo;
