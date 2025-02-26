const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: ["customer", "vendor", "admin"],
      default: "vendor",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", VendorSchema);
