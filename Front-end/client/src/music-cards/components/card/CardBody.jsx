import {
  Box,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import { formatDate } from "../CardForm";
import { makeFirstLetterCapital } from "../../../forms/utils/upperCaseMethod";

const CardBody = ({ card }) => {
  const { songTitle, artist, genre, releaseYear, duration, album } = card;
  const formattedGenre = genre.join(", ");

  return (
    <CardContent>
      <CardHeader
        title={makeFirstLetterCapital(songTitle)}
        subheader={makeFirstLetterCapital(artist)}
        sx={{ p: 0, md: 1 }}
      />
      <Divider />
      <Box mt={1}>
        <Typography variant="body2" color="text.secondary">
          <Typography variant="subtitle2" component="strong">
            Genre:{" "}
          </Typography>
          {formattedGenre}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          <Typography variant="subtitle2" component="strong">
            Release Year:{" "}
          </Typography>
          {formatDate(releaseYear)}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          <Typography variant="subtitle2" component="strong">
            Duration:{" "}
          </Typography>
          {duration}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Typography variant="subtitle2" component="strong">
            Album:{" "}
          </Typography>
          {makeFirstLetterCapital(album)}
        </Typography>
      </Box>
    </CardContent>
  );
};

export default CardBody;
