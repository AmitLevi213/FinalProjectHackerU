import { CardActionArea } from "@mui/material";
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CardHead from "./CardHead";
import CardBody from "./CardBody";
import ROUTES from "../../../routes/routesModel";
import CardActionBar from "./CardActionBar";
import { useTheme } from "../../../providers/DarkThemeProvider";

const CardComponent = ({ card, onDeleteCard, onLike, isLiked }) => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <Card
      sx={{
        width: 250,
        borderRadius: 12,
        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        margin: 16,
        backgroundColor: isDark ? "#1a0330" : "#cfe9fc",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0px 15px 40px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <CardActionArea
        sx={{ borderRadius: 12 }}
        onClick={() => navigate(`${ROUTES.MUSIC_DETAILS}/${card._id}`)}
      >
        <CardHead image={card.image} />
        <CardBody card={card} />
      </CardActionArea>
      <CardActionBar
        card={card}
        onDeleteCard={onDeleteCard}
        onLike={onLike}
        isLiked={isLiked}
      />
    </Card>
  );
};

export default CardComponent;
