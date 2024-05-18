import { Container } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import useMusic from "../hooks/useMusic";
import { useEffect } from "react";
import CardsFeedback from "../components/CardsFeedBack";
const MusicPage = () => {
  const {
    value: { error, isPending, filteredCards },
    handleGetCardsFromApi,
    ...rest
  } = useMusic();
  useEffect(() => {
    handleGetCardsFromApi();
  }, [handleGetCardsFromApi]);
  const { handleDeleteCard } = rest;

  const onDeleteCard = async (cardId) => {
    await handleDeleteCard(cardId);
    await handleGetCardsFromApi();
  };

  return (
    <Container>
      <PageHeader
        title="Music Display"
        subtitle="Here you can find all kind of playstyle music"
      />
      <CardsFeedback
        isPending={isPending}
        error={error}
        cards={filteredCards}
        onDeleteCard={onDeleteCard}
      />
    </Container>
  );
};

export default MusicPage;
