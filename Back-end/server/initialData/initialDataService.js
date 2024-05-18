const chalk = require("chalk");
const data = require("./initialData.json");
const { createCard } = require("../cards/models/cardsAccessDataService");
const { registerUser } = require("../users/models/usersAccessDataService");
const { generateUserPassword } = require("../users/helpers/bcrypt");
const User = require("../users/models/mongodb/User");
const Card = require("../cards/models/mongodb/Card");
const generateInitialDataCards = async () => {
  const any = await Card.countDocuments();
  if (any) return;
  const { cards } = data;
  for (const card of cards) {
    try {
      await createCard(card);
    } catch (error) {
      console.log(chalk.red(error.message));
    }
  }
};

const generateInitialDataUsers = async () => {
  const any = await User.countDocuments();
  if (any) return;
  const { users } = data;
  for (const user of users) {
    try {
      if (!user.password) {
        // Generate password only if not provided
        user.password = generateUserPassword("Aa1234!");
      }
      await registerUser(user);
    } catch (error) {
      console.log(chalk.red(error.message));
    }
  }
};

const generateInitialData = async () => {
  // Check if data already exists
  await generateInitialDataCards();
  // Check if data already exists
  await generateInitialDataUsers();
};

exports.generateInitialData = generateInitialData;
