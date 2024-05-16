import {
  Box,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";

const CardBody = ({ card }) => {
  const { songTitle, artist, genre, releaseYear, duration, album } = card;

  return (
    <CardContent>
      <CardHeader title={songTitle} subheader={artist} sx={{ p: 0, md: 1 }} />
      <Divider />
      <Box mt={1}>
        <Typography variant="body2" color="text.secondary">
          <Typography variant="subtitle2" component="strong">
            Genre:{" "}
          </Typography>
          {genre}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          <Typography variant="subtitle2" component="strong">
            Release Year:{" "}
          </Typography>
          {releaseYear}
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
          {album}
        </Typography>
      </Box>
    </CardContent>
  );
};

export default CardBody;
