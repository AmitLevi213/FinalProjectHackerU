const Card = require("./mongodb/Card");
const { handleBadRequest } = require("../../utils/handleErrors");

const DB = process.env.DB || "MONGODB";

const getCards = async () => {
  if (DB === "MONGODB") {
    try {
      const cards = await Card.find();
      return Promise.resolve(cards);
    } catch (error) {
      const errorWithStatus = { ...error, status: 404 };
      return handleBadRequest("Mongoose", errorWithStatus);
    }
  } else {
    return Promise.resolve([]);
  }
};

const getMyCards = async (userId) => {
  if (DB === "MONGODB") {
    try {
      const cards = await Card.find({ user_id: userId });
      return Promise.resolve(cards);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  } else {
    return Promise.resolve([]);
  }
};

const getCard = async (cardId) => {
  if (DB === "MONGODB") {
    try {
      const cards = Card.findById({ _id: cardId });
      if (!cards || cards.length === 0) {
        throw new Error("Could not find any card in the database");
      }
      return Promise.resolve(cards);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  } else {
    return Promise.resolve([]);
  }
};
const createCard = async (normalizedCard, downloadedURL) => {
  if (DB === "MONGODB") {
    try {
      let card = new Card({ ...normalizedCard, audio: downloadedURL });
      card = await card.save();
      return Promise.resolve(card);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("createCard card not in mongodb");
};
// const createCard = async (card, firebaseUrl) => {
//   try {
//     // Create a new document with the provided card data and Firebase URL
//     const newCard = await Card.create({ ...card, audio: firebaseUrl });
//     return newCard;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

const updateCard = async (cardId, normalizedCard) => {
  if (DB === "MONGODB") {
    try {
      let card = await Card.findByIdAndUpdate(cardId, normalizedCard, {
        new: true,
      });

      if (!card)
        throw new Error("A card with this ID cannot be found in the database");

      return Promise.resolve(card);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("card updateCard not in mongodb");
};

const likeCard = async (cardId, userId) => {
  if (DB === "MONGODB") {
    try {
      let card = await Card.findById(cardId);
      if (!card)
        throw new Error("A card with this ID cannot be found in the database");
      const cardLikes = card.likes.find((id) => id === userId);
      if (!cardLikes) {
        card.likes.push(userId);
        card = await card.save();
        return Promise.resolve(card);
      }

      const cardFiltered = card.likes.filter((id) => id !== userId);
      card.likes = cardFiltered;
      card = await card.save();
      return Promise.resolve(card);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("card likeCard not in mongodb");
};

const deleteCard = async (cardId, user) => {
  if (DB === "MONGODB") {
    try {
      let card = await Card.findByIdAndDelete(cardId);
      if (!card)
        throw new Error("A card with this ID cannot be found in the database");

      return Promise.resolve(card);
    } catch (error) {
      error.status = 400;
      return handleBadRequest("Mongoose", error);
    }
  }
  return Promise.resolve("card deleted not in mongodb");
};

exports.getCards = getCards;
exports.getMyCards = getMyCards;
exports.getCard = getCard;
exports.createCard = createCard;
exports.updateCard = updateCard;
exports.likeCard = likeCard;
exports.deleteCard = deleteCard;
