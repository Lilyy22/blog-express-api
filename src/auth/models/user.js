const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "User with this email already exists."],
      required: [true, "username is required."],
    },
    email: {
      type: String,
      unique: [true, "User with this email already exists."],
      required: [true, "email is required."],
    },
    role: {
      type: String,
      default: "user",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
