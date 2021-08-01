const UserModel = require("../models/User.model.js");
const bcrypt = require("bcrypt");
const ResponseError = require("../utils/responseError.utils");

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.registerUser = async (req, res, next) => {
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
    next(err);
  }
};

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.loginUser = async (req, res, next) => {
  const { username, password: reqPassword } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    // console.log(user);
    if (!user) return next(new ResponseError("Login Failed", 401));

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
    next(err);
  }
};
