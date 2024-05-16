const config = require("config");
const { handleError } = require("../utils/handleErrors");
const { verifyAuthToken } = require("./Providers/jwt");

const tokenGenerator = config.get("TOKEN_GENERATOR") || "jwt";

const auth = (req, res, next) => {
  if (tokenGenerator === "jwt") {
    try {
      const tokenFromClinet = req.header("x-auth-token");
      if (!tokenFromClinet)
        return handleError(res, 401, "Access denied. No token provided");
      const userData = verifyAuthToken(tokenFromClinet);
      if (!userData) return handleError(res, 400, "Invalid token");

      req.user = userData;
      return next();
    } catch (error) {
      return handleError(res, 401, error.message);
    }
  }

  return handleError(res, 500, "you dont use jwt");
};

exports.auth = auth;
