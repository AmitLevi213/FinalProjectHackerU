import {
  Box,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { formatDate } from "../CardForm";
import { makeFirstLetterCapital } from "../../../forms/utils/upperCaseMethod";
import { useTheme } from "../../../providers/DarkThemeProvider";

const CardBody = ({ card }) => {
  const { isDark } = useTheme();
  const { songTitle, artist, genre, releaseYear, duration, album } = card;
  const formattedGenre = genre.join(", ");
  const textColor = isDark ? "#e3f2fd" : "#1a0033";

  return (
    <CardContent>
      <CardHeader
        title={
          <Typography
            variant="h5"
            color={textColor}
            sx={{ fontFamily: "Oswald, sans-serif" }}
          >
            {makeFirstLetterCapital(songTitle)}
          </Typography>
        }
        subheader={
          <Typography
            variant="subtitle1"
            color={textColor}
            sx={{ fontFamily: "Oswald, sans-serif" }}
          >
            {makeFirstLetterCapital(artist)}
          </Typography>
        }
        sx={{ p: 0, md: 1 }}
      />
      <Divider />
      <Box mt={1}>
        <Typography
          variant="body2"
          color={textColor}
          sx={{ fontFamily: "Oswald, sans-serif" }}
        >
          <strong>Genre: </strong>
          {makeFirstLetterCapital(formattedGenre)}
        </Typography>

        <Typography
          variant="body2"
          color={textColor}
          sx={{ fontFamily: "Oswald, sans-serif" }}
        >
          <strong>Release Year: </strong>
          {formatDate(releaseYear)}
        </Typography>

        <Typography
          variant="body2"
          color={textColor}
          sx={{ fontFamily: "Oswald, sans-serif" }}
        >
          <strong>Duration: </strong>
          {duration}
        </Typography>

        <Typography
          variant="body2"
          color={textColor}
          sx={{ fontFamily: "Oswald, sans-serif" }}
        >
          <strong>Album: </strong>
          {makeFirstLetterCapital(album)}
        </Typography>
      </Box>
    </CardContent>
  );
};

export default CardBody;
