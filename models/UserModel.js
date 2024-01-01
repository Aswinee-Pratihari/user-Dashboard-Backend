import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    match: [/^[A-Za-z\s]+$/, "specialCharecter and Space not allowed"],
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
    match: [
      /^[0-9]+$/,
      "Please enter a valid phone number with only numeric characters.",
    ],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "others"],
      message: "Pls enter a valid value",
    },
    required: [true, "Gender is required. Please provide a valid gender."],
  },
  heardAbout: {
    type: [String],
    enum: {
      values: ["LinkedIn", "Friends", "Job Portal", "Others"],
      message: "Please select a valid value ",
    },
    validate: {
      validator: function (arr) {
        // Check if the array has at least one valid value
        return arr.some((value) =>
          ["LinkedIn", "Friends", "Job Portal", "Others"].includes(value)
        );
      },
      message:
        "Please select at least one valid value from LinkedIn, Friends, Job Portal, or Others.",
    },
    required: [true, "Please select a valid value Cant leave it empty."],
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
