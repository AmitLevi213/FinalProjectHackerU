import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import ROUTES from "../../../../routes/routesModel";
import { useNavigate } from "react-router-dom";

const LogoIcon = () => {
  const navigate = useNavigate();
  return (
    <IconButton
      onClick={() => navigate(ROUTES.ROOT)}
      sx={{
        display: { xs: "inline-flex", md: "none" },
        size: "large",
        edge: "start",
        color: "inherit",
      }}
    >
      <Avatar alt="me" src="/assets/images/musiclogo.jpg"></Avatar>
    </IconButton>
  );
};

export default LogoIcon;
