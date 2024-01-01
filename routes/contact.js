import express from "express";
import Contact from "../models/ContactModel.js";
import { TokenVerification } from "../middleware/auth.js";
import mongoose from "mongoose";

const router = express.Router();
router.post("/", TokenVerification, async (req, res) => {
  const { username, email, phone } = req.body;

  // check all the mising fields.
  if (!username || !email || !phone)
    return res
      .status(400)
      .json({ error: `Please enter all the required field.` });
  try {
    const newContact = new Contact({
      username,
      email,
      phone,
      postedBy: req.user._id,
    });
    const result = await newContact.save();

    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

router.get("/", TokenVerification, async (req, res) => {
  try {
    const searchTerm = req.query.query;
    const sort = req.query.sort;

    const sortOptions = {};

    switch (sort) {
      case "AZ":
        sortOptions.username = 1;
        break;
      case "ZA":
        sortOptions.username = -1;
        break;
      case "LastModified":
        sortOptions.updatedAt = -1;
        break;
      case "LastInserted":
        sortOptions.createdAt = 1;
        break;
      default:
        sortOptions.createdAt = 1;
        break;
    }

    const myContacts = await Contact.find({
      postedBy: req.user._id,
      $or: [
        { username: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
        { phone: { $regex: searchTerm, $options: "i" } },
      ],
    })
      .sort(sortOptions)
      .populate("postedBy", "-password");

    return res.status(200).json({ contacts: myContacts });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", TokenVerification, async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ error: "no id specified." });

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "please enter a valid id" });

  try {
    const contact = await Contact.findOne({ _id: id });

    return res.status(200).json({ ...contact._doc });
  } catch (err) {
    console.log(err);
  }
});
router.put("/:id", TokenVerification, async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "no id specified." });
  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "please enter a valid id" });

  try {
    const contact = await Contact.findOne({ _id: id });

    if (req.user._id.toString() !== contact.postedBy._id.toString())
      return res
        .status(401)
        .json({ error: "you can't edit other people contacts!" });

    const updatedData = { ...req.body, id: undefined };
    const result = await Contact.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    return res.status(200).json({ ...result._doc });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", TokenVerification, async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ error: "no id specified." });

  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ error: "please enter a valid id" });
  try {
    const contact = await Contact.findOne({ _id: id });
    if (!contact) return res.status(400).json({ error: "no contact found" });

    if (req.user._id.toString() !== contact.postedBy._id.toString())
      return res
        .status(401)
        .json({ error: "you can't delete other people contacts!" });

    const result = await Contact.deleteOne({ _id: id });
    const myContacts = await Contact.find({ postedBy: req.user._id }).populate(
      "postedBy",
      "-password"
    );

    return res
      .status(200)
      .json({ ...contact._doc, myContacts: myContacts.reverse() });
  } catch (err) {
    console.log(err);
  }
});
export default router;
