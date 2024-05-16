export const normalizeCard = (card) => ({
  songTitle: card.songTitle,
  album: card.album,
  artist: card.artist,
  releaseYear: card.releaseYear,
  description: card.description,
  genre: card.genre,
  duration: card.duration,
  lyrics: card.lyrics,
  trackNumber: card.trackNumber,
  web: card.webUrl,
  image: {
    url: card.imageUrl,
    alt: card.imageAlt,
  },
});
