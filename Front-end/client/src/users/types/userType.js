import { shape, string, number, oneOfType, bool } from "prop-types";
import imageType from "../../music-cards/models/types/imageType";
import addressType from "./addressType";

const userType = shape({
  _id: string.isRequired,
  name: shape({
    first: string.isRequired,
    last: string.isRequired,
  }),
  address: addressType.isRequired,
  image: imageType.isRequired,
  bizNumber: number.isRequired,
  phone: string.isRequired,
  web: oneOfType([string]).isRequired,
  email: string.isRequired,
  user_id: string.isRequired,
  createdAt: string.isRequired,
  isbusiness: string.isRequired,
  isAdmin: bool.isRequired,
});

export default userType;
