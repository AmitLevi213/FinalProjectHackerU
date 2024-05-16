import { Container, Stack, Typography } from "@mui/material";
import CardComponent from "./card/CardComponent";

const Cards = ({ cards, onDeleteCard, onLike }) => {
  const methods = { onDeleteCard, onLike };
  const slicedCards = cards.slice(0, 20);

  if (!slicedCards.length) {
    return <Typography variant="h5">No cards found</Typography>;
  }

  return (
    <Container>
      <Stack
        spacing={1}
        gap={3}
        direction="row"
        my={3}
        flexWrap="wrap"
        justifyContent="center"
      >
        {slicedCards.map((card, i) => (
          <CardComponent {...methods} card={card} key={i}></CardComponent>
        ))}
      </Stack>
    </Container>
  );
};

export default Cards;
