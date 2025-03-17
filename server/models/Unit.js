const mongoose = require("mongoose");

const UnitSchema = new mongoose.Schema(
  {
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    type: { type: String, enum: ["room", "table"], required: true },
    name: String,
    capacity: Number,
    price: Number,
    images: {
      type: String,
    },
    available: { type: Boolean, default: true },
    atSale: { type: Boolean, default: false },
    discountPercentage: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Unit", UnitSchema);
