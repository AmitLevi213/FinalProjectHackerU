import { shape, string, number, arrayOf, oneOfType } from "prop-types";
import imageType from "./imageType";

const cardType = shape({
  _id: string,
  songTitle: string.isRequired,
  artist: string.isRequired,
  description: string,
  image: imageType.isRequired,
  trackNumber: number.isRequired,
  duration: string.isRequired,
  releaseYear: string.isRequired,
  lyrics: oneOfType([string, arrayOf(string)]).isRequired,
  likes: arrayOf(string).isRequired,
  web: oneOfType([string]).isRequired,
  genre: arrayOf(string).isRequired,
  audio: string.isRequired,
  user_id: string.isRequired,
  createdAt: string.isRequired,
});

export default cardType;
