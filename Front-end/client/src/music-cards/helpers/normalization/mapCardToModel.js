export const mapCardToModel = (card) => ({
  songTitle: card.songTitle,
  description: card.description,
  artist: card.artist,
  album: card.album,
  genre: card.genre,
  trackNumber: card.trackNumber,
  releaseYear: card.releaseYear,
  lyrics: card.lyrics,
  duration: card.duration,
  webUrl: card.web,
  imageUrl: card.image.url,
  imageAlt: card.image.alt,
});
