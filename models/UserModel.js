const mongoose = require("mongoose");

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
    enum: ["LinkedIn", "Friends", "Job Portal", "Others"],
    required: true,
  },
  city: {
    type: String,
    enum: ["Mumbai", "Pune", "Ahmedabad"],
    required: true,
  },
  state: {
    type: String,
    required: true,
    enum: ["Gujarat", "Maharashtra", "Karnataka"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
