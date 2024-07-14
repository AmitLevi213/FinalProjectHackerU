const DB = process.env.DB || "MONGODB";
const { generateAuthToken } = require("../../auth/Providers/jwt");
const { handleBadRequest } = require("../../utils/handleErrors");
const { comparePassword } = require("../helpers/bcrypt");
const User = require("./mongodb/User");
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
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    return handleBadRequest("Mongoose", { ...error, status: 404 });
  }
};

const updateUser = async (userId, normalizedUser) => {
  if (DB !== "MONGODB") return "updateUser not in mongoDB";

  try {
    const user = await User.findByIdAndUpdate(userId, normalizedUser, {
      new: true,
    });
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
};
