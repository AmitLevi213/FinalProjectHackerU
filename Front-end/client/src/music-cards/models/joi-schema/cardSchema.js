import Joi from "joi";

const urlRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const cardSchema = {
  songTitle: Joi.string().min(2).max(250).required(),
  artist: Joi.string().min(2).max(250).required(),
  album: Joi.string().min(2).max(250).required(),
  description: Joi.string().min(2).max(250).allow(),
  genre: Joi.array().items(Joi.string()).required(),
  duration: Joi.string().min(2).max(50).required(),
  releaseYear: Joi.date().required(),
  lyrics: Joi.array().items(Joi.string()).required(),
  trackNumber: Joi.number().required(),
  webUrl: Joi.string()
    .ruleset.regex(urlRegex)
    .rule({ message: 'card "web" mast be a valid url' })
    .required(),
  imageUrl: Joi.string()
    .ruleset.regex(urlRegex)
    .rule({ message: 'card.image "url" mast be a valid url' }),
  imageAlt: Joi.string().min(2).max(250).allow(""),
  audio: Joi.object().unknown(true).required(),
};

export default cardSchema;
