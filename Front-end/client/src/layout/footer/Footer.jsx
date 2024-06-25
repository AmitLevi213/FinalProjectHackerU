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
  const iconColor = isDark ? "#e3f2fd" : "#1a0033";

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
          background: isDark ? "#1a0033" : "#e3f2fd",
        }}
      >
        <BottomNavigationAction
          onClick={() => navigateTo(ROUTES.ABOUT)}
          label="About Us"
          icon={<InfoIcon />}
          sx={{ color: iconColor }}
        />
        {user && (
          <BottomNavigationAction
            onClick={() => navigateTo(ROUTES.FAV_MUSIC)}
            label="Favorites "
            icon={<FavoriteIcon />}
            sx={{ color: iconColor }}
          />
        )}

        {user && user.isBusiness && user.isAdmin && (
          <BottomNavigationAction
            onClick={() => navigateTo(ROUTES.MY_MUSIC)}
            label="My Music"
            icon={<LibraryMusicIcon />}
            sx={{ color: iconColor }}
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
          sx={{ color: iconColor }}
        />
      </BottomNavigation>
    </Paper>
  );
};
export default Footer;
