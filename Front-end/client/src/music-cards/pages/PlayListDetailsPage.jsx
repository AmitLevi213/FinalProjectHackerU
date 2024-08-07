import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, IconButton } from "@mui/material";
import CardComponent from "../components/card/CardComponent";
import { deleteCard, getCards } from "../service/cardApiService";
import { useTheme } from "../../providers/DarkThemeProvider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PageHeader from "../../components/PageHeader";

const PlaylistDetailsPage = () => {
  const { isDark } = useTheme();
  const { genre } = useParams();
  const [cards, setCards] = useState([]);
  const [likedCards, setLikedCards] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 4;
  const myColor = isDark ? "#e3f2fd" : "#1a0033";
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCards();
      const normalizedCards = data.map((card) => ({
        ...card,
        genre: card.genre ? card.genre.map((g) => g.trim().toLowerCase()) : [],
      }));
      const filteredCards = normalizedCards.filter((card) =>
        card.genre.includes(genre.toLowerCase())
      );
      setCards(filteredCards);
      const initialLikedState = {};
      filteredCards.forEach((card) => {
        initialLikedState[card._id] = card.isLiked;
      });
      setLikedCards(initialLikedState);
    };
    fetchData();
  }, [genre]);

  const handleNextPage = () => {
    if ((currentPage + 1) * cardsPerPage < cards.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleLike = (cardId) => {
    setLikedCards((prevLikedCards) => ({
      ...prevLikedCards,
      [cardId]: !prevLikedCards[cardId],
    }));
  };

  const handleDeleteCard = async (cardId) => {
    await deleteCard(cardId);
    setCards(cards.filter((card) => card._id !== cardId));
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
    >
      <PageHeader title="Playlist" subtitle={genre} />
      <Grid item>
        {cards
          .slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage)
          .map((card) => (
            <Grid item xs={12} sm={6} md={3} key={card._id}>
              <CardComponent
                card={card}
                onLike={handleLike}
                isLiked={likedCards[card._id]}
                onDeleteCard={handleDeleteCard}
              />
            </Grid>
          ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <IconButton onClick={handlePreviousPage} disabled={currentPage === 0}>
          <ArrowBackIcon sx={{ color: myColor }} />
        </IconButton>
        <IconButton
          onClick={handleNextPage}
          disabled={(currentPage + 1) * cardsPerPage >= cards.length}
        >
          <ArrowForwardIcon sx={{ color: myColor }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default PlaylistDetailsPage;
