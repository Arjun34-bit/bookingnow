const mongoose = require("mongoose");

const NotifySchema = new mongoose.Schema(
  {
    listingId: { type: String },
    unitId: { type: String },
    email: { type: String, required: true },
    retryCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

NotifySchema.index({ unitId: 1, email: 1 }, { unique: true });

module.exports = mongoose.model("Notify", NotifySchema);
