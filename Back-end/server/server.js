const chalk = require("chalk");
const express = require("express");
const { handleError } = require("./utils/handleErrors");
const app = express();
const router = require("./router/router");
const connectToDb = require("./db/dbService");
const cors = require("./middlewares/cors");
const logger = require("./logger/loggerService");
const config = require("config");
const { generateInitialData } = require("./initialData/initialDataService");

app.use(cors);
app.use(logger);
app.use(express.json());
app.use(express.static("./public"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(router);

app.use((err, req, res, next) => {
  handleError(res, 500, err.message);
});

const PORT = config.get("PORT");
app.listen(PORT, async () => {
  console.log(chalk.magentaBright(`Listening on: http://localhost:${PORT}`));
  await connectToDb();
  generateInitialData();
});
