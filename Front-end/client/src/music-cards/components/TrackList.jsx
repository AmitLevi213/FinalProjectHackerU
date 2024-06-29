import {
  Avatar,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import { arrayOf, func, shape, string } from "prop-types";
import { makeFirstLetterCapital } from "../../forms/utils/upperCaseMethod";
import { useTheme } from "../../providers/DarkThemeProvider";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useState } from "react";

const TrackList = ({ cards, onSongClick }) => {
  const { isDark } = useTheme();
  const [page, setPage] = useState(0);
  const itemsPerPage = 5;

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const visibleCards = cards.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  return (
    <Container
      sx={{
        background: isDark ? "#1a0033" : "#e3f2fd",
        boxShadow: "4px 4px 20px rgba(0, 0, 0, 1)",
        padding: "15px",
        borderRadius: "10px",
        width: "100%",
        maxWidth: "650px",
        marginTop: "20px",
      }}
    >
      <Typography
        variant="h6"
        color={isDark ? "#e3f2fd" : "#1a0033"}
        gutterBottom
        sx={{ fontFamily: "Oswald, sans-serif" }}
      >
        Track List
      </Typography>
      <List>
        {visibleCards.length > 0 ? (
          visibleCards.map((card, index) => (
            <ListItem
              key={card._id}
              alignItems="flex-start"
              onClick={() => onSongClick(page * itemsPerPage + index)}
              sx={{
                cursor: "pointer",
                "&:hover": {
                  boxShadow: "4px 4px 20px rgba(0, 0, 0, 0.6)",
                },
                fontFamily: "Oswald, sans-serif",
                marginBottom: "10px",
              }}
            >
              <ListItemAvatar>
                <Avatar alt={card.image.alt} src={card.image.url} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{
                      color: isDark ? "#e3f2fd" : "#1a0033",
                      fontFamily: "Oswald, sans-serif",
                    }}
                  >
                    {makeFirstLetterCapital(card.songTitle)}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{
                        color: isDark ? "#e3f2fd" : "#1a0033",
                        fontFamily: "Oswald, sans-serif",
                      }}
                    >
                      {makeFirstLetterCapital(card.artist)}
                    </Typography>
                    {" — "}
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{
                        color: isDark ? "#e3f2fd" : "#1a0033",
                        fontFamily: "Oswald, sans-serif",
                      }}
                    >
                      {makeFirstLetterCapital(card.album)}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))
        ) : (
          <Typography
            variant="body1"
            color={isDark ? "#e3f2fd" : "#1a0033"}
            fontFamily="Oswald, sans-serif"
          >
            No tracks found
          </Typography>
        )}
      </List>
      <Grid container justifyContent="center" mt={2}>
        <IconButton
          aria-label="previous page"
          onClick={handlePrevPage}
          disabled={page === 0}
        >
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton
          aria-label="next page"
          onClick={handleNextPage}
          disabled={(page + 1) * itemsPerPage >= cards.length}
        >
          <NavigateNextIcon />
        </IconButton>
      </Grid>
    </Container>
  );
};

TrackList.propTypes = {
  cards: arrayOf(
    shape({
      _id: string.isRequired,
      songTitle: string.isRequired,
      artist: string.isRequired,
      album: string.isRequired,
      image: shape({
        url: string.isRequired,
        alt: string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  onSongClick: func.isRequired,
};

export default TrackList;
