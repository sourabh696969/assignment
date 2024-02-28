const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ((!name, !email, !password)) {
    res.status(404);
    throw new Error("All fields required!");
  }

  const userEmail = await User.findOne({ email });

  if (userEmail) {
    res.status(403);
    throw new Error("Admin already exist with this email!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "User Registered!", user });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    res.status(404);
    throw new Error("All fields required!");
  }

  const userAvailable = await User.findOne({ email });

  if (!userAvailable) {
    res.status(404);
    throw new Error("User not found!");
  }

  if (!(await bcrypt.compare(password, userAvailable.password))) {
    res.status(404);
    throw new Error("email or password is wrong!");
  }

  const accessToken = jwt.sign(
    {
      user: {
        _id: userAvailable._id,
      },
    },
    process.env.SECRET_KEY
  );
  res.status(200).json({
    message: "User logged In successfully!",
    token: accessToken,
  });
});

module.exports = {
  registerUser,
  loginUser,
};
