const express = require("express");
const cors = require("cors");
const app = express();

const allowedOrigins = [
  "http://127.0.0.1:5500",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "https://mp3-storage-58830.web.app",
  "https://mp3-storage-58830.firebaseapp.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

module.exports = app;
