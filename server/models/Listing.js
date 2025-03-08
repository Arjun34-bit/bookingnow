const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
    type: { type: String, enum: ["hotel", "restaurant"], required: true },
    name: String,
    address: String,
    contact: Number,
    description: String,
    facilities: [String],
    startingPrice: Number,
    images: {
      type: String,
      default: "https://hotel.easemytrip.com/img/roomimage.jpg",
    },
    approved: { type: Boolean, default: true },
    trending: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Listing", ListingSchema);
