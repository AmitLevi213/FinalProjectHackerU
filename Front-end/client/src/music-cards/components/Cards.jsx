import { useState } from "react";
import { Container, Stack, Typography, Button, Box } from "@mui/material";
import CardComponent from "./card/CardComponent";
import { useTheme } from "../../providers/DarkThemeProvider";

const Cards = ({ cards, onDeleteCard, onLike }) => {
  const { isDark } = useTheme();
  const methods = { onDeleteCard, onLike };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(cards.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const getPaginatedCards = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return cards.slice(startIndex, startIndex + itemsPerPage);
  };

  const paginatedCards = getPaginatedCards();

  if (!paginatedCards.length) {
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
        {paginatedCards.map((card, i) => (
          <CardComponent {...methods} card={card} key={i}></CardComponent>
        ))}
      </Stack>
      <Box display="flex" justifyContent="center" m={3}>
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          sx={{
            backgroundColor: isDark ? "#1a0033" : "#e3f2fd",
            color: isDark ? "#e3f2fd" : "#1a0033",
            mx: 1,
          }}
        >
          Prev
        </Button>
        <Typography
          variant="body1"
          sx={{ color: isDark ? "#e3f2fd" : "#1a0033", mx: 1 }}
        >
          Page {currentPage} of {totalPages}
        </Typography>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          sx={{
            backgroundColor: isDark ? "#1a0033" : "#e3f2fd",
            color: isDark ? "#e3f2fd" : "#1a0033",
            mx: 1,
          }}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default Cards;
