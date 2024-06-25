import { CardActionArea } from "@mui/material";
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CardHead from "./CardHead";
import CardBody from "./CardBody";
import ROUTES from "../../../routes/routesModel";
import CardActionBar from "./CardActionBar";
import { useTheme } from "../../../providers/DarkThemeProvider";
const CardComponent = ({ card, onDeleteCard, onLike }) => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <Card
      sx={{
        width: 260,
        background: isDark ? "#310047" : "#e3f2fd",
        boxShadow: "4px 4px 20px rgba(0, 0, 0, 0.5)",
        overflow: "hidden",
        m: 2,
      }}
    >
      <CardActionArea
        onClick={() => navigate(`${ROUTES.MUSIC_DETAILS}/${card._id}`)}
      >
        <CardHead image={card.image} />
        <CardBody card={card} />
      </CardActionArea>
      <CardActionBar {...{ card, onDeleteCard, onLike }} />
    </Card>
  );
};

export default CardComponent;
