import {
  Avatar,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { arrayOf, func, shape, string } from "prop-types";
import { makeFirstLetterCapital } from "../../forms/utils/upperCaseMethod";
import { useTheme } from "../../providers/DarkThemeProvider";

const TrackList = ({ cards, onSongClick }) => {
  const handleSongClick = (index) => {
    onSongClick(index);
  };
  const { isDark } = useTheme();

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
      >
        Track List
      </Typography>
      <List>
        {cards && cards.length > 0 ? (
          cards.map((card, index) => (
            <ListItem
              key={card._id}
              alignItems="flex-start"
              onClick={() => handleSongClick(index)}
              sx={{
                cursor: "pointer",
                "&:hover": { boxShadow: "4px 4px 20px rgba(0, 0, 0, 0.6)" },
              }}
            >
              <ListItemAvatar>
                <Avatar alt={card.image.alt} src={card.image.url} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{ color: isDark ? "#e3f2fd" : "#1a0033" }}
                  >
                    {makeFirstLetterCapital(card.songTitle)}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: isDark ? "#e3f2fd" : "#1a0033" }}
                    >
                      {makeFirstLetterCapital(card.artist)}
                    </Typography>
                    {" — "}
                    <Typography
                      component="span"
                      variant="body2"
                      sx={{ color: isDark ? "#e3f2fd" : "#1a0033" }}
                    >
                      {makeFirstLetterCapital(card.album)}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1" color={isDark ? "#e3f2fd" : "#1a0033"}>
            No tracks found
          </Typography>
        )}
      </List>
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
