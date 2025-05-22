const mongoose = require("mongoose");
const Notify = require("../model/Notify");

const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if (process.env.NODE_ENV !== "production") {
      await Notify.syncIndexes(); // Dev: Safe to sync fully
      console.log("Indexes synced (dev).");
    } else {
      await Notify.createIndexes(); // Prod: Safer to only add missing
      console.log("Indexes created (prod-safe).");
    }
    console.log(`MongoDB Connected ${conn.connection.host}`.green.bold);
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
