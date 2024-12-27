const mongoose = require("mongoose");
require('dotenv').config();

async function connectToDb() {
  const ENVIRONMENT = process.env.NODE_ENV;

  try {
    if (ENVIRONMENT === 'production') {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('Connected to MongoDB Atlas!');
    } else {
      await mongoose.connect('mongodb://localhost:27017/SoundScapeCentral');
      console.log('Connected to MongoDB Locally!');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

module.exports = connectToDb;