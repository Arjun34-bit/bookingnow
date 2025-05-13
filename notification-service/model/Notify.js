const mongoose = require("mongoose");

const NotifySchema = new mongoose.Schema(
  {
    listingId: { type: String },
    unitId: { type: String },
    email: { type: String },
    retryCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notify", NotifySchema);
