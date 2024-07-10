const Card = require("./mongodb/Card");
const { handleBadRequest } = require("../../utils/handleErrors");

const DB = process.env.DB || "MONGODB";

const getCards = async () => {
  if (DB !== "MONGODB") return [];

  try {
    const cards = await Card.find();
    return cards;
  } catch (error) {
    return handleBadRequest("Mongoose", { ...error, status: 404 });
  }
};

const getMyCards = async (userId) => {
  if (DB !== "MONGODB") return [];

  try {
    const cards = await Card.find({ user_id: userId });
    return cards;
  } catch (error) {
    return handleBadRequest("Mongoose", { ...error, status: 404 });
  }
};

const getCard = async (cardId) => {
  if (DB !== "MONGODB") return [];

  try {
    const card = await Card.findById(cardId);
    if (!card) throw new Error("Could not find any card in the database");
    return card;
  } catch (error) {
    return handleBadRequest("Mongoose", { ...error, status: 404 });
  }
};

const createCard = async (normalizedCard) => {
  if (DB !== "MONGODB") return "createCard card not in mongodb";

  try {
    const card = new Card(normalizedCard);
    await card.save();
    return card;
  } catch (error) {
    return handleBadRequest("Mongoose", { ...error, status: 400 });
  }
};

const updateCard = async (cardId, normalizedCard) => {
  if (DB !== "MONGODB") return "card updateCard not in mongodb";

  try {
    const card = await Card.findByIdAndUpdate(cardId, normalizedCard, {
      new: true,
    });
    if (!card)
      throw new Error("A card with this ID cannot be found in the database");
    return card;
  } catch (error) {
    return handleBadRequest("Mongoose", { ...error, status: 400 });
  }
};

const likeCard = async (cardId, userId) => {
  if (DB !== "MONGODB") return "card likeCard not in mongodb";

  try {
    const card = await Card.findById(cardId);
    if (!card)
      throw new Error("A card with this ID cannot be found in the database");

    const cardLikes = card.likes.includes(userId);
    if (cardLikes) {
      card.likes = card.likes.filter((id) => id !== userId);
    } else {
      card.likes.push(userId);
    }

    await card.save();
    return card;
  } catch (error) {
    return handleBadRequest("Mongoose", { ...error, status: 400 });
  }
};

const deleteCard = async (cardId) => {
  if (DB !== "MONGODB") return "card deleted not in mongodb";

  try {
    const card = await Card.findByIdAndDelete(cardId);
    if (!card)
      throw new Error("A card with this ID cannot be found in the database");
    return card;
  } catch (error) {
    return handleBadRequest("Mongoose", { ...error, status: 400 });
  }
};

module.exports = {
  getCards,
  getMyCards,
  getCard,
  createCard,
  updateCard,
  likeCard,
  deleteCard,
};
