const express = require("express");
const { handleError } = require("../../utils/handleErrors");
const normalizeUser = require("../helpers/normalizeUser");
const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  changeUserBusinessStatus,
  deleteUser,
  registerGoogleUser,
} = require("../models/usersAccessDataService");
const dotenv = require("dotenv");
dotenv.config();
const { OAuth2Client } = require("google-auth-library");
const {
  validateRegistration,
  validateLogin,
  validateUserUpdate,
} = require("../validations/userValidationService");
const { generateUserPassword } = require("../helpers/bcrypt");
const { auth } = require("../../auth/authService");
const admin = require("../../firebaseAdmin");
const { generateAuthToken } = require("../../auth/Providers/jwt");
const router = express.Router();
// Initialize the Google OAuth client
const client = new OAuth2Client({
  clientId: process.env.CLIENT_ID, // Your Google OAuth client ID
  clientSecret: process.env.CLIENT_SECRET, // Your Google OAuth client secret
});

router.post("/", async (req, res) => {
  try {
    let user = req.body;
    const { error } = validateRegistration(user);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);
    user = normalizeUser(user);
    user.password = generateUserPassword(user.password);
    user = await registerUser(user);
    return res.status(201).send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    let user = req.body;
    const { error } = validateLogin(user);
    if (error)
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);

    user = await loginUser(req.body);
    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});
router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return handleError(res, 400, "No token provided");
    }

    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { email, name, picture, uid } = decodedToken;

    if (!email || !uid) {
      return handleError(res, 400, "Invalid token payload");
    }

    // Prepare user data for database
    const googleUserData = {
      uid,
      email,
      name: name || email.split("@")[0],
      picture: picture || null,
      password: null,
      isBusiness: true,
    };

    // Register or update the Google user in your database
    const user = await registerGoogleUser(googleUserData);

    // Debug: Check user data before token generation
    console.log("User data for token generation:", user);

    // Generate JWT token
    const authToken = generateAuthToken(user);

    // Debug: Check generated token
    console.log("Generated auth token:", authToken);

    return res.status(200).json({
      user,
      token: authToken,
    });
  } catch (error) {
    console.error("Full error object:", error);
    return handleError(res, 401, `Authentication failed: ${error.message}`);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const { isAdmin } = req.user;
    if (!isAdmin) return handleError(res, 403, "Access denied");
    const users = await getUsers();
    return res.send(users);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, isAdmin, uid } = req.user;

    // Block direct API access for Google users
    if (uid) {
      return handleError(
        res,
        403,
        "Google users cannot access this endpoint. Please manage your profile through Google."
      );
    }

    if (_id !== id && !isAdmin) {
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin type user or the registered user to see this user details"
      );
    }

    const user = await getUser(id);
    if (!user) {
      return handleError(res, 404, "User not found");
    }
    if (user.uid) {
      return handleError(
        res,
        403,
        "This user profile is managed through Google"
      );
    }

    return res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});
router.put("/:id", auth, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = req.user;

    if (
      user.uid ||
      (user.providerData && user.providerData[0]?.providerId === "google.com")
    ) {
      return handleError(
        res,
        403,
        "Google users cannot be edited through this API. Please manage your profile through Google settings."
      );
    }

    if (userId !== user._id && !user.isAdmin) {
      return handleError(
        res,
        403,
        "Authorization Error: You must be the registered user to update its details"
      );
    }

    const userPayload = req.body.user;
    const { error } = validateUserUpdate(userPayload);
    if (error) {
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`);
    }

    const normalizedUser = normalizeUser(userPayload);
    const newUser = await updateUser(userId, normalizedUser);

    if (!newUser) {
      return handleError(res, 404, "User not found");
    }

    return res.send(newUser);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    if (_id !== id && !req.user.isAdmin) {
      console.log("Authorization failed");
      return handleError(
        res,
        403,
        "Authorization Error: You must be the registered user or admin to change this user status"
      );
    }
    const user = await changeUserBusinessStatus(id);
    return res.send(user);
  } catch (error) {
    console.error("Error in changeUserBusinessStatus:", error);
    return handleError(res, error.status || 500, error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    if (id !== user._id && !user.isAdmin)
      return handleError(
        res,
        403,
        "Authorization Error: You must be an admin type user or the registered user to delete this user"
      );

    const userDeleted = await deleteUser(id);
    return res.send(userDeleted);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

module.exports = router;
