import { useState } from "react";
import { Container, Stack, Typography, Box, IconButton } from "@mui/material";
import CardComponent from "./card/CardComponent";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Cards = ({ cards, onDeleteCard, onLike }) => {
  const methods = { onDeleteCard, onLike };
  const [page, setPage] = useState(0);
  const itemsPerPage = 3;

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const visibleCards = cards.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  if (!visibleCards.length) {
    return <Typography variant="h5">No cards found</Typography>;
  }

  return (
    <Container>
      <Stack
        spacing={4}
        gap={3}
        direction="row"
        my={2}
        flexWrap="wrap"
        justifyContent="center"
      >
        {visibleCards.map((card, i) => (
          <CardComponent {...methods} card={card} key={i}></CardComponent>
        ))}
      </Stack>
      <Box display="flex" justifyContent="center" m={3}>
        <IconButton
          aria-label="previous page"
          onClick={handlePrevPage}
          disabled={page === 0}
        >
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton
          aria-label="next page"
          onClick={handleNextPage}
          disabled={(page + 1) * itemsPerPage >= cards.length}
        >
          <NavigateNextIcon />
        </IconButton>
      </Box>
    </Container>
  );
};

export default Cards;
