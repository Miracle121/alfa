const fs = require("fs");
const mongoose = require("mongoose");
require("colors");
const Roles = require("./models/accountroles");
const Status = require("./models/accountstatus");
const User = require("./models/users");
const { config } = require("./config/config");

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongo_uri);
    console.log("MongoDB Connected...".cyan);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`.red);
    process.exit(1);
  }
};

const roles = JSON.parse(
  fs.readFileSync(__dirname + "/_data/roles.json", "utf-8")
);

const status = JSON.parse(
  fs.readFileSync(__dirname + "/_data/status.json", "utf-8")
);

const users = JSON.parse(
  fs.readFileSync(__dirname + "/_data/users.json", "utf-8")
);

const importData = async () => {
  try {
    await Roles.create(roles);
    await Status.create(status);
    await User.create(users);

    console.log("Data imported...".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error.message}`.red);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Roles.deleteMany();
    await Status.deleteMany();
    await User.deleteMany();

    console.log("Data destroyed...".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error deleting data: ${error.message}`.red);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  if (process.argv[2] === "-i") {
    await connectDB();
    await importData();
  }
  if (process.argv[2] === "-d") {
    await connectDB();
    await deleteData();
  }
};

seedDatabase();
