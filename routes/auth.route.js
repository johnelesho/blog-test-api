const authRoute = require("express").Router();
const UserModel = require("../models/User.model.js");
const bcrypt = require("bcrypt");

// Register
authRoute.post("/register", async (req, res) => {
  const { username, email, password, displayPicture } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new UserModel({
      username,
      email,
      hashPassword,
      displayPicture,
    });

    const user = await newUser.save();
    const { password, ...others } = user._doc;
    res.status(201).json({
      message: "Successfully registered a new user",
      error: false,
      data: others,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
      error: true,
      data: null,
    });
  }
});

// Login
authRoute.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    !user &&
      res.status(404).json({
        message: "Login Failed",
        error: true,
        data: null,
      });
    const checkPassword = await bcrypt.compare(password, user.password);
    const { password, ...others } = user._doc;
    !checkPassword &&
      res.status(200).json({
        message: "Login successful",
        error: false,
        data: others,
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = authRoute;
