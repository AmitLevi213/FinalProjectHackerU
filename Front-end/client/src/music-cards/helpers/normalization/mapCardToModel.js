export const mapCardToModel = (card) => ({
  songTitle: card.songTitle,
  description: card.description,
  artist: card.artist,
  album: card.album,
  trackNumber: card.trackNumber,
  releaseYear: card.releaseYear,
  duration: card.duration,
  webUrl: card.web,
  imageUrl: card.image.url,
  imageAlt: card.image.alt,
});
