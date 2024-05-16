import Container from "@mui/material/Container";
import PageHeader from "../components/PageHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ROUTES from "../routes/routesModel";
import NavItem from "../routes/NavItem";

const ErrorPage = () => {
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
            color="inherit"
            label="Go back to homepage"
          />
        </Grid>
        <Grid item xs={12} md={4} justifyContent="center">
          <img
            src="/assets/images/broken-robot.png"
            alt="broken robot"
            width="50%"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ErrorPage;
