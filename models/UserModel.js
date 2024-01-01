import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    match: /^[A-Za-z\s]+$/,
  },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]+$/,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Others"],
    required: true,
  },
  heardAbout: {
    type: [String],
    enum: {
      values: ["LinkedIn", "Friends", "Job Portal", "Others"],
      message: "Please select a valid value from heardAbout",
    },
    required: true,
  },
  city: {
    type: String,
    enum: {
      values: ["Mumbai", "Pune", "Ahmedabad"],
      message: "Please select a valid city from Mumbai, Pune, or Ahmedabad.",
    },
    required: true,
  },
  state: {
    type: String,
    required: true,
    enum: {
      values: ["Gujarat", "Maharashtra", "Karnataka"],
      message:
        "Please select a valid state from Gujarat, Maharashtra, or Karnataka.",
    },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
