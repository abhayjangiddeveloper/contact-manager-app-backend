const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email address"],
      //   unique: [true, "This email is already exist"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
    },
    gender: {
      type: String,
      required: [true, "please enter your gender"],
    },
    class: {
      type: String,
    },
    profile_picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
