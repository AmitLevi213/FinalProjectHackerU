import { useEffect, useState } from "react";
import { useUser } from "../providers/UserProvider";
import { Typography, Paper, Grid, Avatar } from "@mui/material";
import { getUser } from "../services/usersApiService";
import Spinner from "../../components/Spinner";
import NavItem from "../../routes/NavItem";
import ROUTES from "../../routes/routesModel";

const UserProfile = () => {
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
    <Paper elevation={3} sx={{ pt: 2 }}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Avatar
            alt={currentUser.alt}
            src={currentUser.avatarUrl}
            sx={{ width: 120, height: 120 }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h4" gutterBottom>
            {currentUser.name.first} {currentUser.name.middle}{" "}
            {currentUser.name.last}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Email: {currentUser.email}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <NavItem
            label="Edit Profile"
            variant="contained"
            color="inherit"
            to={ROUTES.EDIT_USER}
          ></NavItem>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserProfile;
