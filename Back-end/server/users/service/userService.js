const { handleJoiError } = require("../../utils/handleErrors");
const {
  registerUser: registerUserFunc,
  loginUser: loginUserFunc,
  getUsers: fetchUsers,
  getUser: fetchUser,
  updateUser: editUser,
  changeUserBusinessStatus: changeBizNumber,
  deleteUser: removeUser,
} = require("../models/usersAccessDataService");
const {
  validateRegistration,
  validateLogin,
} = require("../validations/userValidationService");

const registerUser = async (rawUser) => {
  const { error } = validateRegistration(rawUser);
  if (error) return handleJoiError(error);

  try {
    let user = { ...rawUser };
    user.createdAt = new Date();
    user = await registerUserFunc(user);
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};

const loginUser = async (user) => {
  const { error } = validateLogin(user);
  if (error) return handleJoiError(error);

  try {
    user = await loginUserFunc(user);
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getUsers = async () => {
  try {
    const users = await fetchUsers();
    return Promise.resolve(users);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getUser = async (userId) => {
  try {
    const user = await fetchUser(userId);
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateUser = async (userId, rawUser) => {
  try {
    let user = { ...rawUser };
    user = await editUser(userId, user);
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};

const changeUserBusinessStatus = async (userId) => {
  try {
    const user = await changeBizNumber(userId);
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};

const deleteUser = async (userId) => {
  try {
    const user = await removeUser(userId);
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.getUsers = getUsers;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.changeUserBusinessStatus = changeUserBusinessStatus;
exports.deleteUser = deleteUser;
