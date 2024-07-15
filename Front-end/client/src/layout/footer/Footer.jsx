import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
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
    <AppBar
      sx={{
        position: "sticky",
        bottom: 0,
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
          sx={{ color: iconColor, fontFamily: "Oswald, sans-serif" }}
        />
        {user && (
          <BottomNavigationAction
            onClick={() => navigateTo(ROUTES.FAV_MUSIC)}
            label="Favorites "
            icon={<FavoriteIcon />}
            sx={{ color: iconColor, fontFamily: "Oswald, sans-serif" }}
          />
        )}

        {user && user.isBusiness && user.isAdmin && (
          <BottomNavigationAction
            onClick={() => navigateTo(ROUTES.MY_MUSIC)}
            label="My Music"
            icon={<LibraryMusicIcon />}
            sx={{ color: iconColor, fontFamily: "Oswald, sans-serif" }}
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
          sx={{ color: iconColor, fontFamily: "Oswald, sans-serif" }}
        />
      </BottomNavigation>
    </AppBar>
  );
};
export default Footer;
