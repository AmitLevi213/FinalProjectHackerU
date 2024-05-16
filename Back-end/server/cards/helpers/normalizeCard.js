const generateBizNumber = require("./generateBizNumber");

const normalizeCard = async (rawCard, userId) => {
  const { url, alt } = rawCard.image;
  const image = {
    url:
      url ||
      "https://cdn.pixabay.com/photo/2016/04/20/08/21/entrepreneur-1340649_960_720.jpg",
    alt: alt || "Music card image",
  };

  return {
    ...rawCard,
    image,
    duration: rawCard.duration || "",
    releaseYear: rawCard.releaseYear,
    artist: rawCard.artist,
    album: rawCard.album,
    lyrics: rawCard.lyrics,
    description: rawCard.description,

    bizNumber: rawCard.bizNumber || (await generateBizNumber()),
    user_id: rawCard.user_id || userId,
  };
};
module.exports = normalizeCard;
