const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
  {
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
    type: { type: String, enum: ["hotel", "restaurants"], required: true },
    name: String,
    address: String,
    contact: Number,
    description: String,
    facilities: [String],
    startingPrice: Number,
    images: {
      type: String,
    },
    approved: { type: Boolean, default: true },
    offers: { type: String },
    trending: { type: Boolean, default: false },
    timeout: {
      checkIn: { type: String, required: true },
      checkOut: { type: String, required: true },
    },
    nearBy: {
      landmark: { type: String },
      distance: { type: Number },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Listing", ListingSchema);
