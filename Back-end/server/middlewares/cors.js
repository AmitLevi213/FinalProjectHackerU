const express = require("express");
const cors = require("cors");
const app = express();

const allowedOrigins = [
  "http://127.0.0.1:5500",
  "http://localhost:3000",
  "https://finalprojecthackeru-cilent.onrender.com",
  "https://finalprojecthackeru-cilent.onrender.com/users",
  "https://finalprojecthackeru-cilent.onrender.com/cards",
];

app.use(
  cors({
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
  })
);

module.exports = app;
