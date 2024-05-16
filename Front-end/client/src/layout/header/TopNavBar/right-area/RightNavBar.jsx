import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import SearchBar from "./SearchBar";
import NotLogged from "./NotLogged";
import Logged from "./Logged";
import MoreButton from "./MoreButton";
import MenuBar from "./MenuBar";
import { useState } from "react";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import { useUser } from "../../../../users/providers/UserProvider";
import { useTheme } from "../../../../providers/DarkThemeProvider";

const RightNavBar = () => {
  const [anchorEl, setEnchorEl] = useState(null);
  const { isDark, toggleDarkMode } = useTheme();

  const { user } = useUser();

  const closeMenu = () => {
    setEnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: { xs: "none", md: "inline-flex" } }}>
        <SearchBar />
        <IconButton sx={{ marginLeft: 1 }} onClick={toggleDarkMode}>
          {isDark ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        {!user && <NotLogged />}
        {user && <Logged />}
      </Box>

      <MoreButton />

      <MenuBar
        isMenuOpen={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onCloseMenu={closeMenu}
      />
    </>
  );
};

export default RightNavBar;
