const UserModel = require("../models/User.model.js");
const bcrypt = require("bcrypt");

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.registerUser = async (req, res) => {
  const { username, email, password: reqPassword, displayPicture } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(reqPassword, salt);
    const newUser = new UserModel({
      username,
      email,
      password: hashPassword,
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
};

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.loginUser = async (req, res) => {
  const { username, password: reqPassword } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    // console.log(user);
    !user &&
      res.status(404).json({
        message: "Login Failed",
        error: true,
        data: null,
      });
    const checkPassword = await bcrypt.compare(reqPassword, user.password);
    // console.log(checkPassword);
    const { password, ...others } = user._doc;
    // console.log("Without the password", others);
    checkPassword &&
      res.status(200).json({
        message: "Login successful",
        error: false,
        data: others,
      });
  } catch (err) {
    res.status(500).json(err);
  }
};
