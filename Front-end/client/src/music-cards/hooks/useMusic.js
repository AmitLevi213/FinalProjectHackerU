import { useNavigate, useSearchParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useCallback, useEffect, useMemo, useState } from "react";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../../users/providers/UserProvider";
import {
  getCard,
  getCards,
  getMyCards,
  deleteCard,
  createCard,
  changeLikeStatus,
  updateCard,
} from "../service/cardApiService";
import { useSnackbar } from "../../providers/SnackbarProvider";
import { normalizeCard } from "../helpers/normalization/normalizeCard";

const useMusic = () => {
  const [cards, setCards] = useState(null);
  const [card, setCard] = useState(null);
  const [isPending, setPending] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { user } = useUser();

  const [query, setQuery] = useState("");
  const [filteredCards, setFilteredCards] = useState(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  useEffect(() => {
    if (cards) {
      const filtered = cards.filter(
        (c) =>
          c.songTitle.includes(query) ||
          c.album.includes(query) ||
          String(c.bizNumber).includes(query) ||
          c.artist.includes(query) ||
          c.releaseYear.includes(query)
      );
      setFilteredCards(filtered);
    }
  }, [query, cards]);

  const requestStatus = (card, cards, isPending, error) => {
    setCard(card);
    setCards(cards);
    setPending(isPending);
    setError(error);
  };

  useAxios();

  const handleGetCardsFromApi = useCallback(async () => {
    try {
      setPending(true);
      const cards = await getCards();
      requestStatus(null, cards, false, null);
    } catch (error) {
      snackbar("error", error.message);

      requestStatus(null, null, false, error);
    }
  }, []);

  const handleGetCardFromClient = useCallback(async (cardFromClient) => {
    try {
      setPending(true);
      const card = await getCard(cardFromClient);
      requestStatus(card, null, false, null);
      return card;
    } catch (error) {
      requestStatus(null, null, false, error);
    }
  }, []);

  const handleDeleteCard = useCallback(async (cardId) => {
    try {
      setPending(true);
      await deleteCard(cardId);
      snackbar("success", "The business card has been successfully deleted");
    } catch (error) {
      snackbar("error", error.message);
      requestStatus(null, null, false, error);
    }
  }, []);

  const handleGetCardsFromUser = useCallback(async () => {
    try {
      setPending(true);
      const cardsFromUser = await getMyCards();
      requestStatus(null, cardsFromUser, false, null);
    } catch (error) {
      requestStatus(null, null, false, error);
    }
  }, []);

  const handleCreateCard = useCallback(async (cardFromClient) => {
    try {
      setPending(true);
      const normalizedCard = normalizeCard(cardFromClient);
      const card = await createCard(normalizedCard);
      requestStatus(card, null, false, null);
      snackbar("success", "The business card has been successfully created");
      navigate(ROUTES.MY_CARDS);
    } catch (error) {
      snackbar("error", error.message);
      requestStatus(null, null, false, error);
    }
  }, []);

  const handleLikeCard = useCallback(async (cardId, isLiked) => {
    try {
      setPending(true);
      const card = await changeLikeStatus(cardId);
      snackbar(
        "success",
        `The business card has been successfully ${
          isLiked ? "unliked" : "liked"
        }`
      );
      requestStatus(card, cards, false, null);
    } catch (error) {
      requestStatus(null, null, false, error);
    }
  }, []);

  const handleGetUserFavCards = useCallback(async () => {
    try {
      setPending(true);
      const cards = await getCards();
      const favCards = cards.filter(
        (card) => !!card.likes.find((id) => id === user._id)
      );
      requestStatus(null, favCards, false, null);
    } catch (error) {
      requestStatus(null, null, false, error);
    }
  }, []);

  const handleEditCard = useCallback(async (cardId, cardFromClient) => {
    try {
      setPending(true);
      const card = await updateCard(cardId, cardFromClient);
      requestStatus(card, null, false, null);
      snackbar("success", "The business card has been successfully updated");
      navigate(ROUTES.MY_CARDS);
    } catch (error) {
      requestStatus(null, null, false, error);
    }
  }, []);

  const value = useMemo(
    () => ({
      cards,
      card,
      isPending,
      error,
      filteredCards,
    }),
    [cards, card, isPending, error, filteredCards]
  );

  return {
    value,
    handleGetCardsFromApi,
    handleGetCardFromClient,
    handleGetCardsFromUser,
    handleDeleteCard,
    handleCreateCard,
    handleLikeCard,
    handleGetUserFavCards,
    handleEditCard,
  };
};

export default useMusic;
