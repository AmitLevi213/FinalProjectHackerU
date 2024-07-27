import PageHeader from "../components/PageHeader";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTheme } from "../providers/DarkThemeProvider";

const AboutPage = () => {
  const { isDark } = useTheme();
  const imageSrc = isDark
    ? "/assets/images/darkImage.png"
    : "/assets/images/lightImage.png";

  return (
    <Container>
      <PageHeader
        title="About Page"
        subtitle="On this page you can find explanations about the application"
      />
      <Grid container spacing={10}>
        <Grid item md={8} xs={12} alignSelf="center">
          <Typography
            sx={{ fontFamily: "Oswald, sans-serif" }}
            variant="h4"
            color="text.primary"
          >
            Welcome to SoundScape Central Showcase
          </Typography>
          <Typography
            color="text.primary"
            sx={{ fontFamily: "Oswald, sans-serif" }}
          >
            SoundScape Central is an innovative platform designed to elevate
            your music presence by offering a dynamic and immersive experience
            for both creators and enthusiasts. Through visually captivating
            cards, users can effortlessly explore and engage with a diverse
            array of musical compositions, albums, playlists, and more. With its
            intuitive interface, customizable design options, and interactive
            elements, SoundScape Central redefines the way music is showcased
            and experienced online, fostering connections between artists and
            their audience in an exciting and dynamic digital
          </Typography>
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
          alignSelf="center"
          sx={{ display: { md: "flex", xs: "flex" }, justifyContent: "center" }}
        >
          <img src={imageSrc} alt="card" width="100%" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutPage;
