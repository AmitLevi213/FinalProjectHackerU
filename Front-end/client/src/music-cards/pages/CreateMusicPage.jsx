import { Navigate } from "react-router-dom";
import useMusic from "../hooks/useMusic";
import { useUser } from "../../users/providers/UserProvider";
import useFormsValidate from "../../forms/hooks/useFormsValidate";
import initialCardForm from "../helpers/initialForms/initialCardForm";
import cardSchema from "../models/joi-schema/cardSchema";
import ROUTES from "../../routes/routesModel";
import { Container } from "@mui/material";
import CardForm from "../components/CardForm";
const CreateMusicPage = () => {
  const { handleCreateCard } = useMusic();
  const { user } = useUser();

  const { value, ...rest } = useFormsValidate(
    initialCardForm,
    cardSchema,
    async (formDataWithAudioURL) => {
      try {
        const response = await handleCreateCard(formDataWithAudioURL);

        console.log("Card created successfully:", response);
      } catch (error) {
        console.error("Error creating card:", error);
      }
    }
  );

  if (!user || !user.isBusiness) return <Navigate to={ROUTES.MUSIC} />;

  return (
    <Container
      sx={{
        pt: 8,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardForm
        title="Create Music Card"
        data={value.formData}
        onSubmit={rest.onSubmit}
        onReset={rest.handleFormReset}
        errors={value.formErrors}
        onFormChange={rest.validateForm}
        onInputChange={rest.handleChange}
      ></CardForm>
    </Container>
  );
};

export default CreateMusicPage;
