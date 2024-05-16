import { CardActionArea } from "@mui/material";
import { Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CardHead from "./CardHead";
import CardBody from "./CardBody";
import ROUTES from "../../../routes/routesModel";
import CardActionBar from "./CardActionBar";

const CardComponent = ({ card, onDeleteCard, onLike }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ width: 260 }}>
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
