const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema(
  {
    user_email: { type: String },
    subject: { type: String },
    content: { type: String },
    status: { type: String, enum: ["sent", "failed"], default: "failed" },
    retry_count: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Email", EmailSchema);
