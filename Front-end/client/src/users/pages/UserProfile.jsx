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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = user._id || user.uid;
        if (!userId) {
          setError("No user ID found");
          return;
        }
        const userData = await getUser(userId);
        setCurrentUser(userData);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching user data:", error);
      }
    };

    if (user) fetchUser();
  }, [user]);

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  if (!currentUser && !user) {
    return <Spinner />;
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
          backgroundColor: isDark ? "#1a0333" : "#e3f2fd",
        }}
      >
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          <Grid item xs={12} sm={4} display="flex" justifyContent="center">
            <Avatar
              alt={currentUser?.image?.alt || user?.displayName || "User"}
              src={currentUser?.image?.url || user?.photoURL}
              sx={{ width: 150, height: 150 }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" gutterBottom>
              {currentUser?.name?.first || user?.displayName || ""}
              {currentUser?.name?.middle ? ` ${currentUser.name.middle} ` : " "}
              {currentUser?.name?.last || ""}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Phone: {currentUser?.phone || "N/A"}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Email: {currentUser?.email || user?.email || "N/A"}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Address:{" "}
              {currentUser?.address
                ? `${currentUser.address.country}, ${currentUser.address.city}, ${currentUser.address.street}`
                : "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <NavItem
              label="Edit Profile"
              variant="contained"
              color="inherit"
              to={ROUTES.EDIT_USER}
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default UserProfile;
