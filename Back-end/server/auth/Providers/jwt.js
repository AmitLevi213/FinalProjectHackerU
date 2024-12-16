const jwt = require("jsonwebtoken");
const config = require("config");

const key = config.get("JWT_KEY");

const generateAuthToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isBusiness: user.isBusiness,
    },
    key
  );
};

const verifyAuthToken = (token) => {
  try {
    const userData = jwt.verify(token, key);
    return userData;
  } catch (error) {
    return null;
  }
};

exports.generateAuthToken = generateAuthToken;
exports.verifyAuthToken = verifyAuthToken;
