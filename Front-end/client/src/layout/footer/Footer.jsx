import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../../users/providers/UserProvider";
import { useTheme } from "../../providers/DarkThemeProvider";

const Footer = () => {
  const navigate = useNavigate();
  const navigateTo = (to) => navigate(to);
  const { user } = useUser();
  const { isDark } = useTheme();

  return (
    <Paper
      sx={{ position: "sticky", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        sx={{ backgroundColor: isDark ? "#310047" : "#d16aff" }}
      >
        <BottomNavigationAction
          onClick={() => navigateTo(ROUTES.ABOUT)}
          label="About Us"
          icon={<InfoIcon />}
        />
        {user && (
          <BottomNavigationAction
            onClick={() => navigateTo(ROUTES.FAV_MUSIC)}
            label="Favorites Music"
            icon={<FavoriteIcon />}
          />
        )}

        {user && user.isBusiness && user.isAdmin && (
          <BottomNavigationAction
            onClick={() => navigateTo(ROUTES.MY_MUSIC)}
            label="My Music"
            icon={<LibraryMusicIcon />}
          />
        )}
      </BottomNavigation>
    </Paper>
  );
};
export default Footer;
