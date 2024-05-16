import { useNavigate } from "react-router-dom";
import { useUser } from "../../users/providers/UserProvider";
import { useEffect } from "react";
import { Container, Fab } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import ROUTES from "../../routes/routesModel";
import CardsFeedback from "../components/CardsFeedBack";
import AddIcon from "@mui/icons-material/Add";
import useMusic from "../hooks/useMusic";

const UserMusicPage = () => {
  const {
    value: { cards, isPending, error },
    handleGetCardsFromUser,
    handleDeleteCard,
  } = useMusic();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate(ROUTES.LOGIN);
    else handleGetCardsFromUser();
  }, [user]);

  const onDeleteCard = async (cardId) => {
    await handleDeleteCard(cardId);
    await handleGetCardsFromUser();
  };

  return (
    <Container sx={{ position: "relative", minHeight: "92vh" }}>
      <PageHeader
        title="Cards"
        subtitle="Here you can find your business cards"
      />{" "}
      {cards && (
        <Fab
          color=""
          aria-label=""
          onClick={() => navigate(ROUTES.CREATE_MUSIC)}
          sx={{ position: "absolute", bottom: 75, right: 16 }}
        >
          <AddIcon />
        </Fab>
      )}
      <CardsFeedback
        isPending={isPending}
        error={error}
        cards={cards}
        onDeleteCard={onDeleteCard}
      />
    </Container>
  );
};

export default UserMusicPage;
