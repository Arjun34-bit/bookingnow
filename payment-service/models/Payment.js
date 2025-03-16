const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    bookingId: { type: mongoose.Schema.Types.ObjectId, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "canceled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
