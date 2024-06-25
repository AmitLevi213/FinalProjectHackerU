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
  return (
    <Box>
      <LogoIcon />
      <Logo />

      <Box sx={{ pb: 1, display: { xs: "none", md: "inline-flex" } }}>
        <NavItem
          color={isDark ? "#e3f2fd" : "#1a0033"}
          label="About"
          to={ROUTES.ABOUT}
        ></NavItem>
        {user && user.isBusiness && (
          <>
            <NavItem
              label="Fav Music"
              color={isDark ? "#e3f2fd" : "#1a0033"}
              to={ROUTES.FAV_MUSIC}
            ></NavItem>
            <NavItem
              label="My Music"
              color={isDark ? "#e3f2fd" : "#1a0033"}
              to={ROUTES.MY_MUSIC}
            ></NavItem>
          </>
        )}
        {user && user.isAdmin && (
          <NavItem
            to={ROUTES.CRM}
            color={isDark ? "#e3f2fd" : "#1a0033"}
            label="CRM"
          />
        )}
      </Box>
    </Box>
  );
};

export default LeftNavBar;
