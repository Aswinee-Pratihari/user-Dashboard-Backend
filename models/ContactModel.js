import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "name is required."],
  },
  email: {
    type: String,
    required: [true, "email is required."],
  },
  phone: {
    type: String,
    required: [true, "phone number is required."],
    match: [
      /^[0-9]+$/,
      "Please enter a valid phone number with only numeric characters.",
    ],
    minlength: [7, "The minimum length should be 7"],
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Contact = new mongoose.model("Contact", ContactSchema);
export default Contact;
