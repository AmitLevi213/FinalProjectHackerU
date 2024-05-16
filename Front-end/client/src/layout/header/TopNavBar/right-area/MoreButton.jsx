import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useMenu } from "../menu/MenuProvider";

const MoreButton = ({ setAnchorEl }) => {
  const setOpen = useMenu();

  return (
    <Box sx={{ display: { xs: "inline-flex", md: "none" } }}>
      <IconButton
        aria-label="menu"
        onClick={() => setOpen(true)}
        size="large"
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
    </Box>
  );
};
export default MoreButton;
