import {
  shape,
  string,
  number,
  arrayOf,
  oneOfType,
  instanceOf,
} from "prop-types";
import imageType from "./imageType";

const cardType = shape({
  _id: string,
  songTitle: string.isRequired,
  artist: string.isRequired,
  description: string.isRequired,
  image: imageType.isRequired,
  trackNumber: number.isRequired,
  duration: string.isRequired,
  releaseYear: instanceOf(Date()).isRequired,
  lyrics: number.isRequired,
  likes: arrayOf(string).isRequired,
  web: oneOfType([string]).isRequired,
  genre: string.isRequired,
  user_id: string.isRequired,
  createdAt: string.isRequired,
});

export default cardType;
