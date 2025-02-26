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
      default: "https://hotel.easemytrip.com/img/roomimage.jpg",
    },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Unit", UnitSchema);
