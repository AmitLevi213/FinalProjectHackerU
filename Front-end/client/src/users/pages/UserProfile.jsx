import { useEffect, useState } from "react";
import { useUser } from "../providers/UserProvider";
import { Typography, Paper, Grid, Avatar, Divider } from "@mui/material";
import { getUser } from "../services/usersApiService";
import Spinner from "../../components/Spinner";
import NavItem from "../../routes/NavItem";
import ROUTES from "../../routes/routesModel";
import PageHeader from "../../components/PageHeader";
import { useTheme } from "../../providers/DarkThemeProvider";

const UserProfile = () => {
  const { isDark } = useTheme();
  const { user } = useUser();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(user._id);
        setCurrentUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user && user._id) {
      fetchUser();
    }
  }, [user]);

  if (!currentUser) {
    return <Spinner justifyContent="center" alignItems="center" />;
  }

  return (
    <>
      <PageHeader
        title="User Details"
        subtitle="Here you can find more details about your User"
      />
      <Paper
        elevation={3}
        sx={{
          pt: 2,
          backgroundColor: isDark ? "#310047" : "#e3f2fd",
        }}
      >
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={4} display="flex" justifyContent="center">
            <Avatar
              alt={currentUser.image.alt}
              src={currentUser.image.url}
              sx={{ width: 150, height: 150 }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" gutterBottom>
              {currentUser.name.first} {currentUser.name.middle}{" "}
              {currentUser.name.last}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Phone: {currentUser.phone}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Email: {currentUser.email}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Address: {currentUser.address.country}, {currentUser.address.city}
              , {""} {currentUser.address.street}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <NavItem
              label="Edit Profile"
              variant="contained"
              color="inherit"
              to={ROUTES.EDIT_USER}
            ></NavItem>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default UserProfile;
