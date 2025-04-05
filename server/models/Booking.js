const mongoose = require("mongoose");

const BookingDetailsSchema = new mongoose.Schema(
  {
    date: {
      checkInDate: { type: String },
      checkOutDate: { type: String },
    },
    timeout: {
      checkIn: { type: Number },
      checkOut: { type: Number },
    },
    lengthOfStay: { type: Number },
    roomDetails: {
      name: { type: String },
      capacity: { type: Number },
      noOfRoom: { type: Number },
      basePrice: { type: Number },
      finalPrice: { type: Number },
      tax: { type: Number },
      cancellationDetails: {
        time: { type: String },
        date: { type: String },
      },
    },
  },
  { _id: false }
);

const BookingSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    listingId: { type: mongoose.Schema.Types.ObjectId, ref: "Listing" },
    unitId: { type: mongoose.Schema.Types.ObjectId, ref: "Unit" },
    status: {
      type: String,
      enum: ["pending", "confirmed", "canceled"],
      default: "pending",
    },
    paymentDetails: {
      type: String,
      enum: ["UPI", "CASH"],
      default: "CASH",
    },
    paid: {
      type: Boolean,
      default: false,
    },
    bookingDetails: BookingDetailsSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
