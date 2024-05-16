const { handleJoiError } = require("../../utils/handleErrors");
const {
  getCards,
  getMyCards,
  getCard,
  createCard,
  updateCard,
  likeCard,
  deleteCard,
} = require("../models/cardsAccessDataService");
const validateCard = require("../validations/cardValidationService");

const getCards = async () => {
  try {
    const cards = await getCards();
    return Promise.resolve(cards);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getMyCards = async (userId) => {
  try {
    const card = await getMyCards(userId);
    return Promise.resolve(card);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getCard = async (cardId) => {
  try {
    const card = await getCard(cardId);
    return Promise.resolve(card);
  } catch (error) {
    return Promise.reject(error);
  }
};

const createCard = async (rawCard) => {
  const { error } = validateCard(rawCard);
  if (error) return handleJoiError(error);

  try {
    let card = { ...rawCard };
    card.createdAt = new Date();
    card = await createCard(card);
    return Promise.resolve(card);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateCard = async (cardId, rawCard) => {
  try {
    let card = { ...rawCard };
    card = await updateCard(cardId, card);
    return Promise.resolve(card);
  } catch (error) {
    return Promise.reject(error);
  }
};

const likeCard = async (cardId, userId) => {
  try {
    const card = await likeCard(cardId, userId);
    return Promise.resolve(card);
  } catch (error) {
    return Promise.reject(error);
  }
};

const deleteCard = async (cardId) => {
  try {
    const card = await deleteCard(cardId);
    return Promise.resolve(card);
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.getCards = getCards;
exports.getMyCards = getMyCards;
exports.getCard = getCard;
exports.createCard = createCard;
exports.updateCard = updateCard;
exports.likeCard = likeCard;
exports.deleteCard = deleteCard;
