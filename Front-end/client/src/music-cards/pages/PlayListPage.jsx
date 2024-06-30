import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { getCards } from "../service/cardApiService";
import ROUTES from "../../routes/routesModel";
import { useTheme } from "../../providers/DarkThemeProvider";

const PlayListPage = () => {
  const { isDark } = useTheme();
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();
  const textColor = isDark ? "#e3f2fd" : "#1a0033";
  const buttonColor = isDark ? "#e3f2fd" : "#1a0033";

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const cards = await getCards();
        const genreSet = new Set(cards.map((card) => card.genre[0]));
        setGenres(Array.from(genreSet));
      } catch (error) {
        console.error("Failed to fetch cards", error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreClick = (genre) => {
    navigate(`${ROUTES.PLAYLIST_DETAILS}/${encodeURIComponent(genre)}`);
  };

  const handleAddClick = () => {
    navigate(ROUTES.CREATE_MUSIC);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 3,
      }}
    >
      {genres.map((genre) => (
        <Box
          key={genre}
          sx={{
            position: "relative",
            width: 200,
            height: 200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: 2,
            boxShadow: 3,
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
            },
            "&:hover .add-button": {
              opacity: 1,
            },
          }}
          onClick={() => handleGenreClick(genre)}
        >
          <Typography variant="h6" component="div" sx={{ color: textColor }}>
            {genre}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            className="add-button"
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
              opacity: 0,
              transition: "opacity 0.3s",
              backgroundColor: buttonColor,
              color: isDark ? "#1a0033" : "#e3f2fd",
              "&:hover": {
                backgroundColor: isDark ? "#e3f2fd" : "#1a0033",
              },
            }}
            onClick={handleAddClick}
          >
            Add
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default PlayListPage;
