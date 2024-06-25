import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useMenu } from "../menu/MenuProvider";
import { useTheme } from "../../../../providers/DarkThemeProvider";

const MoreButton = ({ setAnchorEl }) => {
  const setOpen = useMenu();
  const { isDark } = useTheme();

  return (
    <Box sx={{ display: { xs: "inline-flex", md: "none" } }}>
      <IconButton
        aria-label="menu"
        onClick={() => setOpen(true)}
        size="large"
        sx={{ color: isDark ? "#e3f2fd" : "#1a0033" }}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  );
};
export default MoreButton;
