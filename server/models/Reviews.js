const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    listingId: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" },
    review: { type: String },
    ratings: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
