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
  bizNumber: number,
  phone: string.isRequired,
  web: oneOfType([string]),
  email: string.isRequired,
  user_id: string,
  createdAt: string.isRequired,
  isbusiness: string,
  isAdmin: bool.isRequired,
});

export default userType;
