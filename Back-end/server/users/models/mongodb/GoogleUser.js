const mongoose = require("mongoose");

const GoogleUserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, default: null },
  picture: String,
  isAdmin: { type: Boolean, default: false },
  isBusiness: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const GoogleUser = mongoose.model("Google-Users", GoogleUserSchema);
module.exports = GoogleUser;
