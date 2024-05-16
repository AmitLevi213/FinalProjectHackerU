export const mapCardToModel = (card) => ({
  songTitle: card.songTitle,
  description: card.description,
  webUrl: card.web,
  imageUrl: card.image.url,
  imageAlt: card.image.alt,
});
