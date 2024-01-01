import express from "express";
import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TokenVerification } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, phone, gender, heardAbout, city, state } =
    req.body;

  // check all the mising fields.
  if (
    !name ||
    !email ||
    !password ||
    !phone ||
    !gender ||
    !heardAbout ||
    !city ||
    !state
  )
    return res
      .status(400)
      .json({ error: `Please enter all the required field.` });

  // validation of password.
  if (password.length < 6)
    return res
      .status(400)
      .json({ error: "password must be atleast 6 characters long" });
  try {
    const doesUserAlreadyExist = await User.findOne({ email });

    if (doesUserAlreadyExist)
      return res.status(400).json({
        error: `user  already exists .`,
      });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      password: hashedPassword,
      name,
      email,
      gender,
      phone,
      state,
      city,
      heardAbout,
    });

    // save the user.
    const result = await newUser.save();

    result._doc.password = undefined;

    return res.status(201).json({ ...result._doc });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ error: "please enter all the required fields!" });

  try {
    const doesUserExits = await User.findOne({ email });

    if (!doesUserExits)
      return res.status(400).json({ error: "Invalid email or password!" });

    // if there were any user present.
    const doesPasswordMatch = await bcrypt.compare(
      password,
      doesUserExits.password
    );

    if (!doesPasswordMatch)
      return res.status(400).json({ error: "Invalid email or password!" });

    const payload = { _id: doesUserExits._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    const user = { ...doesUserExits._doc, password: undefined };
    return res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

router.get("/detail", TokenVerification, async (req, res) => {
  return res.status(200).json({ ...req.user._doc });
});
export default router;
