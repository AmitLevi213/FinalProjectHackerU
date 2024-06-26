import ROUTES from "../../../../routes/routesModel";
import NavBarLink from "../../../../routes/NavBarLink";
import { Typography } from "@mui/material";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import { useTheme } from "../../../../providers/DarkThemeProvider";
const Logo = () => {
  const { isDark } = useTheme();
  return (
    <NavBarLink to={ROUTES.ROOT}>
      <Typography
        variant="h5"
        color={isDark ? "#e3f2fd" : "#1a0033"}
        sx={{
          display: { xs: "none", md: "inline-flex" },
          marginRight: 2,
          fontFamily: "'Roboto Condensed', sans-serif",
        }}
      >
        {" "}
        <QueueMusicIcon />
        SoundScape Central
      </Typography>
    </NavBarLink>
  );
};
export default Logo;
