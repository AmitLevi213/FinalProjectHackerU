import React, { useEffect } from "react";
import { Container } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import useMusic from "../hooks/useMusic";
import CardsFeedback from "../components/CardsFeedBack";
import MyMusicPlayer from "../../music-cards/musicPlayer/MyMusicPlayer";
import TrackList from "../components/TrackList";

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

  const handleSongSelect = (index) => {
    console.log(index);
  };

  return (
    <Container>
      <PageHeader
        title="Music Display"
        subtitle="Here you can find all kinds of playstyle music"
      />
      <CardsFeedback
        isPending={isPending}
        error={error}
        cards={filteredCards || []}
        onDeleteCard={onDeleteCard}
      />
      <MyMusicPlayer />
      <TrackList cards={filteredCards || []} onSongClick={handleSongSelect} />
    </Container>
  );
};

export default MusicPage;
