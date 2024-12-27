const Joi = require("joi");

const validateCardWithJoi = (card) => {
  const urlRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

  const schema = Joi.object({
    songTitle: Joi.string().min(2).max(256).required(),
    artist: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(2560).required(),
    album: Joi.string().min(2).max(250).required(),
    genre: Joi.array().items(Joi.string()).allow(""),
    releaseYear: Joi.date().required(),
    lyrics: Joi.string().max(10000).allow(""),
    trackNumber: Joi.number().min(1).max(250).required(),
    duration: Joi.string().min(2).max(50).required(),
    web: Joi.string()
      .ruleset.regex(urlRegex)
      .rule({ message: 'card "web" mast be a valid url' })
      .required(),
    image: Joi.object()
      .keys({
        url: Joi.string()
          .ruleset.regex(urlRegex)
          .rule({ message: 'card.image "url" mast be a valid url' })
          .allow(""),
        alt: Joi.string().min(2).max(256).allow(""),
      })
      .required(),
    bizNumber: Joi.number().allow(""),
    user_id: Joi.string().allow(""),
    audio: Joi.string().allow(""),
  });
  return schema.validate(card);
};

module.exports = validateCardWithJoi;
