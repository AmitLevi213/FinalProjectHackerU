const chalk = require("chalk");
const express = require("express");
const { handleError } = require("./utils/handleErrors");
const app = express();
const router = require("./router/router");
const connectToDb = require("./db/dbService");
const cors = require("./middlewares/cors");
const logger = require("./logger/loggerService");
const { generateInitialData } = require("./initialData/initialDataService");

require("dotenv").config();

app.use(cors);
app.use(logger);
app.use(express.json());
app.use(express.static("public/assets/Images"));

app.use(router);

app.use((err, req, res, next) => {
  handleError(res, 500, err.message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(chalk.magentaBright(`Listening on: http://localhost:${PORT}`));
  await connectToDb();
  generateInitialData();
});
