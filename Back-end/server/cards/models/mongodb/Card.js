const mongoose = require("mongoose");
const Image = require("./Image");
const { DEFAULT_VALIDATION, URL } = require("../../helpers/mongooseValidators");

const cardSchema = new mongoose.Schema({
  songTitle: DEFAULT_VALIDATION,
  album: DEFAULT_VALIDATION,
  artist: DEFAULT_VALIDATION,
  description: {
    ...DEFAULT_VALIDATION,
    maxLength: 1024,
  },
  releaseYear: {
    type: Date,
    default: Date.now,
    required: true,
    trim: true,
  },
  duration: {
    type: String,
    minLength: 2,
    maxLength: 10,
    required: true,
    trim: true,
  },
  genre: {
    type: [String],
    required: true,
    minLength: 2,
    maxLength: 256,
    trim: true,
    lowercase: true,
  },
  trackNumber: {
    type: Number,
    min: 1,
    max: 4,
    required: true,
    trim: true,
  },
  lyrics: {
    type: [String],
    maxLength: 1024,
  },
  web: URL,
  image: Image,
  bizNumber: {
    type: Number,
    minLength: 7,
    maxLength: 7,
    required: true,
    trim: true,
  },
  likes: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  audio: {
    type: String,
    required: true,
    trim: true,
  },
});

const Card = mongoose.model("card", cardSchema);

module.exports = Card;
