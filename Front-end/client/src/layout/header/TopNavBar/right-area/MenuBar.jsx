import MuiMenu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, IconButton } from "@mui/material";
import NavBarLink from "../../../../routes/NavBarLink";
import ROUTES from "../../../../routes/routesModel";
import { useUser } from "../../../../users/providers/UserProvider";
import useHandleUsersFunctions from "../../../../users/hooks/useHandleUsersFunctions";
import { useTheme } from "../../../../providers/DarkThemeProvider";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/DarkMode";

const MenuBar = ({ isMenuOpen, anchorEl, onCloseMenu }) => {
  const { user } = useUser();
  const { userLogoutFunction } = useHandleUsersFunctions();
  const { isDark, toggleDarkMode } = useTheme();

  return (
    <MuiMenu
      open={isMenuOpen}
      onClose={onCloseMenu}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      {user && user.isAdmin && (
        <Box>
          <NavBarLink to={ROUTES.USER_PROFILE}>
            <MenuItem onClick={onCloseMenu}>Profile</MenuItem>
          </NavBarLink>
          <NavBarLink to={ROUTES.EDIT_USER}>
            <MenuItem onClick={onCloseMenu}>Edit account</MenuItem>
          </NavBarLink>
          <NavBarLink to={ROUTES.ROOT}>
            <MenuItem onClick={userLogoutFunction}>Logout</MenuItem>
          </NavBarLink>
          <NavBarLink to={ROUTES.ABOUT}>
            <MenuItem>About</MenuItem>
          </NavBarLink>
          <NavBarLink to={ROUTES.CRM}>
            <MenuItem onClick={onCloseMenu}>CRM</MenuItem>
          </NavBarLink>
          <IconButton sx={{ marginLeft: 1 }} onClick={toggleDarkMode}>
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      )}

      {!user && (
        <Box>
          <NavBarLink to={ROUTES.LOGIN}>
            <MenuItem
              sx={{ display: { xs: "block", md: "none" } }}
              onClick={onCloseMenu}
            >
              Login
            </MenuItem>
          </NavBarLink>

          <NavBarLink to={ROUTES.SIGNUP}>
            <MenuItem
              sx={{ display: { xs: "block", md: "none" } }}
              onClick={onCloseMenu}
            >
              Signup
            </MenuItem>
          </NavBarLink>
          <IconButton sx={{ marginLeft: 1 }} onClick={toggleDarkMode}>
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      )}
    </MuiMenu>
  );
};

export default MenuBar;
