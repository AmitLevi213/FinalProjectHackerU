const DB = process.env.DB || "MONGODB";
const { generateAuthToken } = require("../../auth/Providers/jwt");
const { handleBadRequest } = require("../../utils/handleErrors");
const { comparePassword } = require("../helpers/bcrypt");
const User = require("./mongodb/User");
const GoogleUser = require("./mongodb/GoogleUser");
const lodash = require("lodash");

const registerUser = async (normalizedUser) => {
  if (DB !== "MONGODB") return "registerUser not in mongoDB";

  try {
    const { email } = normalizedUser;
    let user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }
    user = new User(normalizedUser);
    user = await user.save();
    user = lodash.pick(user, ["_id", "name", "email"]);
    return user;
  } catch (error) {
    return handleBadRequest("Mongoose", { ...error, status: 404 });
  }
};
const registerGoogleUser = async (googleUserData) => {
  try {
    const { email, uid } = googleUserData;

    // Try to find an existing user first
    let user = await GoogleUser.findOne({ $or: [{ email }, { uid }] });

    if (user) {
      // Update existing user if needed
      user = await GoogleUser.findOneAndUpdate(
        { $or: [{ email }, { uid }] },
        {
          ...googleUserData,
          // Preserve existing business or admin status if not explicitly changed
          isAdmin: user.isAdmin,
          isBusiness: user.isBusiness || googleUserData.isBusiness,
        },
        { new: true }
      );
    } else {
      // Register new Google user
      user = new GoogleUser(googleUserData);
      user = await user.save();
    }

    return lodash.pick(user, [
      "_id",
      "name",
      "email",
      "picture",
      "isAdmin",
      "isBusiness",
    ]);
  } catch (error) {
    throw new Error("Google User Registration Failed: " + error.message);
  }
};
const loginUser = async ({ email, password }) => {
  if (DB !== "MONGODB") return "loginUser not in mongoDB";

  try {
    const user = await User.findOne({ email });
    if (!user || !comparePassword(password, user.password)) {
      throw new Error("Invalid email or password");
    }
    const token = generateAuthToken(user);
    return token;
  } catch (error) {
    return handleBadRequest("Mongoose", { ...error, status: 404 });
  }
};
const loginGoogleUser = async (email, uid) => {
  try {
    const user = await GoogleUser.findOne({ $or: [{ email }, { uid }] });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Google User Login Failed: " + error.message);
  }
};

const getUsers = async () => {
  if (DB !== "MONGODB") return "getUsers not in mongoDB";

  try {
    const users = await User.find();
    return users;
  } catch (error) {
    return handleBadRequest("Mongoose", { ...error, status: 404 });
  }
};

const getUser = async (userId) => {
  if (DB !== "MONGODB") return "getUser not in mongoDB";
  try {
    let user = await User.findById(userId);
    if (!user) {
      user = await GoogleUser.findOne({
        $or: [{ _id: userId }, { uid: userId }],
      });
    }
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    return handleBadRequest("Mongoose", error);
  }
};

const updateUser = async (userId, normalizedUser) => {
  if (DB !== "MONGODB") return "updateUser not in mongoDB";
  try {
    const googleUser = await GoogleUser.findOne({
      $or: [{ _id: userId }, { uid: userId }],
    });
    if (googleUser) {
      throw new Error("Google users cannot be updated through this API");
    }
    const user = await User.findByIdAndUpdate(userId, normalizedUser, {
      new: true,
    });
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    return handleBadRequest("Mongoose", { ...error, status: 400 });
  }
};
const changeUserBusinessStatus = async (id) => {
  if (DB === "MONGODB") {
    try {
      const pipeline = [{ $set: { isBusiness: { $not: "$isBusiness" } } }];
      const user = await User.findByIdAndUpdate(id, pipeline, {
        new: true,
      });

      if (!user)
        throw new Error(
          "Could not update this user isBusiness status because a user with this ID cannot be found in the database"
        );
      return Promise.resolve(user);
    } catch (error) {
      error.status = 404;
      return handleBadRequest("Mongoose", error);
    }
  }

  return Promise.resolve("Card Updated!");
};

const deleteUser = async (userId) => {
  if (DB !== "MONGODB") return "deleteUser not in mongoDB";

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    return handleBadRequest("Mongoose", { ...error, status: 400 });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  changeUserBusinessStatus,
  deleteUser,
  registerGoogleUser,
  loginGoogleUser,
};
