import MuiMenu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, IconButton } from "@mui/material";
import NavBarLink from "../../../../routes/NavBarLink";
import ROUTES from "../../../../routes/routesModel";
import { useUser } from "../../../../users/providers/UserProvider";
import useHandleUsersFunctions from "../../../../users/hooks/useHandleUsersFunctions";
import { useTheme } from "../../../../providers/DarkThemeProvider";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";

const MenuBar = ({ isMenuOpen, anchorEl, onCloseMenu }) => {
  const { user } = useUser();
  const { userLogoutFunction } = useHandleUsersFunctions();
  const { isDark, toggleDarkMode } = useTheme();
  const myColor = isDark ? "#e3f2fd" : "#1a0033";

  const handleToggleDarkMode = () => {
    toggleDarkMode();
    onCloseMenu();
  };

  const handleUserLogout = () => {
    userLogoutFunction();
    onCloseMenu();
  };

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
      <Box>
        {user && (
          <>
            <NavBarLink to={ROUTES.USER_PROFILE}>
              <MenuItem
                onClick={onCloseMenu}
                sx={{ fontFamily: "Oswald, sans-serif", color: myColor }}
              >
                Profile
              </MenuItem>
            </NavBarLink>
            <NavBarLink to={ROUTES.EDIT_USER}>
              <MenuItem
                onClick={onCloseMenu}
                sx={{ fontFamily: "Oswald, sans-serif", color: myColor }}
              >
                Edit account
              </MenuItem>
            </NavBarLink>
            <NavBarLink to={ROUTES.ROOT}>
              <MenuItem
                onClick={handleUserLogout}
                sx={{ fontFamily: "Oswald, sans-serif", color: myColor }}
              >
                Logout
              </MenuItem>
            </NavBarLink>
            <NavBarLink to={ROUTES.ABOUT}>
              <MenuItem
                onClick={onCloseMenu}
                sx={{ fontFamily: "Oswald, sans-serif", color: myColor }}
              >
                About
              </MenuItem>
            </NavBarLink>
            <NavBarLink to={ROUTES.PLAYLIST}>
              <MenuItem
                onClick={onCloseMenu}
                sx={{ fontFamily: "Oswald, sans-serif", color: myColor }}
              >
                <QueueMusicIcon />
              </MenuItem>
            </NavBarLink>
            {user.isAdmin && (
              <>
                <NavBarLink to={ROUTES.CRM}>
                  <MenuItem
                    sx={{ fontFamily: "Oswald, sans-serif", color: myColor }}
                    onClick={onCloseMenu}
                  >
                    CRM
                  </MenuItem>
                </NavBarLink>
              </>
            )}
            <NavBarLink>
              <MenuItem
                onClick={handleToggleDarkMode}
                sx={{ display: { xs: "block", md: "none" }, color: myColor }}
              >
                {isDark ? <LightModeIcon /> : <DarkModeIcon />}
              </MenuItem>
            </NavBarLink>
          </>
        )}
      </Box>

      {!user && (
        <Box>
          <NavBarLink to={ROUTES.LOGIN}>
            <MenuItem
              sx={{ display: { xs: "block", md: "none" }, color: myColor }}
              onClick={onCloseMenu}
            >
              Login
            </MenuItem>
          </NavBarLink>

          <NavBarLink to={ROUTES.SIGNUP}>
            <MenuItem
              sx={{ display: { xs: "block", md: "none" }, color: myColor }}
              onClick={onCloseMenu}
            >
              Signup
            </MenuItem>
          </NavBarLink>
          <NavBarLink>
            <MenuItem
              onClick={handleToggleDarkMode}
              sx={{ display: { xs: "block", md: "none" }, color: myColor }}
            >
              {isDark ? <LightModeIcon /> : <DarkModeIcon />}
            </MenuItem>
          </NavBarLink>
          <NavBarLink to={ROUTES.PLAYLIST}>
            <MenuItem
              sx={{
                color: myColor,
                display: { xs: "block", md: "none" },
              }}
              onClick={onCloseMenu}
            >
              <QueueMusicIcon />
            </MenuItem>
          </NavBarLink>
        </Box>
      )}
    </MuiMenu>
  );
};

export default MenuBar;
