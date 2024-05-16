const DB = process.env.DB || "MONGODB";
const { generateAuthToken } = require("../../auth/Providers/jwt");
const { handleBadRequest } = require("../../utils/handleErrors");
const { comparePassword } = require("../helpers/bcrypt");
const User = require("./mongodb/User");
const lodash = require("lodash");

const registerUser = async (normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      const { email } = normalizedUser;
      let user = await User.findOne({ email });
      if (user) {
        throw new Error("User already exists");
      }
      user = new User(normalizedUser);
      user = await user.save();
      user = lodash.pick(user, ["_id", "name", "email"]);
      return Promise.resolve(user);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("registerUser  not in mongoDB");
};

const loginUser = async ({ email, password }) => {
  try {
    if (DB === "MONGODB") {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Invalid email or password");
      const validPassword = comparePassword(password, user.password);
      if (!validPassword) throw new Error("Invalid email or password");
      const token = generateAuthToken(user);
      return Promise.resolve(token);
    } else {
      return Promise.resolve("user created not in mongoDB");
    }
  } catch (error) {
    return handleBadRequest("Mongoose", error);
  }
};

const getUsers = async () => {
  if (DB === "MONGODB") {
    try {
      const users = await User.find();
      return Promise.resolve(users);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("get users not in mongodb");
};

const getUser = async (userId) => {
  if (DB === "MONGODB") {
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) throw new Error("User not found");
      return Promise.resolve(user);
    } catch (error) {
      error.status = 404;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("get user not in mongodb");
};

const updateUser = async (userId, normalizeUser) => {
  if (DB === "MONGODB") {
    try {
      const user = await User.findByIdAndUpdate(userId, normalizeUser, {
        new: true,
      });
      return Promise.resolve({ user });
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("card update not in mongodb");
};

const changeUserBusinessStatus = async (userId) => {
  if (DB === "MONGODB") {
    try {
      const pipeline = [{ $set: { isBusiness: { $not: "isBusiness" } } }];
      let user = await User.findByIdAndUpdate(userId, pipeline, { new: true });
      if (!user)
        throw new Error(
          "could not change user business status, because user not found"
        );
      return Promise.resolve(`user no. ${userId} change his business status!`);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("card liked not in mongodb");
};

const deleteUser = async (userId) => {
  if (DB === "MONGODB") {
    try {
      const user = User.findByIdAndDelete(userId);
      return Promise.resolve(user);
    } catch (error) {
      error.status = 400;
      return Promise.reject(error);
    }
  }
  return Promise.resolve("card deleted not in mongodb");
};

exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.changeUserBusinessStatus = changeUserBusinessStatus;
exports.deleteUser = deleteUser;
