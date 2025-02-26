const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    listingId: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" },
    bookingDate: Date,
    status: {
      type: String,
      enum: ["pending", "confirmed", "canceled"],
      default: "pending",
    },
    paymentDetails: {
      type: String,
      default: "CASH",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
