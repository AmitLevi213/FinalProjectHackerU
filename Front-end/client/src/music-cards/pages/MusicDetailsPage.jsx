import { useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import CardHead from "../components/card/CardHead";
import useMusic from "../hooks/useMusic";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import PeopleIcon from "@mui/icons-material/People";
import ComputerIcon from "@mui/icons-material/Computer";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AlbumIcon from "@mui/icons-material/Album";
import NavBarLink from "../../routes/NavBarLink";
import { useTheme } from "../../providers/DarkThemeProvider";
import MusicPlayer from "../musicPlayer/MusicPlayer";
import "../../index.css";
const MusicDetailsPage = () => {
  const { id } = useParams();
  const {
    value: { card, isLoading, error },
    handleGetCardFromClient,
  } = useMusic();
  useEffect(() => {
    handleGetCardFromClient(id);
  }, [handleGetCardFromClient, id]);
  const { isDark } = useTheme();

  return (
    <Container maxWidth="lg">
      <PageHeader
        title="Business Details"
        subtitle="Here you can find all the information about the music you are looking for."
      />
      {isLoading && <Spinner />}
      {error && <Error errorMessage={error} />}

      {card && (
        <>
          {" "}
          <Box className="center" flexDirection={"column"}>
            <Box mb={3}>
              <CardHead image={card.image} />
            </Box>
            <MusicPlayer card={card} />
          </Box>
          <Grid
            container
            minHeight={180}
            spacing={1}
            mb={5}
            mt={5}
            alignItems="center"
          >
            <Grid item xs={12} sm={6} md={3} align="center">
              <AlbumIcon fontSize="large" color="secondary" />
              <Typography
                variant="h5"
                color={isDark ? "lightgray" : "textScondary"}
              >
                {card.album}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3} align="center">
              <PeopleIcon fontSize="large" color="secondary" />
              <Typography
                variant="h5"
                color={isDark ? "lightgray" : "textScondary"}
              >
                {card.artist}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3} align="center">
              <DateRangeIcon fontSize="large" color="secondary" />
              <Typography
                variant="h5"
                color={isDark ? "lightgray" : "textScondary"}
              >
                {card.releaseYear}
              </Typography>
            </Grid>
            <Box className="bandPageLink ">
              <ComputerIcon fontSize="large" color="secondary" />
              <NavBarLink color={isDark ? "lightgray" : "black"} to={card.web}>
                Band Page
              </NavBarLink>
            </Box>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default MusicDetailsPage;
