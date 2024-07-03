import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import CardComponent from "../components/card/CardComponent";
import { getCards } from "../service/cardApiService";
import { useTheme } from "../../providers/DarkThemeProvider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const PlaylistDetailsPage = () => {
  const { isDark } = useTheme();
  const { genre } = useParams();
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 4;
  const myColor = isDark ? "#e3f2fd" : "#1a0033";

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCards();
      const filteredCards = data.filter((card) => card.genre.includes(genre));
      setCards(filteredCards);
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Typography
        sx={{ color: myColor, marginBottom: 2 }}
        variant="h4"
        align="center"
      >
        {genre} Playlist
      </Typography>
      <Grid item>
        {cards
          .slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage)
          .map((card) => (
            <Grid item xs={12} sm={6} md={3} key={card._id}>
              <CardComponent card={card} />
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
