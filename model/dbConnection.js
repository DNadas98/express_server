const mongoose = require("mongoose");
const {logError} = require("../middleware/logger");

async function dbConnection() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
  } catch (err) {
    logError(err);
    throw new Error("Failed to connect to the database");
  }
}

module.exports = dbConnection;