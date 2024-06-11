import { Box } from "@mui/material";
import LeftNavBar from "./left-area/LeftNavBar";
import AppBar from "@mui/material/AppBar";
import RightNavBar from "./right-area/RightNavBar";
import Toolbar from "@mui/material/Toolbar";
import SearchBar from "./right-area/SearchBar";
import MenuProvider from "./menu/MenuProvider";
import { useTheme } from "../../../providers/DarkThemeProvider";

const NavBar = () => {
  const { isDark } = useTheme();
  return (
    <MenuProvider>
      <AppBar position="sticky">
        <Toolbar
          sx={{
            justifyContent: "space-between",
            background: isDark
              ? "linear-gradient(135deg, #4B0082 30%, #7F00FF 70%)"
              : "linear-gradient(135deg, #9c27b0 30%, #7b1fa2 80%)",
          }}
        >
          <LeftNavBar />

          {/* only on sx screen, in the middle */}
          <Box sx={{ display: { xs: "inline-flex", md: "none" } }}>
            <SearchBar />
          </Box>

          <RightNavBar />
        </Toolbar>
      </AppBar>
    </MenuProvider>
  );
};

export default NavBar;
