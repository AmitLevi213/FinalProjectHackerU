import { Box } from "@mui/material";
import NavItem from "../../../../routes/NavItem";
import ROUTES from "../../../../routes/routesModel";
import { useTheme } from "../../../../providers/DarkThemeProvider";

const NotLogged = () => {
  const { isDark } = useTheme();
  return (
    <Box>
      <NavItem
        color={isDark ? "#e3f2fd" : "#1a0033"}
        label="Sign Up"
        to={ROUTES.SIGNUP}
      />
      <NavItem
        color={isDark ? "#e3f2fd" : "#1a0033"}
        label="Log In"
        to={ROUTES.LOGIN}
      />
    </Box>
  );
};

export default NotLogged;
