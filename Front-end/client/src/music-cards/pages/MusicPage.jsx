import { Container } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import useMusic from "../hooks/useMusic";
import { useEffect } from "react";
import CardsFeedback from "../components/CardsFeedBack";
const MusicPage = () => {
  const {
    value: { error, isPending, filteredCards },
    handleGetCardsFromApi,
  } = useMusic();
  useEffect(() => {
    handleGetCardsFromApi();
  }, [handleGetCardsFromApi]);

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
      />
    </Container>
  );
};

export default MusicPage;
