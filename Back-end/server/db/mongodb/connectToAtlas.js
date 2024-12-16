const mongoose = require("mongoose");
const chalk = require("chalk");
require("dotenv").config();

async function connect() {
  return mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log(chalk.magentaBright("Connected to MongoDB Atlas!"));
      // Add this to verify the database name
      console.log(
        chalk.blue(`Database name: ${mongoose.connection.db.databaseName}`)
      );
    })
    .catch((error) =>
      console.log(
        chalk.redBright.bold(`could not connect to mongoDb: ${error}`)
      )
    );
}

module.exports = connect;
