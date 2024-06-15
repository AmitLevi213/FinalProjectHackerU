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
          color={isDark ? "#F9FAFD" : "black"}
          label="About"
          to={ROUTES.ABOUT}
        ></NavItem>
        {user && user.isBusiness && (
          <>
            <NavItem
              color={isDark ? "#F9FAFD" : "black"}
              label="Fav Music"
              to={ROUTES.FAV_MUSIC}
            ></NavItem>
            <NavItem
              color={isDark ? "#F9FAFD" : "black"}
              label="My Music"
              to={ROUTES.MY_MUSIC}
            ></NavItem>
          </>
        )}
        {user && user.isAdmin && (
          <NavItem
            color={isDark ? "#F9FAFD" : "black"}
            to={ROUTES.CRM}
            label="CRM"
          />
        )}
      </Box>
    </Box>
  );
};

export default LeftNavBar;
