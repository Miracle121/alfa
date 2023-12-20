const mongoose = require("mongoose");
const { config } = require("./config");
require("colors");

const connectDB = async () => {
  try {
    // Prepare for the change in Mongoose version 7
    mongoose.set("strictQuery", false);

    // Connect to MongoDB
    const conn = await mongoose.connect(config.mongo_uri);

    console.log(`MongoDB connected: ${conn.connection.host.underline}`.cyan);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit the process with a failure code
  }
};

module.exports = connectDB;
