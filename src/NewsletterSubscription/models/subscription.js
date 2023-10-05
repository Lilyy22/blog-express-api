const mongoose = require("mongoose");

const subscriptionSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists."],
      required: [true, "Email is required."],
      index: true,
    },
    email_verified_at: Date,
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
