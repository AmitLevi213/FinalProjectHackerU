import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../../users/providers/UserProvider";
import { useTheme } from "../../providers/DarkThemeProvider";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const navigate = useNavigate();
  const navigateTo = (to) => navigate(to);
  const { user } = useUser();
  const { isDark } = useTheme();

  return (
    <Paper
      sx={{
        position: "sticky",
        bottom: 0,
        left: 0,
        right: 0,
        boxShadow: "4px 4px 20px rgba(0, 0, 0, 0.5)",
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        sx={{
          background: isDark
            ? "linear-gradient(135deg, #4B0082 30%, #7F00FF 70%)"
            : "linear-gradient(135deg, #9c27b0 30%, #7b1fa2 80%)",
        }}
      >
        <BottomNavigationAction
          onClick={() => navigateTo(ROUTES.ABOUT)}
          label="About Us"
          icon={<InfoIcon />}
        />
        {user && (
          <BottomNavigationAction
            onClick={() => navigateTo(ROUTES.FAV_MUSIC)}
            label="Favorites "
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
        <BottomNavigationAction
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/amit-levi-8752092ba/",
              "_blank"
            )
          }
          label="Linkedin"
          icon={<LinkedInIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};
export default Footer;
