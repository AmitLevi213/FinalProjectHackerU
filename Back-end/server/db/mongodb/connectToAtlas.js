const mongoose = require("mongoose");
const chalk = require("chalk");
require("dotenv").config();

async function connect() {
  return mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log(chalk.magentaBright("Connected to MongoDB Atlas!")))
    .catch((error) =>
      console.log(
        chalk.redBright.bold(`Could not connect to MongoDB: ${error}`)
      )
    );
}

module.exports = connect;
