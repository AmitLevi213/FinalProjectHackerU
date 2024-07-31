import Container from "@mui/material/Container";
import PageHeader from "../components/PageHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ROUTES from "../routes/routesModel";
import NavItem from "../routes/NavItem";
import { useTheme } from "../providers/DarkThemeProvider";

const ErrorPage = () => {
  const { isDark } = useTheme();
  const myColor = isDark ? "#e3f2fd" : "#1a0033";
  return (
    <Container>
      <PageHeader title="Error 404" subtitle="page not found" />
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" color="error">
            Sorry, this page does not exist.
          </Typography>
          <NavItem
            to={ROUTES.ROOT}
            variant="contained"
            color={myColor}
            label="Go back to homepage"
          />
        </Grid>
        <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
          <img
            src="/assets/images/broken-robot.png"
            alt="broken robot"
            style={{
              filter: isDark
                ? "invert(100%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(100%) contrast(100%)"
                : "invert(0%) sepia(100%) saturate(5000%) hue-rotate(180deg) brightness(100%) contrast(100%)",
              width: "50%",
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ErrorPage;
