const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn1 = await mongoose.connect(process.env.MONGO_URI);
    const conn2 = await mongoose.connect(process.env.UNIT_CLUSTER);
    if (conn1) {
      console.log(`MongoDB 1 Connected ${conn1.connection.host}`);
    }

    if (conn2) {
      console.log(`MongoDB 2 Connected ${conn2.connection.host}`);
    }
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
