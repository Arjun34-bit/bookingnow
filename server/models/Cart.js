const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    listingId: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" },
    unitType: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
