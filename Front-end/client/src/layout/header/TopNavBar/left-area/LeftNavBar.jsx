import { Box } from "@mui/material";
import LogoIcon from "../logo/LogoIcon";
import Logo from "../logo/Logo";
import NavItem from "../../../../routes/NavItem";
import ROUTES from "../../../../routes/routesModel";
import { useUser } from "../../../../users/providers/UserProvider";
import { useTheme } from "../../../../providers/DarkThemeProvider";

const LeftNavBar = () => {
  const { user } = useUser();
  const { isDark } = useTheme();
  const navItemStyle = {
    color: isDark ? "#e3f2fd" : "#1a0033",
  };

  return (
    <Box>
      <LogoIcon />
      <Logo />

      <Box sx={{ pb: 1, display: { xs: "none", md: "inline-flex" } }}>
        <NavItem {...navItemStyle} label="About" to={ROUTES.ABOUT} />
        <NavItem {...navItemStyle} label="Playlist" to={ROUTES.PLAYLIST} />
        {user && user.isBusiness && (
          <>
            <NavItem
              {...navItemStyle}
              label="Fav Music"
              to={ROUTES.FAV_MUSIC}
            />
            <NavItem {...navItemStyle} label="My Music" to={ROUTES.MY_MUSIC} />
          </>
        )}
        {user && user.isAdmin && (
          <NavItem {...navItemStyle} to={ROUTES.CRM} label="CRM" />
        )}
      </Box>
    </Box>
  );
};

export default LeftNavBar;
