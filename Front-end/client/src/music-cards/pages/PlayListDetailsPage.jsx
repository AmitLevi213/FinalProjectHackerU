import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import CardComponent from "../components/card/CardComponent";
import { getCards } from "../service/cardApiService";
import { useTheme } from "../../providers/DarkThemeProvider";

const PlaylistDetailsPage = () => {
  const { isDark } = useTheme();
  const { genre } = useParams();
  const [cards, setCards] = useState([]);
  const myColor = isDark ? "#e3f2fd" : "#1a0033";

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCards();
      const filteredCards = data.filter((card) => card.genre.includes(genre));
      setCards(filteredCards);
    };

    fetchData();
  }, [genre]);

  return (
    <Box
      sx={{
        display: "grid",
        justifyContent: "center",
      }}
    >
      <Typography sx={{ color: myColor }} variant="h4">
        {genre} Playlist
      </Typography>
      {cards.map((card) => (
        <CardComponent key={card._id} card={card} />
      ))}
    </Box>
  );
};

export default PlaylistDetailsPage;
